'use client';

import React, { useState } from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddClientForm.css';

const AddClientForm: React.FC = () => {
  const {
    dataCss,
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
    isEditClient,
    isContentOpen,
    setIsContentOpen,
    setIsEditClient,
  } = useGlobalContext();


  const toggleContent = () => {
    setNameClient('');
    setCellphoneClient('');
    setCepClient('');
    setRoadClient('');
    setNumberClient('');
    setComplementClient('');
    setDistrictClient('');
    setIsContentOpen(!isContentOpen);
    setIsEditClient(false);
  };

  const handleSubmitClient = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditClient) {
      handleEditClient(clientId);
    } else {
      addClient(event);
    }
  };

  return (
    <div className="add-client-form-container">
      <button onClick={toggleContent}>
        <div className="add-client-form-title">
          <span>{isContentOpen ? '-' : '+'}</span>
          <h2>{isEditClient ? 'Editar' : 'Adicionar'}</h2>
          <figure>
            <picture>
              <source src={dataCss.addClientImage} type="image/png" />
              <img src={dataCss.addClientImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentOpen && (
        <form onSubmit={handleSubmitClient} className="add-client-form">
          <input
            type="text"
            placeholder="nome"
            value={nameClient}
            onChange={(event) => setNameClient(event.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ddd + celular"
            value={cellphoneClient}
            onChange={(event) => {
              const formattedInput = event.target.value.replace(/[^0-9]/g, '');
              if (formattedInput.length <= 11) {
                setCellphoneClient(formattedInput);
              }
            }}
          />
          <input
            type="number"
            required
            placeholder="cep"
            value={cepClient}
            onChange={(event) => {
              const formattedInput = event.target.value.replace(/[^0-9]/g, '');
              if (formattedInput.length <= 8) {
                setCepClient(formattedInput);
              }
            }}
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
          />
          <input
            type="text"
            placeholder="bairro"
            value={districtClient}
            onChange={(event) => setDistrictClient(event.target.value)}
            required
          />
          <button type="submit">
            <span>{isEditClient ? 'Editar' : 'Adicionar'}</span>
            {isEditClient ? (
              <figure>
                <picture>
                  <source src={dataCss.editIconImage} type="image/png" />
                  <img src={dataCss.editIconImage} alt="icon-img" />
                </picture>
              </figure>
            ) : (
              <figure>
                <picture>
                  <source src={dataCss.addIconImage} type="image/png" />
                  <img src={dataCss.addIconImage} alt="icon-img" />
                </picture>
              </figure>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddClientForm;
