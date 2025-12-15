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
import heroGeneral from '../assets/General_World_Hero.png'

import top1 from '../assets/toplaunches/Frame 48.png'
import top2 from '../assets/toplaunches/Frame 51.png'
import top3 from '../assets/toplaunches/Frame 52.png'
import top4 from '../assets/toplaunches/Frame 53.png'
import top5 from '../assets/toplaunches/Frame 54.png'
import top6 from '../assets/toplaunches/Frame 55.png'

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

// Pepe Cards
import pepe1 from '../assets/PEPE/1.png'
import pepe2 from '../assets/PEPE/2.png'
import pepe3 from '../assets/PEPE/3.png'
import pepe4 from '../assets/PEPE/4.png'
import pepe5 from '../assets/PEPE/5.png'

// Uniswap Cards
import uni1 from '../assets/Uniswap/1.png'
import uni2 from '../assets/Uniswap/2.png'
import uni3 from '../assets/Uniswap/3.png'
import uni4 from '../assets/Uniswap/4.png'
import uni5 from '../assets/Uniswap/5.png'

// Metamask Cards
import meta1 from '../assets/Metamask/1.png'
import meta2 from '../assets/Metamask/2.png'
import meta3 from '../assets/Metamask/3.png'
import meta4 from '../assets/Metamask/4.png'
import meta5 from '../assets/Metamask/5.png'

// Sushiswap Cards
import sushi1 from '../assets/Sushiswap/1.png'
import sushi2 from '../assets/Sushiswap/2.png'
import sushi3 from '../assets/Sushiswap/3.png'
import sushi4 from '../assets/Sushiswap/4.png'
import sushi5 from '../assets/Sushiswap/5.png'

// Phantom Cards
import phantom1 from '../assets/Phantom/1.png'
import phantom2 from '../assets/Phantom/2.png'
import phantom3 from '../assets/Phantom/3.png'
import phantom4 from '../assets/Phantom/4.png'
import phantom5 from '../assets/Phantom/5.png'


// World configurations
export const worldsData = {
  general: {
    id: 'general',
    title: 'GENERAL WORLD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.',
    ctaText: 'CREATE YOU OWN GENERAL GAME',
    heroImage: heroGeneral,
    theme: 'general',
    accentColor: '#FFFFFF',
    games: [
      { id: 'general-1', title: 'Uncharted 4', img: top1 },
      { id: 'general-2', title: 'Elden Ring', img: top2 },
      { id: 'general-3', title: 'Spider-Man 2', img: top3 },
      { id: 'general-4', title: 'Horizon', img: top4 },
      { id: 'general-5', title: 'Ghosts', img: top5 },
      { id: 'general-6', title: 'Final Fantasy', img: top6 },
    ],
  },
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
      { id: 'pepe-1', title: 'GAME NAME HERE', img: pepe1 },
      { id: 'pepe-2', title: 'GAME NAME HERE', img: pepe2 },
      { id: 'pepe-3', title: 'GAME NAME HERE', img: pepe3 },
      { id: 'pepe-4', title: 'GAME NAME HERE', img: pepe4 },
      { id: 'pepe-5', title: 'GAME NAME HERE', img: pepe5 },
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
      { id: 'uniswap-1', title: 'GAME NAME HERE', img: uni1 },
      { id: 'uniswap-2', title: 'GAME NAME HERE', img: uni2 },
      { id: 'uniswap-3', title: 'GAME NAME HERE', img: uni3 },
      { id: 'uniswap-4', title: 'GAME NAME HERE', img: uni4 },
      { id: 'uniswap-5', title: 'GAME NAME HERE', img: uni5 },
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
      { id: 'metamask-1', title: 'GAME NAME HERE', img: meta1 },
      { id: 'metamask-2', title: 'GAME NAME HERE', img: meta2 },
      { id: 'metamask-3', title: 'GAME NAME HERE', img: meta3 },
      { id: 'metamask-4', title: 'GAME NAME HERE', img: meta4 },
      { id: 'metamask-5', title: 'GAME NAME HERE', img: meta5 },
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
      { id: 'sushiswap-1', title: 'GAME NAME HERE', img: sushi1 },
      { id: 'sushiswap-2', title: 'GAME NAME HERE', img: sushi2 },
      { id: 'sushiswap-3', title: 'GAME NAME HERE', img: sushi3 },
      { id: 'sushiswap-4', title: 'GAME NAME HERE', img: sushi4 },
      { id: 'sushiswap-5', title: 'GAME NAME HERE', img: sushi5 },
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
      { id: 'phantom-1', title: 'GAME NAME HERE', img: phantom1 },
      { id: 'phantom-2', title: 'GAME NAME HERE', img: phantom2 },
      { id: 'phantom-3', title: 'GAME NAME HERE', img: phantom3 },
      { id: 'phantom-4', title: 'GAME NAME HERE', img: phantom4 },
      { id: 'phantom-5', title: 'GAME NAME HERE', img: phantom5 },
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
