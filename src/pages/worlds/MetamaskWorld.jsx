import WorldLayout from '../../components/WorldLayout'
import heroMetamask from '../../assets/explore/METAMASK WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const metamaskGames = [
  { id: 'metamask-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'metamask-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'metamask-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'metamask-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'metamask-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'metamask-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'metamask-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'metamask-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'metamask-9', title: 'GAME NAME HERE', img: g9 },
]

export default function MetamaskWorld() {
  return (
    <WorldLayout
      worldId="metamask"
      worldTitle="METAMASK WORLD"
      worldDescription="Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim."
      worldCtaText="CREATE YOU OWN METAMASK GAME"
      heroImage={heroMetamask}
      games={metamaskGames}
      theme="metamask"
      accentColor="#FF8521"
    />
  )
}
