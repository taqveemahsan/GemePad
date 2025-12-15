// Define types for our data and callbacks are implicit in JS
/*
export interface Bar {
  time: number;
  [key: string]: any;
}

export interface SymbolInfo {
  name: string;
  ticker: string;
  type: string;
  session: string;
  timezone: string;
  exchange: string; // Add required exchange field
  minmov: number;
  pricescale: number;
  has_intraday: boolean;
  supported_resolutions: string[];
}
*/

export default class CustomDatafeed {
    constructor(data) {
        this.data = data; // data array provided from sampleData.js
        this.lastBar = data.length > 0 ? data[data.length - 1] : null;
        this.subscribers = {};
        this.updateInterval = null;
        this.resetCacheCallback = null;
    }

    // Update data method to be called when new data is available
    updateData(newData) {
        // First, validate and filter the data
        const currentTime = Date.now();
        const minTime = new Date('2000-01-01').getTime();

        // Filter out any bars with invalid timestamps
        const validData = newData.filter(bar => {
            const isValid = (
                typeof bar.time === 'number' &&
                !isNaN(bar.time) &&
                bar.time >= minTime &&
                bar.time <= currentTime
            );

            return isValid;
        });

        // Sort the data by time
        validData.sort((a, b) => a.time - b.time);

        // Remove any duplicate timestamps or out-of-sequence bars
        const uniqueData = [];
        let lastTime = 0;

        for (const bar of validData) {
            if (bar.time > lastTime) {
                uniqueData.push(bar);
                lastTime = bar.time;
            } else {
                console.warn(`Skipping bar with non-increasing time: ${new Date(bar.time).toISOString()}`);
            }
        }

        // Completely replace the data instead of updating
        this.data = uniqueData;
        this.lastBar = uniqueData.length > 0 ? uniqueData[uniqueData.length - 1] : null;

        // When we receive complete historical data, we need to signal the chart to reset its cache
        // and refetch the data. The onRealtimeCallback can ONLY update the most recent bar or add
        // newer bars - it cannot update historical bars without causing "time violation" errors.
        if (this.resetCacheCallback) {
            console.log('CustomDatafeed: Calling onResetCacheNeededCallback to refresh chart with new historical data');
            this.resetCacheCallback();
        }
    }

    onReady(callback) {
        setTimeout(() => {
            callback({
                // Removed '1' (1m interval) from supported resolutions - keeping logic but hiding from UI
                supported_resolutions: ['5', '15', '30', '60', '240', 'D', 'W', 'M'],
            });
        }, 0);
    }

    searchSymbols(
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) {
        // For simplicity, return an empty array
        onResultReadyCallback([]);
    }

    resolveSymbol(
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
    ) {
        // A minimal symbol resolution. Adjust as needed.
        setTimeout(() => {
            onSymbolResolvedCallback({
                name: symbolName,
                ticker: symbolName,
                type: 'stock',
                session: '24x7',
                timezone: 'Etc/UTC',
                exchange: 'SONIC', // Add required exchange field
                minmov: 1,
                // `pricescale` controls decimal precision (tick size = minmov / pricescale).
                // Many tokens here are extremely small (e.g. ~1e-9), so we need more precision
                // than 1e8 (which would round everything < 1e-8 to 0.00000000).
                pricescale: 1000000000000, // 1e12 => tick size 1e-12
                has_intraday: true,
                supported_resolutions: ['1', '5', '15', '30', '60', '240', 'D', 'W', 'M']
            });
        }, 0);
    }

    getBars(
        symbolInfo,
        resolution,
        periodParams,
        onHistoryCallback,
        onErrorCallback
    ) {
        const { from, to } = periodParams;

        // Validate the data array first
        const currentTime = Date.now();
        const minTime = new Date('2000-01-01').getTime();

        // Filter out any bars with invalid timestamps
        const validData = this.data.filter(bar => {
            return (
                typeof bar.time === 'number' &&
                !isNaN(bar.time) &&
                bar.time >= minTime &&
                bar.time <= currentTime
            );
        });

        // Sort the data by time
        validData.sort((a, b) => a.time - b.time);

        // Remove any duplicate timestamps or out-of-sequence bars
        const uniqueData = [];
        let lastTime = 0;

        for (const bar of validData) {
            if (bar.time > lastTime) {
                uniqueData.push(bar);
                lastTime = bar.time;
            }
        }

        // Filter your local data array for bars within the requested period.
        // Note: TradingView expects time in milliseconds, but periodParams are in seconds.
        const bars = uniqueData.filter(bar =>
            bar.time >= from * 1000 && bar.time <= to * 1000
        );

        if (bars.length) {
            onHistoryCallback(bars, { noData: false });
        } else {
            onHistoryCallback([], { noData: true });
        }
    }

    subscribeBars(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
    ) {

        // Store the callback with the subscriber ID and resolution
        this.subscribers[subscribeUID] = onRealtimeCallback;

        // Store the reset cache callback so we can call it when complete historical data is received
        // This is crucial for updating the chart with new historical data without causing time violations
        this.resetCacheCallback = onResetCacheNeededCallback;

        // If this is our first subscriber, start polling for updates
        if (Object.keys(this.subscribers).length === 1 && !this.updateInterval) {
            this.startRealTimeUpdates(symbolInfo, resolution);
        }
    }

    unsubscribeBars(subscriberUID) {
        delete this.subscribers[subscriberUID];

        // If no more subscribers, stop polling
        if (Object.keys(this.subscribers).length === 0 && this.updateInterval) {
            this.stopRealTimeUpdates();
        }
    }

    startRealTimeUpdates(symbolInfo, resolution) {
        // Set a fixed polling interval of 3 seconds
        const pollingInterval = 3000;

        // Clear any existing interval
        this.stopRealTimeUpdates();

        // Store the current resolution and symbol for use in the interval
        const currentSymbol = symbolInfo.name;
        const currentResolution = resolution;

        // Create a function to fetch new data
        const fetchNewData = async () => {

            try {
                // This would be replaced with your actual API call
                // For example: const newData = await fetchHistoricalPrices(currentSymbol, currentResolution);

                // If we have a last bar, notify all subscribers



                // if (this.lastBar) {
                //   Object.values(this.subscribers).forEach(callback => {
                //     callback(this.lastBar!);
                //   });
                // }
            } catch (error) {
                console.error("Error fetching real-time data:", error);
            }
        };

        // Poll for updates at the fixed interval
        this.updateInterval = setInterval(fetchNewData, pollingInterval);

        // Immediately fetch data once
        fetchNewData();
    }

    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}
