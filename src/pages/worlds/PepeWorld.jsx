import WorldLayout from '../../components/WorldLayout'
import heroPepe from '../../assets/explore/PEPE WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const pepeGames = [
  { id: 'pepe-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'pepe-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'pepe-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'pepe-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'pepe-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'pepe-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'pepe-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'pepe-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'pepe-9', title: 'GAME NAME HERE', img: g9 },
]

export default function PepeWorld() {
  return (
    <WorldLayout
      worldId="pepe"
      worldTitle="PEPE WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN PEPE GAME"
      heroImage={heroPepe}
      games={pepeGames}
      theme="pepe"
      accentColor="#3EF4C0"
    />
  )
}
