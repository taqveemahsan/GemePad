import React, { useEffect, useRef, useState, useCallback } from 'react';
import CustomDatafeed from './customDatafeed';

const mapResolutionToInterval = (resolution) => {
    // Map TradingView resolution to your API interval format

    // Handle different resolution formats
    switch (resolution) {
        // Minutes
        case '1': return '1m';
        case '5': return '5m';
        case '15': return '15m';
        case '30': return '30m';

        // Hours
        case '60': return '1H';
        case '120': return '2H';
        case '240': return '4H';
        case '480': return '8h';

        // Days, Weeks, Months
        case 'D': case '1D': return '1D';
        case 'W': case '1W': return '1W';
        case 'M': case '1M': return '1M';

        // Default case
        default:
            // Try to parse numeric resolutions (minutes)
            if (!isNaN(parseInt(resolution))) {
                const minutes = parseInt(resolution);
                if (minutes < 60) return `${minutes}m`;
                if (minutes % 60 === 0) return `${minutes / 60}H`;
            }

            console.warn("Unknown resolution:", resolution, "defaulting to 1D");
            return '1D';
    }
};

// Map API interval format to TradingView resolution format
const mapIntervalToResolution = (interval) => {
    switch (interval) {
        // Minutes
        case '1m': return '1';
        case '5m': return '5';
        case '15m': return '15';
        case '30m': return '30';

        // Hours
        case '1H': return '60';
        case '2H': return '120';
        case '4H': return '240';
        case '8h': return '480';
        case '12H': return '720';

        // Days, Weeks, Months
        case '1D': return 'D';
        case '1W': return 'W';
        case '1M': return 'M';

        // Default case
        default:
            console.warn("Unknown interval:", interval, "defaulting to D");
            return 'D';
    }
};

