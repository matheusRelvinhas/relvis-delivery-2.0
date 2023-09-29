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
      <div>
        <Hamburger/>
        <span>{isOpenStore ? 'Aberto' : 'Fechado'}</span>
      </div>
      <figure>
        <picture className='logo-img' >
          <source src={dataCss.logoImage[3]} type="image/webp" />
          <source src={dataCss.logoImage[2]} type="image/png" />
          <source src={dataCss.logoImage[1]} type="image/webp" />
          <source src={dataCss.logoImage[0]} type="image/png" />
          <img src={dataCss.logoImage[0]} alt="logo-img" style={{ borderColor: dataCss.colorSecundary}}/>
        </picture>
      </figure>
      <Cart/>
    </header>
  )
}
