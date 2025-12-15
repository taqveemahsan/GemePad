// Import all hero images
import heroRocky from '../assets/rockyworld/1.png'
import heroPepe from '../assets/explore/PEPE WORLD_Right_Side.png'
import heroDoge from '../assets/explore/DOGE WORLD_Right_Side.png'
import heroUniswap from '../assets/explore/UNISWAP WORLD_Right_Side.png'
import heroMetamask from '../assets/explore/METAMASK WORLD_Right_Side.png'
import heroSushiswap from '../assets/explore/SUSHISWAP WORLD_Ride_Side.png'
import heroPhantom from '../assets/explore/PHANTOM WORLD_Right_Side.png'
import heroLink from '../assets/explore/LINK WORLD_Right_Side.png'
import heroYeti from '../assets/explore/YETI DYOR WORLD_Right_Side.png'

// Import game card images
import g1 from '../assets/explore/1.png'
import g2 from '../assets/explore/2.png'
import g3 from '../assets/explore/3.png'
import g4 from '../assets/explore/4.png'
import g5 from '../assets/explore/5.png'
import g6 from '../assets/explore/6.png'
import g7 from '../assets/explore/7.png'
import g8 from '../assets/explore/8.png'
import g9 from '../assets/explore/9.png'

// Doge specific cards
import d1 from '../assets/dogegames/Frame 64-card1.png'
import d2 from '../assets/dogegames/Frame 64-card2.png'
import d3 from '../assets/dogegames/Frame 64-card3.png'
import d4 from '../assets/dogegames/Frame 64-card4.png'

// Yeti specific cards
import y1 from '../assets/yetidyorgames/Frame 65-card1.png'
import y2 from '../assets/yetidyorgames/Frame 65-card2.png'
import y3 from '../assets/yetidyorgames/Frame 65-card3.png'
import y4 from '../assets/yetidyorgames/Frame 65-card4.png'

