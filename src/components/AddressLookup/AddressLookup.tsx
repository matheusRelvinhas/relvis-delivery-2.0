'use client'

import React from 'react';
import StyledInput from '../StyledInput/StyledInput';
import { useGlobalContext } from '@/Context/store';

const AddressLookup: React.FC = () => {

  const { cep, handleCepChange } = useGlobalContext();

  return (
    <div>
      <StyledInput
        label="CEP"
        placeholder="ex.: 00000-000"
        type="number"
        value={cep}
        onChange={handleCepChange}
        maxLength={8}
        minLength={0}
      />
    </div>
  );
};

export default AddressLookup;