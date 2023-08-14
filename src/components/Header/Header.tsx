'use client';

import './Header.css';
import { useGlobalContext } from '@/Context/store';
import Hamburger from '../Hamburguer/Hamburguer';
import Cart from '../Cart/Cart';

export default function Header() {
  const { dataCss } = useGlobalContext();

  return (
    <header 
      style={{background: dataCss.backgroundColorHeader, color: dataCss.fontColor}}
      className='header'
    >
      <Hamburger/>
      <figure>
        <picture>
          <source src={dataCss.logoImage[3]} type="image/webp" />
          <source src={dataCss.logoImage[2]} type="image/png" />
          <source src={dataCss.logoImage[1]} type="image/webp" />
          <source src={dataCss.logoImage[0]} type="image/png" />
          <img className='logo-img' src={dataCss.logoImage[0]} alt="logo-img" />
        </picture>
      </figure>
      <Cart/>
    </header>
  )
}
