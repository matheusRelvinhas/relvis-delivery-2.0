'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddressLookup from '../AddressLookup/AddressLookup';
import StyledButton from '../StyledButton/StyledButton';
import StyledInput from '../StyledInput/StyledInput';
import './FormContact.css';
import StyledSelect from '../StyledSelect/StyledSelect';

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

  const handlePriceTroco = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (input !== '') {
      input = (parseFloat(input) / 100).toFixed(2);
    }
    setTroco(input);
  };

  return (
    <form
      className="form-contact"
      onSubmit={handleFinalize}
      style={{ background: `${dataCss.colorPrimary}` }}
    >
      <div
        className="form-contact-title"
        style={{ backgroundColor: dataCss.colorPrimary }}
      >
        <figure>
          <button className="back-button-form" onClick={() => setIsBuy(false)}>
            <picture>
              <source src={dataCss.backImage} type="image/png" />
              <img src={dataCss.backImage} alt="back-img" />
            </picture>
          </button>
        </figure>
        <span style={{ color: dataCss.summaryFont }}>Pagamento</span>
        <figure>
          <picture>
            <source src={dataCss.iconAbout.payment} type="image/png" />
            <img src={dataCss.iconAbout.payment} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <div
        className="form-contact-payment-method"
        style={{ background: `${dataCss.colorThird}` }}
      >
        <StyledSelect
          onChange={(event) => setPaymentMethod(event.target.value)}
          label={'Pagamento'}
        />
        {paymentMethod === 'Dinheiro' && (
          <StyledInput
            label="Troco?"
            placeholder="ex.: R$10.00"
            type="number"
            value={troco}
            onChange={handlePriceTroco}
            maxLength={10}
            minLength={1}
          />
        )}
        <div
          className="form-contact-total"
          style={{
            backgroundColor: dataCss.colorPrimary,
            borderColor: dataCss.colorSecundary,
          }}
        >
          <span style={{ color: dataCss.summaryFont }}>
            Total:R$ {cartTotal.toFixed(2)}
          </span>
          <figure>
            <picture>
              <source src={dataCss.moneyImage} type="image/png" />
              <img src={dataCss.moneyImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </div>
      <div className="form-contact-info" style={{ background: `${dataCss.colorThird}` }}>
       <div className="input-top">
        <StyledInput
          label="Nome"
          placeholder="ex.: João / Maria"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={1}
          maxLength={100}
        />
        </div>
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
        <div className="input-bottom">
        <StyledInput
          label="Bairro"
          placeholder="ex.: Padre Eustáquio"
          type="text"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          maxLength={100}
          minLength={1}
        />
        </div>
      </div>
      <StyledButton
        normalColor={dataCss.summaryFont}
        normalBackgroundColor={dataCss.colorPrimary}
        activeBackgroundColor={dataCss.activeButtonColor}
        disabledBackgroundColor={dataCss.disabledButtonColor}
        className={`form-contact-button ${
          totalItems === 0 || !isFormValid ? 'disabled' : ''
        }`}
        type="submit"
        disabled={totalItems === 0 || !isFormValid}
      >
        <span>Finalizar pedido</span>
        <figure>
          <picture>
            <source src={dataCss.purchaseRequestsImage} type="image/png" />
            <img src={dataCss.purchaseRequestsImage} alt="icon-img" />
          </picture>
        </figure>
      </StyledButton>
    </form>
  );
};

export default FormContact;
