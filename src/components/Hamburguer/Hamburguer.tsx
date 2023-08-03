'use client';

import './Hamburger.css';
import { useGlobalContext } from '@/Context/store';

export default function Hamburger() {
  const { isOpen, handleCheckboxChange } = useGlobalContext();

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
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {isOpen && (
        <div className="tab-content">
          <div className="tab-itens">oi</div>
        </div>
      )}
    </>
  );
}
