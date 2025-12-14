import React from 'react'
import PepeWorld from './worlds/PepeWorld.jsx'
import DogeWorld from './worlds/DogeWorld.jsx'
import YetiWorld from './worlds/YetiWorld.jsx'
import RockyWorld from './worlds/RockyWorld.jsx'
import PhantomWorld from './worlds/PhantomWorld.jsx'
import UniswapWorld from './worlds/UniswapWorld.jsx'
import MetamaskWorld from './worlds/MetamaskWorld.jsx'
import LinkWorld from './worlds/LinkWorld.jsx'
import SushiswapWorld from './worlds/SushiswapWorld.jsx'

export default function WorldPage() {
  const slug =
    typeof window === 'undefined'
      ? ''
      : window.location.pathname.replace(/^\/world\/+/, '').split('/')[0]

  if (slug === 'pepe') return <PepeWorld />
  if (slug === 'doge') return <DogeWorld />
  if (slug === 'yeti') return <YetiWorld />
  if (slug === 'rocky') return <RockyWorld />
  if (slug === 'phantom') return <PhantomWorld />
  if (slug === 'uniswap') return <UniswapWorld />
  if (slug === 'metamask') return <MetamaskWorld />
  if (slug === 'link') return <LinkWorld />
  if (slug === 'sushiswap') return <SushiswapWorld />

  return (
    <div className="page" style={{ padding: '2rem' }}>
      <h2 style={{ margin: 0 }}>World not found</h2>
      <p style={{ opacity: 0.8, marginTop: '0.75rem' }}>Unknown world: {slug}</p>
    </div>
  )
}
