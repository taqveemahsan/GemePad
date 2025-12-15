import WorldLayout from '../../components/WorldLayout'
import heroDoge from '../../assets/explore/DOGE WORLD_Right_Side.png'

import d1 from '../../assets/dogegames/Frame 64-card1.png'
import d2 from '../../assets/dogegames/Frame 64-card2.png'
import d3 from '../../assets/dogegames/Frame 64-card3.png'
import d4 from '../../assets/dogegames/Frame 64-card4.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'

const dogeGames = [
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
]

export default function DogeWorld() {
  return (
    <WorldLayout
      worldId="doge"
      worldTitle="DOGE WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN DOGE GAME"
      heroImage={heroDoge}
      games={dogeGames}
      theme="doge"
      accentColor="#FFBF00"
    />
  )
}
