'use client';

import './Hamburger.css';
import { useGlobalContext } from '@/Context/store';
import About from '../About/About';

export default function Hamburger() {
  const { isOpen, handleCheckboxChange, dataCss } = useGlobalContext();

  return (
    <>
      <div className="hamburger">
        <label className="burger">
          <input
            type="checkbox"
            id="burger"
            checked={isOpen}
            onChange={handleCheckboxChange}
          />
          <span style={{background: dataCss.colorThird}}></span>
          <span style={{background: dataCss.colorThird}}></span>
          <span style={{background: dataCss.colorThird}}></span>
        </label>
      </div>
      {isOpen && (
        <div className="tab-content">
          <div
            style={{background: dataCss.colorPrimary}}
            className="tab-itens"
          >
            <About />
          </div>
        </div>
      )}
    </>
  );
}
