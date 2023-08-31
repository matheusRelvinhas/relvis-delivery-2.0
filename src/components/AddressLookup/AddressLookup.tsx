'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const AddressLookup: React.FC = () => {

  const { dataCss, cep, cepError, handleCepChange } = useGlobalContext();

  return (
    <div>
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="Digite o CEP (somente números)"
        value={cep}
        onChange={handleCepChange}
        maxLength={8}
      />
      {cepError && <p style={{ color: 'red' }}>{cepError}</p>}
    </div>
  );
};

export default AddressLookup;