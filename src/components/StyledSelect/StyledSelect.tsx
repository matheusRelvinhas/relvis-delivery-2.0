'use client'

import { useGlobalContext } from '@/Context/store';
import React, { ChangeEvent } from 'react';
import './StyledSelect.css';

interface StyledSelectProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function StyledSelect(props: StyledSelectProps) {
  const { dataCss, setPaymentMethod, paymentMethod } = useGlobalContext();

  return (
    <div className="styled-select-group">
      <select
        className="styled-select"
        onChange={props.onChange}
        required
        style={{
          color: paymentMethod === '' ? `${dataCss.summaryFont}` : `${dataCss.fontColor}`,
          background: paymentMethod === '' ? `${dataCss.colorPrimary}` : `${dataCss.colorFourth}`,
          borderColor: paymentMethod === '' ? `${dataCss.colorSecundary}` : `${dataCss.colorPrimary}`,
        }}
      >
        <option value="">Selecione um método de pagamento</option>
        <option value="Crédito">Crédito</option>
        <option value="Débito">Débito</option>
        <option value="Pix">Pix</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Dinheiro trocado">Dinheiro trocado</option>
      </select>
      <label 
        className="label-select"
        style={{ 
          background: paymentMethod === '' ? `${dataCss.colorSecundary}` : `${dataCss.colorPrimary}`,
          color: paymentMethod === '' ? `${dataCss.fontColor}` : `${dataCss.summaryFont}`,//dataCss.fontColor
          borderColor: paymentMethod === '' ?  `${dataCss.colorPrimary}` : `${dataCss.colorSecundary}`,
        }}
      >
        {props.label}
      </label>
    </div>
  );
}
