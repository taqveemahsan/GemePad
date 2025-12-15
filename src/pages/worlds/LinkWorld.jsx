import WorldLayout from '../../components/WorldLayout'
import heroLink from '../../assets/explore/LINK WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const linkGames = [
  { id: 'link-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'link-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'link-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'link-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'link-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'link-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'link-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'link-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'link-9', title: 'GAME NAME HERE', img: g9 },
]

export default function LinkWorld() {
  return (
    <WorldLayout
      worldId="link"
      worldTitle="LINK WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN LINK GAME"
      heroImage={heroLink}
      games={linkGames}
      theme="link"
      accentColor="#00A3FF"
    />
  )
}