// World configurations
export const worldsData = {
  rocky: {
    id: 'rocky',
    title: 'ROCKY RABBIT WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN ROCKY GAME',
    heroImage: heroRocky,
    theme: 'rocky',
    accentColor: '#00D1FF',
    games: [
      { id: 'rocky-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'rocky-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'rocky-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'rocky-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'rocky-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'rocky-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'rocky-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'rocky-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'rocky-9', title: 'GAME NAME HERE', img: g9 },
      { id: 'rocky-10', title: 'GAME NAME HERE', img: g1 },
      { id: 'rocky-11', title: 'GAME NAME HERE', img: g2 },
      { id: 'rocky-12', title: 'GAME NAME HERE', img: g3 },
    ],
  },

  pepe: {
    id: 'pepe',
    title: 'PEPE WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN PEPE GAME',
    heroImage: heroPepe,
    theme: 'pepe',
    accentColor: '#3EF4C0',
    games: [
      { id: 'pepe-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'pepe-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'pepe-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'pepe-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'pepe-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'pepe-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'pepe-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'pepe-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'pepe-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  doge: {
    id: 'doge',
    title: 'DOGE WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN DOGE GAME',
    heroImage: heroDoge,
    theme: 'doge',
    accentColor: '#FFBF00',
    games: [
      { id: 'doge-1', title: 'GAME NAME HERE', img: d1 },
      { id: 'doge-2', title: 'GAME NAME HERE', img: d2 },
      { id: 'doge-3', title: 'GAME NAME HERE', img: d3 },
      { id: 'doge-4', title: 'GAME NAME HERE', img: d4 },
      { id: 'doge-5', title: 'GAME NAME HERE', img: g1 },
      { id: 'doge-6', title: 'GAME NAME HERE', img: g2 },
      { id: 'doge-7', title: 'GAME NAME HERE', img: g3 },
      { id: 'doge-8', title: 'GAME NAME HERE', img: g4 },
      { id: 'doge-9', title: 'GAME NAME HERE', img: g5 },
      { id: 'doge-10', title: 'GAME NAME HERE', img: g6 },
      { id: 'doge-11', title: 'GAME NAME HERE', img: g7 },
      { id: 'doge-12', title: 'GAME NAME HERE', img: g8 },
    ],
  },

  uniswap: {
    id: 'uniswap',
    title: 'UNISWAP WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN UNISWAP GAME',
    heroImage: heroUniswap,
    theme: 'uniswap',
    accentColor: '#68D2FF',
    games: [
      { id: 'uniswap-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'uniswap-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'uniswap-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'uniswap-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'uniswap-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'uniswap-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'uniswap-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'uniswap-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'uniswap-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  metamask: {
    id: 'metamask',
    title: 'METAMASK WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN METAMASK GAME',
    heroImage: heroMetamask,
    theme: 'metamask',
    accentColor: '#FF8521',
    games: [
      { id: 'metamask-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'metamask-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'metamask-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'metamask-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'metamask-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'metamask-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'metamask-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'metamask-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'metamask-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  sushiswap: {
    id: 'sushiswap',
    title: 'SUSHISWAP WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN SUSHISWAP GAME',
    heroImage: heroSushiswap,
    theme: 'sushiswap',
    accentColor: '#7888FF',
    games: [
      { id: 'sushiswap-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'sushiswap-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'sushiswap-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'sushiswap-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'sushiswap-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'sushiswap-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'sushiswap-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'sushiswap-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'sushiswap-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  phantom: {
    id: 'phantom',
    title: 'PHANTOM WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN PHANTOM GAME',
    heroImage: heroPhantom,
    theme: 'phantom',
    accentColor: '#FF69B4',
    games: [
      { id: 'phantom-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'phantom-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'phantom-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'phantom-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'phantom-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'phantom-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'phantom-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'phantom-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'phantom-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  link: {
    id: 'link',
    title: 'LINK WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN LINK GAME',
    heroImage: heroLink,
    theme: 'link',
    accentColor: '#00A3FF',
    games: [
      { id: 'link-1', title: 'GAME NAME HERE', img: g1 },
      { id: 'link-2', title: 'GAME NAME HERE', img: g2 },
      { id: 'link-3', title: 'GAME NAME HERE', img: g3 },
      { id: 'link-4', title: 'GAME NAME HERE', img: g4 },
      { id: 'link-5', title: 'GAME NAME HERE', img: g5 },
      { id: 'link-6', title: 'GAME NAME HERE', img: g6 },
      { id: 'link-7', title: 'GAME NAME HERE', img: g7 },
      { id: 'link-8', title: 'GAME NAME HERE', img: g8 },
      { id: 'link-9', title: 'GAME NAME HERE', img: g9 },
    ],
  },

  yeti: {
    id: 'yeti',
    title: 'YETI WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN YETI GAME',
    heroImage: heroYeti,
    theme: 'yeti',
    accentColor: '#3EF4C0',
    games: [
      { id: 'yeti-1', title: 'GAME NAME HERE', img: y1 },
      { id: 'yeti-2', title: 'GAME NAME HERE', img: y2 },
      { id: 'yeti-3', title: 'GAME NAME HERE', img: y3 },
      { id: 'yeti-4', title: 'GAME NAME HERE', img: y4 },
      { id: 'yeti-5', title: 'GAME NAME HERE', img: g1 },
      { id: 'yeti-6', title: 'GAME NAME HERE', img: g2 },
      { id: 'yeti-7', title: 'GAME NAME HERE', img: g3 },
      { id: 'yeti-8', title: 'GAME NAME HERE', img: g4 },
      { id: 'yeti-9', title: 'GAME NAME HERE', img: g5 },
    ],
  },
}

// Helper function to get world by ID
export function getWorldById(worldId) {
  return worldsData[worldId] || null
}

// Get all world IDs
export function getAllWorldIds() {
  return Object.keys(worldsData)
}