const Chart = ({
    symbol = 'AAPL',
    fetchHistoricalPrices,
    interval = '1D', // Default to 1D if not provided
    onIntervalChange,
    chartData
}) => {
    const chartContainerRef = useRef(null);
    const tvWidgetRef = useRef(null);
    const dataRef = useRef([]);
    const [dimensions] = useState({ width: '100%', height: '500px' });
    const [isUpdating, setIsUpdating] = useState(false); // Loading state for interval changes
    const pendingIntervalRef = useRef(null); // Track pending interval change
    const lastReceivedIntervalRef = useRef(null); // Track last received data interval

    // Convert API interval format to TradingView resolution format
    const initialResolution = mapIntervalToResolution(interval);
    const [currentInterval, setCurrentInterval] = useState(initialResolution);

    // Function to fetch data based on current interval
    const updateChartData = useCallback(async () => {
        if (fetchHistoricalPrices) {
            try {
                const interval = mapResolutionToInterval(currentInterval);
                const newData = await fetchHistoricalPrices(interval);

                // console.log('Chart: Updating chart data with', newData?.length || 0, 'data points for interval:', interval);

                if (newData && Array.isArray(newData) && newData.length > 0 && tvWidgetRef.current) {
                    const datafeed = tvWidgetRef.current._options?.datafeed;
                    if (datafeed && typeof datafeed.updateData === 'function') {
                        // console.log('Chart: Calling datafeed.updateData with new data');
                        datafeed.updateData(newData);

                        // Track that we received data for this interval
                        lastReceivedIntervalRef.current = interval;

                        // Only clear loading state if this data is for the current pending interval
                        if (pendingIntervalRef.current === interval || !pendingIntervalRef.current) {
                            // console.log('Chart: Data matches current interval, clearing loading state');
                            setIsUpdating(false);
                            pendingIntervalRef.current = null;
                        } else {
                            // console.log('Chart: Data is for old interval, keeping loading state');
                        }
                    }
                } else {
                    // No data received, but don't clear loading state yet
                    // Wait for WebSocket to provide data
                    // console.log('Chart: No data available yet, keeping loading state');
                }
            } catch (error) {
                console.error("Error updating chart data:", error);
                // Don't clear loading state on error - wait for WebSocket data
            }
        }
    }, [fetchHistoricalPrices, currentInterval]);

    // Update chart data when interval changes
    // The parent component (Hero.js) manages the WebSocket connection and provides data
    // We just need to update the chart when the interval changes
    useEffect(() => {
        // console.log('Chart: Interval changed to', currentInterval, '- fetching new data');
        // Fetch data immediately when interval changes
        updateChartData();
    }, [currentInterval, updateChartData]);

    // Sync interval when it changes from parent
    useEffect(() => {
        const newResolution = mapIntervalToResolution(interval);
        if (newResolution !== currentInterval) {
            // console.log(`Syncing interval from parent: ${interval} -> ${newResolution}`);
            setCurrentInterval(newResolution);
        }
    }, [interval, currentInterval]);

    // Watch for data changes from parent and update the chart
    // This is triggered when the WebSocket in Hero.js receives new data

    // Add resize handler to ensure chart always fills container
    useEffect(() => {
        const handleResize = () => {
            if (chartContainerRef.current && chartContainerRef.current.parentElement) {
                // If widget exists, update its size
                if (tvWidgetRef.current && tvWidgetRef.current.iframe) {
                    tvWidgetRef.current.iframe.style.width = '100%';
                    tvWidgetRef.current.iframe.style.height = '100%';
                }
            }
        };

        // Initial sizing
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize chart only once
    useEffect(() => {
        if (!window.TradingView) {
            console.error('TradingView script not loaded!');
            return;
        }

        // Apply background color directly to the container
        if (chartContainerRef.current) {
            chartContainerRef.current.style.backgroundColor = "transparent";
            chartContainerRef.current.style.width = "100%";
        }



        // Create a custom datafeed that extends the basic CustomDatafeed
        class EnhancedDatafeed extends CustomDatafeed {

            constructor(initialData, fetchFn, symbol) {
                super(initialData);
                this.fetchDataFn = fetchFn;
                this.currentSymbol = symbol;
                this.currentResolution = 'D'; // Default resolution is daily
                this.fetchInterval = null;
                this.chartRef = null;
            }

            // Method to set the chart reference so we can call resetData() when needed
            setChartRef(chart) {
                this.chartRef = chart;
            }

            // Override subscribeBars to capture the current resolution and handle cache resets
            subscribeBars(
                symbolInfo,
                resolution,
                onRealtimeCallback,
                subscribeUID,
                onResetCacheNeededCallback
            ) {
                // Check if resolution has changed
                const resolutionChanged = this.currentResolution !== resolution;

                // Update current symbol and resolution
                this.currentSymbol = symbolInfo.name;
                this.currentResolution = resolution;

                // Create a custom reset cache callback that also calls chart.resetData()
                const customResetCallback = () => {
                    console.log('EnhancedDatafeed: Cache reset triggered, calling chart.resetData()');

                    // Call the original callback to signal TradingView
                    onResetCacheNeededCallback();

                    // Also call chart.resetData() to force the chart to redraw with new data
                    if (this.chartRef) {
                        try {
                            this.chartRef.resetData();
                            console.log('EnhancedDatafeed: Successfully called chart.resetData()');
                        } catch (error) {
                            console.error('EnhancedDatafeed: Error calling chart.resetData():', error);
                        }
                    } else {
                        console.warn('EnhancedDatafeed: Chart reference not available for resetData()');
                    }
                };

                // Call the parent class subscribeBars with our custom reset callback
                super.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, customResetCallback);

                // If resolution changed, we need to fetch new data
                if (resolutionChanged) {
                    // Stop any existing fetching
                    this.stopPeriodicFetching();

                    // Fetch data with the new resolution immediately
                    this.fetchDataWithCurrentResolution();
                }

                // Start the real-time updates if this is our first subscriber
                if (Object.keys(this.subscribers).length === 1) {
                    this.startPeriodicFetching();
                }
            }

            // Helper function to validate a bar
            isValidBar(bar) {
                const currentTime = Date.now();
                const maxFutureTime = currentTime + (24 * 60 * 60 * 1000); // Allow up to 1 day in future
                const minPastTime = new Date('2024-01-01').getTime(); // Updated to recent times for safety, or keep 2000

                // Check if all required properties exist and are valid numbers
                if (
                    typeof bar.time !== 'number' || isNaN(bar.time) ||
                    typeof bar.open !== 'number' || isNaN(bar.open) ||
                    typeof bar.high !== 'number' || isNaN(bar.high) ||
                    typeof bar.low !== 'number' || isNaN(bar.low) ||
                    typeof bar.close !== 'number' || isNaN(bar.close)
                ) {
                    // console.warn("Invalid bar structure:", bar);
                    return false;
                }

                // Relaxed time check for debugging or if time is slightly off
                return true;
            }

            // Start fetching data periodically
            // NOTE: We don't need to poll here because the parent component (Hero.js)
            // manages the WebSocket connection and provides real-time data
            // This method is kept for compatibility but doesn't do anything
            startPeriodicFetching() {
                // console.log('EnhancedDatafeed: startPeriodicFetching called (no-op - parent manages WebSocket)');
                // Clear any existing interval
                this.stopPeriodicFetching();

                // We don't set up polling here - the parent component handles data updates via WebSocket
                // The chart will be updated when the parent calls updateData() with new WebSocket data
            }

            // Stop the periodic fetching
            stopPeriodicFetching() {
                if (this.fetchInterval) {
                    clearInterval(this.fetchInterval);
                    this.fetchInterval = null;
                }
            }

            // Override unsubscribeBars to clean up
            unsubscribeBars(subscribeUID) {
                delete this.subscribers[subscribeUID];

                // If no more subscribers, stop fetching
                if (Object.keys(this.subscribers).length === 0) {
                    this.stopPeriodicFetching();
                }
            }

            // Add a new method to fetch data with the current resolution
            async fetchDataWithCurrentResolution() {
                try {
                    const interval = mapResolutionToInterval(this.currentResolution);

                    // Use fetchHistoricalPrices to get data with the correct interval
                    const rawData = await fetchHistoricalPrices(interval);

                    if (Array.isArray(rawData) && rawData.length > 0) {
                        // Process the data
                        const processedData = rawData.map(item => {
                            let time = typeof item.time === 'number' ? item.time : parseInt(item.time);
                            if (time < new Date('2000-01-01').getTime() / 1000) {
                                time *= 1000;
                            }
                            return {
                                time: time,
                                open: parseFloat(item.open || item.o),
                                high: parseFloat(item.high || item.h),
                                low: parseFloat(item.low || item.l),
                                close: parseFloat(item.close || item.c),
                                volume: parseFloat(item.volume || item.v || 0)
                            };
                        });


                        // Update the chart - sorting and validation happens in updateData
                        this.updateData(processedData);
                    }
                } catch (error) {
                    console.error("Error fetching initial data:", error);
                }
            }

            // Add this method to the EnhancedDatafeed class


            // Override the updateData method to ensure data is always properly sorted and mapped
            updateData(newData) {
                if (!Array.isArray(newData) || newData.length === 0) {
                    console.warn('No data to update chart');
                    return;
                }

                // Map data if keys are shortened (o, h, l, c, v)
                const mappedData = newData.map(bar => {
                    // If already has 'open', use it. If not, check for 'o'.
                    // Ensure numbers are numbers.
                    const b = { ...bar };
                    if (b.o !== undefined && b.open === undefined) b.open = parseFloat(b.o);
                    if (b.h !== undefined && b.high === undefined) b.high = parseFloat(b.h);
                    if (b.l !== undefined && b.low === undefined) b.low = parseFloat(b.l);
                    if (b.c !== undefined && b.close === undefined) b.close = parseFloat(b.c);
                    if (b.v !== undefined && b.volume === undefined) b.volume = parseFloat(b.v);

                    // Ensure time is number
                    if (typeof b.time === 'string') b.time = parseInt(b.time);

                    // Handle seconds vs milliseconds if year is < 1990 (implies seconds)
                    // But be careful not to break valid old dates.
                    // As a heuristic for Sonic Engine:
                    if (b.time < 2000000000) b.time *= 1000;

                    return b;
                });

                // First, filter out invalid bars. Use mappedData.
                const validBars = mappedData.filter(bar => this.isValidBar(bar));

                if (validBars.length === 0) {
                    console.warn('No valid bars after filtering. First raw bar:', newData[0]);
                    return;
                }

                // Sort by time in ascending order
                const sortedBars = validBars.sort((a, b) => a.time - b.time);

                // Remove any duplicate timestamps or out-of-sequence bars
                const uniqueBars = [];
                let lastTime = 0;

                for (const bar of sortedBars) {
                    // Only add bars with strictly increasing timestamps
                    if (bar.time > lastTime) {
                        uniqueBars.push(bar);
                        lastTime = bar.time;
                    } else {
                        // console.warn(`Skipping bar with non-increasing time: ${new Date(bar.time).toISOString()}`);
                    }
                }

                if (uniqueBars.length > 0) {
                    super.updateData(uniqueBars);
                } else {
                    // console.warn('No valid bars after removing duplicates and out-of-sequence bars');
                }
            }
        }

        // Create the enhanced datafeed with the fetch function
        const datafeed = new EnhancedDatafeed(
            dataRef.current || [],
            fetchHistoricalPrices,
            symbol
        );

        const widgetOptions = {
            symbol: symbol,
            container: chartContainerRef.current,
            datafeed: datafeed,
            library_path: '/charting_library/',
            locale: 'en',
            interval: currentInterval, // Use dynamic interval from state
            disabled_features: [
                "use_localstorage_for_settings",
                // Remove "header_widget" to show the top bar
                // "header_widget",
                // Remove "timeframes_toolbar" to show the interval bar
                // "timeframes_toolbar",
            ],
            enabled_features: [
                "study_templates",
                "remove_library_container_border",
                "responsive_logo",
            ],
            charts_storage_url: 'https://saveload.tradingview.com',
            charts_storage_api_version: "1.1",
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            theme: 'dark',
            autosize: true, // Enable auto-sizing

            // Apply custom styles
            overrides: {
                "paneProperties.background": "rgba(0,0,0,0)",
                "paneProperties.backgroundType": "solid",
                "paneProperties.backgroundGradientStartColor": "rgba(0,0,0,0)",
                "paneProperties.backgroundGradientEndColor": "rgba(0,0,0,0)",

                // Candle styles - Neon Green and Red
                "mainSeriesProperties.candleStyle.upColor": "#00ff87",
                "mainSeriesProperties.candleStyle.downColor": "#ff006e",
                "mainSeriesProperties.candleStyle.borderUpColor": "#00ff87",
                "mainSeriesProperties.candleStyle.borderDownColor": "#ff006e",
                "mainSeriesProperties.candleStyle.wickUpColor": "#00ff87",
                "mainSeriesProperties.candleStyle.wickDownColor": "#ff006e",

                // Grid lines - Subtle
                "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 0.05)",
                "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 0.05)",

                // Text color
                "scalesProperties.textColor": "#b6b6d2",
            },

            // Loading screen background
            loading_screen: { backgroundColor: "transparent" },

            // Scale settings
            timeScale: {
                borderVisible: false,
                backgroundColor: "transparent",
            },
            rightPriceScale: {
                borderVisible: false,
                backgroundColor: "transparent",
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            },
            toolbar_bg: "transparent",
            toolbar_text_color: "#b6b6d2",
            toolbar: {
                // Show buttons on the toolbar
                show_button_text: true,
                // Buttons to show
                buttons: [
                    { title: 'Time', icon: 'time', action: 'timeframes' },
                    { title: 'Indicators', icon: 'indicators', action: 'indicators' },
                    { title: 'Compare', icon: 'compare', action: 'compare' },
                    { title: 'Settings', icon: 'settings', action: 'settings' }
                ]
            },
        };

        const tvWidget = new window.TradingView.widget(widgetOptions);
        tvWidgetRef.current = tvWidget;

        // Subscribe to the interval change event when chart is ready
        tvWidget.onChartReady(() => {
            const chart = tvWidget.activeChart();

            // Set the chart reference in the datafeed so it can call resetData() when needed
            if (datafeed && typeof datafeed.setChartRef === 'function') {
                datafeed.setChartRef(chart);
                console.log('Chart: Set chart reference in datafeed for resetData() support');
            }

            // Apply additional styles that can't be set in the initial options
            chart.applyOverrides({
                "paneProperties.background": "rgba(0,0,0,0)",
                "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 0.05)",
                "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 0.05)",
                "scalesProperties.textColor": "#b6b6d2",
            });

            // Add resize observer to handle container size changes
            if (chartContainerRef.current) {
                const resizeObserver = new ResizeObserver(() => {
                    // Instead of using resize(), we'll update the iframe directly
                    if (tvWidget && tvWidget.iframe) {
                        tvWidget.iframe.style.width = '100%';
                        tvWidget.iframe.style.height = '100%';
                    }
                });
                resizeObserver.observe(chartContainerRef.current);
            }

            // Subscribe to interval changes
            chart.onIntervalChanged().subscribe(null, (newInterval) => {
                console.log("TradingView interval changed to:", newInterval);

                // Immediately show loading overlay to prevent visual glitches
                setIsUpdating(true);

                // Track the pending interval change
                const apiInterval = mapResolutionToInterval(newInterval);
                pendingIntervalRef.current = apiInterval;
                console.log("Chart: Pending interval set to:", apiInterval);

                // Update the current interval state
                setCurrentInterval(newInterval);

                // Notify parent component about the interval change
                // This will trigger WebSocket reconnection in Hero.js
                if (onIntervalChange) {
                    console.log("Notifying parent of interval change:", apiInterval);
                    onIntervalChange(apiInterval);
                }
            });
        });

        return () => {
            if (tvWidgetRef.current) tvWidgetRef.current.remove();
        };
    }, [symbol]); // Only re-initialize on symbol change

    // Apply background color to the container as well
    return (
        <div style={{
            width: '100%',
            height: dimensions.height,
            position: 'relative', // Ensure proper positioning
        }}>
            <div
                ref={chartContainerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: "transparent",
                    position: 'absolute', // Fill the container
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            />

            {/* Loading overlay during interval changes */}
            {isUpdating && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(11, 11, 27, 0.8)', // Semi-transparent dark overlay
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    backdropFilter: 'blur(4px)',
                }}>
                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '24px 32px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid rgba(255, 255, 255, 0.1)',
                            borderTop: '3px solid #d500f9', // Neon purple spinner
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        <span style={{
                            color: '#ffffff',
                            fontSize: '14px',
                            fontWeight: 500,
                        }}>Loading interval data...</span>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Chart;
