import WorldLayout from '../../components/WorldLayout'
import heroRocky from '../../assets/rockyworld/1.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const rockyGames = [
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
]

export default function RockyWorld() {
  return (
    <WorldLayout
      worldId="rocky"
      worldTitle="ROCKY RABBIT WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN ROCKY GAME"
      heroImage={heroRocky}
      games={rockyGames}
      theme="rocky"
      accentColor="#00D1FF"
    />
  )
}
