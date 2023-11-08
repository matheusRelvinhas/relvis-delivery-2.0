'use client';

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
    handleFinalize,
    paymentMethod,
    setPaymentMethod,
    troco,
    setTroco,
    name,
    cellphone,
    totalItems,
    cartTotal,
    setIsBuy,
    isFormValid,
    setIsClientRegistration,
    distance,
    deliveryPrice,
    totalSumDelivery,
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
          onClick={() => setIsClientRegistration(true)}
          className="form-contact-client-registration"
        >
          <div
            className="form-contact-client-registration-title"
            style={{
              backgroundColor: dataCss.colorPrimary,
              color: dataCss.summaryFont,
            }}
          >
            <span>Cliente</span>
            <figure>
              <picture>
                <source src={dataCss.clientsImage} type="image/png" />
                <img src={dataCss.clientsImage} alt="icon-img" />
              </picture>
            </figure>
          </div>
          <div className="form-contact-client-registration-info">
            {name && road && number && cellphone && district ? (
              <>
                <div>
                  <span className='form-contact-client-registration-span'>Nome: </span>
                  <span>{name}</span>
                </div>
                <div>
                  <span className='form-contact-client-registration-span'>Celular: </span>
                  <span>{cellphone}</span>
                </div>
                <div>
                  <span className='form-contact-client-registration-span'>Endereço: </span>
                  <span>
                    {road}, {number}, {complement}, {district}
                  </span>
                </div>
                <span>{distance?.toFixed(2)}</span>
              </>
            ) : (
              <div>
                <span>Cliente não cadastrado, clique aqui</span>
              </div>
            )}
          </div>
        </div>
        <div
          className="form-contact-delivery"
          style={{
            backgroundColor: dataCss.colorPrimary,
            borderColor: dataCss.colorSecundary,
          }}
        >
          <span style={{ color: dataCss.summaryFont }}>
            Entrega R$ {deliveryPrice?.toFixed(2)}
          </span>
          <figure>
            <picture>
              <source src={dataCss.cartImage} type="image/png" />
              <img src={dataCss.cartImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
        <div
          className="form-contact-total"
          style={{
            backgroundColor: dataCss.colorPrimary,
            borderColor: dataCss.colorSecundary,
          }}
        >
          <span style={{ color: dataCss.summaryFont }}>
            Total R$ {totalSumDelivery.toFixed(2)}
          </span>
          <figure>
            <picture>
              <source src={dataCss.moneyImage} type="image/png" />
              <img src={dataCss.moneyImage} alt="icon-img" />
            </picture>
          </figure>
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
