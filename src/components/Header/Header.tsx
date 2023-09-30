'use client';

import './Header.css';
import { useGlobalContext } from '@/Context/store';
import Hamburger from '../Hamburguer/Hamburguer';
import Cart from '../Cart/Cart';

export default function Header() {
  const { dataCss, isOpenStore } = useGlobalContext();

  return (
    <header 
      style={{background: dataCss.backgroundColorHeader, color: dataCss.fontColor, borderColor: dataCss.colorThird}}
      className='header'
    > 
      <div 
        className="header-open-store"
        style={{
          backgroundColor: dataCss.colorPrimary,
          color: dataCss.summaryFont,
          borderColor: dataCss.colorSecundary,
        }}
      >
        <span>{isOpenStore ? 'Aberto' : 'Fechado'}</span>
      </div>
      <div>
        <Hamburger/>
      </div>
      <figure>
        <picture className='logo-img' >
          <source src={dataCss.logoImage[1]} type="image/webp" />
          <source src={dataCss.logoImage[0]} type="image/png" />
          <img src={dataCss.logoImage[0]} alt="logo-img" style={{ borderColor: dataCss.colorSecundary}}/>
        </picture>
      </figure>
      <Cart/>
    </header>
  )
}
