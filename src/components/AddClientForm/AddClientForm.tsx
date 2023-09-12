'use client';

import React, { useState } from 'react';
import { useGlobalContext } from '@/Context/store';

const AddClientForm: React.FC = () => {
  const {
    addClient,
    clientId,
    handleEditClient,
    nameClient, 
    setNameClient,
    cellphoneClient, 
    setCellphoneClient,
    cepClient, 
    setCepClient,
    roadClient, 
    setRoadClient,
    numberClient, 
    setNumberClient,
    complementClient, 
    setComplementClient,
    districtClient, 
    setDistrictClient,
    cityClient, 
    setCityClient,
    stateClient, 
    setStateClient,
    isEditClient,
  } = useGlobalContext();
  

  const handleSubmitClient = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditClient) {
      handleEditClient(clientId);
    } else {
      addClient(event);
    }
  };

  return (
    <form onSubmit={handleSubmitClient}>
      <h2>{isEditClient ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
      <input
        type="text"
        placeholder="nome"
        value={nameClient}
        onChange={(event) => setNameClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="celular"
        value={cellphoneClient}
        onChange={(event) => setCellphoneClient(event.target.value)}
        maxLength={11}
        required
      />
      <input
        type="number"
        placeholder="cep"
        value={cepClient}
        onChange={(event) => setCepClient(event.target.value)}
        maxLength={8}
        required
      />
      <input
        type="text"
        placeholder="logradouro"
        value={roadClient}
        onChange={(event) => setRoadClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="numero"
        value={numberClient}
        onChange={(event) => setNumberClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="complemento"
        value={complementClient}
        onChange={(event) => setComplementClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="bairro"
        value={districtClient}
        onChange={(event) => setDistrictClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="cidade"
        value={cityClient}
        onChange={(event) => setCityClient(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="state"
        value={stateClient}
        onChange={(event) => setStateClient(event.target.value)}
        required
      />
      <button type="submit">{isEditClient ? 'Editar' : 'Adicionar'}</button>
    </form>
  );
};

export default AddClientForm;
