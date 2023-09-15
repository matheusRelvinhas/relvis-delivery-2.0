'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddressLookup from '../AddressLookup/AddressLookup';
import StyledButton from '../StyledButton/StyledButton';
import StyledInput from '../StyledInput/StyledInput';
import './FormContact.css';

interface FormContactProps {}

const FormContact: React.FC<FormContactProps> = () => {
  const {
    dataCss,
    road,
    number,
    complement,
    district,
    setRoad,
    setNumber,
    setComplement,
    setDistrict,
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
  
  const handleCellphoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCellphone = event.target.value.replace(/\D/g, ''); // Remove qualquer caracter que não seja número
    if (newCellphone.length <= 14) {
      setCellphone(newCellphone);
    }
  }

  return (
    <form className="form-contact" onSubmit={handleFinalize}>
      <div className="figure-form">
        <figure>
          <button className="back-button-form" onClick={() => setIsBuy(false)}>
            <picture>
              <source src={dataCss.backImage} type="image/png" />
              <img
                src={dataCss.backImage}
                alt="back-img"
                height="25px"
                width="25px"
              />
            </picture>
          </button>
        </figure>
      </div>
      <div className="payment-container">
        <div className="select-group">
          <select
            className="select"
            style={{
              background: `${dataCss.colorInput}`,
              borderColor:
                paymentMethod === '' ? '#8c8c8c' : `${dataCss.colorSecundary}`,
            }}
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
          <label 
            className="label"
            style={{ 
              background: paymentMethod === '' ? '#8c8c8c' : `${dataCss.colorSecundary}`,
              color: paymentMethod === '' ? `${dataCss.fontColor}` : `${dataCss.summaryFont}`,
            }}
          >
            Pagamento
          </label>
        </div>
        {paymentMethod === 'Dinheiro' && (
          <StyledInput
            label="Troco?"
            placeholder="ex.: R$10.00"
            type="number"
            value={troco}
            onChange={(event) => setTroco(event.target.value)}
            maxLength={10}
            minLength={1}
          />
        )}
        <h2>Total: R${cartTotal.toFixed(2)}</h2>
      </div>
      <StyledInput
        label="Nome"
        placeholder="ex.: João / Maria"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        minLength={1}
        maxLength={100}
      />
      <StyledInput
        label="Celular"
        placeholder="ex.: (31) 9 9999-9999"
        type="number"
        value={cellphone}
        onChange={(event) => {
          const formattedInput = event.target.value.replace(/[^0-9]/g, '');
          if (formattedInput.length <= 11) {
            setCellphone(formattedInput);
          }
        }}
        maxLength={11}
        minLength={8}
      />
      <AddressLookup />
      <StyledInput
        label="Rua / Av"
        placeholder="ex.: Rua Itororó"
        type="text"
        value={road}
        onChange={(event) => setRoad(event.target.value)}
        maxLength={100}
        minLength={1}
      />
      <StyledInput
        label="Número"
        placeholder="ex.: 123"
        type="text"
        value={number}
        onChange={(event) => setNumber(event.target.value)}
        maxLength={30}
        minLength={1}
      />
      <StyledInput
        label="Complemento"
        placeholder="ex.: ap 101 / casa A"
        type="text"
        value={complement}
        onChange={(event) => setComplement(event.target.value)}
        maxLength={50}
        minLength={0}
      />
      <StyledInput
        label="Bairro"
        placeholder="ex.: Padre Eustáquio"
        type="text"
        value={district}
        onChange={(event) => setDistrict(event.target.value)}
        maxLength={100}
        minLength={1}
      />
      <StyledButton
        normalBackgroundColor={dataCss.colorSecundary}
        activeBackgroundColor={dataCss.activeButtonColor}
        className={`cart-button-finalize ${
          totalItems === 0 || !isFormValid ? 'disabled' : ''
        }`}
        type="submit"
        disabled={totalItems === 0 || !isFormValid}
      >
        <h1>Finalizar pedido</h1>
      </StyledButton>
    </form>
  );
};

export default FormContact;
