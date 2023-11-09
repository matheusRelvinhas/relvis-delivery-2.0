'use client';

import { useGlobalContext } from '@/Context/store';
import React, { ChangeEvent } from 'react';
import './StyledSelect.css';

interface StyledSelectProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function StyledSelect(props: StyledSelectProps) {
  const { dataCss, paymentMethod } = useGlobalContext();

  return (
    <div className="styled-select-group">
      <div
        className="styled-select"
        style={{
          background:
            paymentMethod === ''
              ? `${dataCss.colorPrimary}`
              : `${dataCss.colorFourth}`,
          borderColor:
            paymentMethod === ''
              ? `${dataCss.colorSecundary}`
              : `${dataCss.colorPrimary}`,
        }}
      >
        <select
          onChange={props.onChange}
          required
          style={{
            color:
              paymentMethod === ''
                ? `${dataCss.summaryFont}`
                : `${dataCss.fontColor}`,
            background:
              paymentMethod === ''
                ? `${dataCss.colorPrimary}`
                : `${dataCss.colorFourth}`,
          }}
        >
          <option value="">Selecione um método de pagamento</option>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
          <option value="Pix">Pix</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Dinheiro trocado">Dinheiro trocado</option>
          <option value="Refeicao">Refeição</option>
        </select>
        {paymentMethod === '' && (
          <figure>
            <picture>
              <source src={dataCss.arrowImage.down} type="image/png" />
              <img
                src={dataCss.arrowImage.down}
                alt="icon-img"
                height={'10px'}
                width={'17.5px'}
              />
            </picture>
          </figure>
        )}
      </div>
      <label
        className="label-select"
        style={{
          background:
            paymentMethod === ''
              ? `${dataCss.colorFourth}`
              : `${dataCss.colorPrimary}`,
          color:
            paymentMethod === ''
              ? `${dataCss.fontColor}`
              : `${dataCss.summaryFont}`, //dataCss.fontColor
          borderColor:
            paymentMethod === ''
              ? `${dataCss.colorPrimary}`
              : `${dataCss.colorSecundary}`,
        }}
      >
        {props.label}
      </label>
    </div>
  );
}
