import WorldLayout from '../../components/WorldLayout'
import heroYeti from '../../assets/explore/YETI DYOR WORLD_Right_Side.png'

import y1 from '../../assets/yetidyorgames/Frame 65-card1.png'
import y2 from '../../assets/yetidyorgames/Frame 65-card2.png'
import y3 from '../../assets/yetidyorgames/Frame 65-card3.png'
import y4 from '../../assets/yetidyorgames/Frame 65-card4.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'

const yetiGames = [
  { id: 'yeti-1', title: 'GAME NAME HERE', img: y1 },
  { id: 'yeti-2', title: 'GAME NAME HERE', img: y2 },
  { id: 'yeti-3', title: 'GAME NAME HERE', img: y3 },
  { id: 'yeti-4', title: 'GAME NAME HERE', img: y4 },
  { id: 'yeti-5', title: 'GAME NAME HERE', img: g1 },
  { id: 'yeti-6', title: 'GAME NAME HERE', img: g2 },
  { id: 'yeti-7', title: 'GAME NAME HERE', img: g3 },
  { id: 'yeti-8', title: 'GAME NAME HERE', img: g4 },
  { id: 'yeti-9', title: 'GAME NAME HERE', img: g5 },
]

export default function YetiWorld() {
  return (
    <WorldLayout
      worldId="yeti"
      worldTitle="YETI WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN YETI GAME"
      heroImage={heroYeti}
      games={yetiGames}
      theme="yeti"
      accentColor="#3EF4C0"
    />
  )
}
