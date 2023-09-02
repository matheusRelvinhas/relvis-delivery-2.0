'use client';

import React, { useState , useEffect } from 'react';
import { useGlobalContext } from '@/Context/store';
import AddressLookup from '../AddressLookup/AddressLookup';
import StyledButton from '../StyledButton/StyledButton';
import './FormContact.css';

interface FormContactProps {}

const FormContact: React.FC<FormContactProps> = () => {
  const {
    dataCss,
    road,
    number,
    complement,
    district,
    city,
    state,
    setRoad,
    setNumber,
    setComplement,
    setDistrict,
    setCity,
    setState,
    handleFinalize,
    setName,
    paymentMethod,
    setPaymentMethod,
    troco,
    setTroco,
    name,
    cellphone,
    setCellphone,
    totalItems,
    cartTotal,
    setIsBuy,
    isFormValid,
  } = useGlobalContext();

  return (
    <form className='form-contact' onSubmit={handleFinalize}>
      <button className="back-button-form" onClick={() => setIsBuy(false)}>
      <figure >
        <picture>
          <source src={dataCss.backImage} type="image/png" />
          <img
            src={dataCss.backImage}
            alt="back-img"
            height='25px'
            width='25px'
          />
        </picture>
      </figure>
      </button>
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="nome"
        value={name}
        required
        onChange={(event) => setName(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="number"
        placeholder="telefone ex: (31)971451910"
        value={cellphone}
        required
        onChange={(event) => setCellphone(event.target.value)}
      />
      <AddressLookup />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="rua"
        value={road}
        required
        onChange={(event) => setRoad(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="numero"
        value={number}
        required
        onChange={(event) => setNumber(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="complemento, ex: ap 102"
        value={complement}
        onChange={(event) => setComplement(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="bairro"
        value={district}
        required
        onChange={(event) => setDistrict(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="cidade"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        type="text"
        placeholder="estado"
        value={state}
        onChange={(event) => setState(event.target.value)}
      />
      <select
        style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
        onChange={(event) => setPaymentMethod(event.target.value)}
        required
      >
        <option value="">Selecione um método de pagamento</option>
        <option value="Crédito">Crédito</option>
        <option value="Débito">Débito</option>
        <option value="Pix">Pix</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Dinheiro trocado">Dinheiro trocado</option>
      </select>
      {paymentMethod === 'Dinheiro' && (
        <input
          style={{ background: dataCss.colorInput, border: `1px solid ${dataCss.colorBorder}` }}
          type="number"
          placeholder="troco para quanto?"
          min={cartTotal}
          value={troco}
          onChange={(event) => setTroco(event.target.value)}
        />
      )}
      <h2>Total: R${cartTotal.toFixed(2)}</h2>
      <StyledButton
        normalBackgroundColor={dataCss.colorSecundary}
        activeBackgroundColor={dataCss.activeButtonColor}
        className={`cart-button-finalize ${totalItems === 0 || !isFormValid ? 'disabled' : ''}`}
        type='submit'
        disabled={totalItems === 0 || !isFormValid}
      >
        <h1>Finalizar pedido</h1>
      </StyledButton>
    </form>
  );
};

export default FormContact;
