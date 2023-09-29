'use client';

import { useGlobalContext } from '@/Context/store';
import React, { ChangeEvent } from 'react';
import './StyledInput.css';

interface StyledInputProps {
  placeholder: string;
  label: string;
  type: string;
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  minLength: number;
  maxLength: number;
}

export default function StyledInput(props: StyledInputProps) {
  const { dataCss } = useGlobalContext();

  return (
    <div className="input-group">
      <input
        className="input"
        style={{ 
          background: props.value === '' ? `${dataCss.colorPrimary}` : `${dataCss.colorFourth}`,
          borderColor: props.value === '' ? `${dataCss.colorSecundary}` : `${dataCss.colorPrimary}`,
        }}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        minLength={props.minLength}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
      />
      <label 
        className="label"
        style={{ 
          background: props.value === '' ? `${dataCss.colorSecundary}` : `${dataCss.colorPrimary}`,
          color: props.value === '' ? `${dataCss.fontColor}` : `${dataCss.summaryFont}`,//dataCss.fontColor
          borderColor: props.value === '' ?  `${dataCss.colorPrimary}` : `${dataCss.colorSecundary}`,
        }}
      >
        {props.label}
      </label>
    </div>
  );
}
