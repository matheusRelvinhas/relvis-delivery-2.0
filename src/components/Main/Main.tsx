'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import { useGlobalContext } from '@/Context/store';
import Search from '../Search/Search';
import StyledButton from '../StyledButton/StyledButton';
import StyledInput from '../StyledInput/StyledInput';
import AddressLookup from '../AddressLookup/AddressLookup';
import { useState, useEffect } from 'react';
import { format } from 'date-fns-tz';

import './Main.css';

export default function Main() {
  const {
    dataCss,
    categories,
    sendOrder,
    isFinalizeOrder,
    name,
    orderMessage,
    items,
    isClientRegistration,
    setIsClientRegistration,
    road,
    number,
    complement,
    district,
    setRoad,
    setNumber,
    setComplement,
    setDistrict,
    setName,
    cellphone,
    setCellphone,
    foundDistance,
    setFoundDistance,
    setIsTilted,
    setIsBuy,
  } = useGlobalContext();

  const handleFormContactMain = () => {
    setIsBuy(true);
    setIsTilted(true);
    setIsClientRegistration(false);
  };
  
  const [dateTime] = useState(new Date());
  const currentDay = format(dateTime, 'EEEE');
  
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const currentDateTime = new Date();
      const formattedTime = format(currentDateTime, 'HH:mm', {
        timeZone: 'America/Sao_Paulo',
      });
      setTime(formattedTime);
    };
    const intervalId = setInterval(updateDateTime, 60000); // Atualiza a hora a cada minuto
    updateDateTime(); // Chama a função uma vez para definir o valor inicial
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <main style={{ color: dataCss.fontColor }} className="main">
      <Search />
      {categories.map(
        (category) =>
          category.active &&
          items &&
          items.some(
            (item) => item.category === category.category && item.active && (
              (item.activeSaturday && currentDay == 'Sunday') ||
              (item.activeMonday && currentDay == 'Monday') ||
              (item.activeTuesday && currentDay == 'Tuesday') ||
              (item.activeWednesday && currentDay == 'Wednesday') ||
              (item.activeThursday && currentDay == 'Thursday') ||
              (item.activeFriday && currentDay == 'Friday') ||
              (item.activeSaturday && currentDay == 'Saturday')
            ) && ( (item.activeTime) &&
            (new Date(`1970-01-01T${time}:00`) >= new Date(`1970-01-01T${item.startTime}:00`) &&
            new Date(`1970-01-01T${time}:00`) <= new Date(`1970-01-01T${item.endTime}:00`)) ||
            item.activeTime == false
          )
          ) && (
            <div key={category.id}>
              <CardCarousel category={category} />
            </div>
          )
      )}
      {isFinalizeOrder && (
        <div className="tab-content-finalize-order">
          <div className="tab-content-finalize-order-massage-container">
            <div className="tab-content-finalize-order-massage">
              <span>{`${name}, pedido ${orderMessage} feito !`}</span>
              <span>{`Nos envie uma mensagem para acompanhar seu pedido.`}</span>
            </div>
            <StyledButton
              normalColor={dataCss.summaryFont}
              normalBackgroundColor={dataCss.colorPrimary}
              activeBackgroundColor={dataCss.activeButtonColor}
              disabledBackgroundColor={dataCss.disabledButtonColor}
              onClick={sendOrder}
              className="button-tab-content-finalize-order"
            >
              <span>Enviar mensagem</span>
              <figure>
                <picture>
                  <source src={dataCss.whatsImage} type="image/png" />
                  <img src={dataCss.whatsImage} alt="icon-img" />
                </picture>
              </figure>
            </StyledButton>
          </div>
        </div>
      )}
      {isClientRegistration && (
        <div className="tab-content-client-registration">
          <div
            className="client-registration-title"
            style={{ backgroundColor: dataCss.colorPrimary }}
          >
            <figure>
              <button onClick={handleFormContactMain}>
                <picture>
                  <source src={dataCss.backImage} type="image/png" />
                  <img src={dataCss.backImage} alt="back-img" />
                </picture>
              </button>
            </figure>
            <span style={{ color: dataCss.summaryFont }}>
              Cadastro do Cliente
            </span>
            <figure>
              <picture>
                <source src={dataCss.clientsImage} type="image/png" />
                <img src={dataCss.clientsImage} alt="icon-img" />
              </picture>
            </figure>
          </div>
          <div
            className="form-contact-info"
            style={{ background: `${dataCss.colorThird}` }}
          >
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
                const formattedInput = event.target.value.replace(
                  /[^0-9]/g,
                  ''
                );
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
            className="client-registration-button"
            type="button"
            onClick={handleFormContactMain}
            disabled={false}
          >
            <span>Cadastrar Cliente</span>
            <figure>
              <picture>
                <source src={dataCss.saveIconImage} type="image/png" />
                <img src={dataCss.saveIconImage} alt="icon-img" />
              </picture>
            </figure>
          </StyledButton>
        </div>
      )}
      {!foundDistance && (
        <div className="tab-content-client-found-distance">
          <div
            className="tab-content-client-found-distance-div"
            style={{ backgroundColor: dataCss.colorSecundary }}
          >
            <div
              className="tab-content-client-found-tiltle"
              style={{
                backgroundColor: dataCss.colorPrimary,
                color: dataCss.summaryFont,
              }}
            >
              <span>Fora da área de entrega</span>
            </div>
            <div className="tab-content-client-found-distance-info">
              <span>Verifique se cadastrou corretamente o endereço</span>
              <span>OU</span>
              <div>
                <span>Envie uma </span>
                <a href={`https://api.whatsapp.com/send?phone=+55${dataCss.cellPhone}&text=Oi, teria disponíbilidade de entrega?`}>
                  <StyledButton
                    normalColor={dataCss.summaryFont}
                    normalBackgroundColor={dataCss.colorPrimary}
                    activeBackgroundColor={dataCss.activeButtonColor}
                    disabledBackgroundColor={dataCss.disabledButtonColor}
                    className="tab-content-client-found-distance-message"
                    onClick={() => setFoundDistance(true)}
                  >
                    <span>mensagem</span>
                  </StyledButton>
                </a>
                <span> para verificar disponibilidade</span>
              </div>
            </div>
            <div
              className="tab-content-client-found-distance-button"
              style={{ backgroundColor: dataCss.colorPrimary }}
            >
              <StyledButton
                normalColor={dataCss.summaryFont}
                normalBackgroundColor={dataCss.colorPrimary}
                activeBackgroundColor={dataCss.activeButtonColor}
                disabledBackgroundColor={dataCss.disabledButtonColor}
                className="tab-content-client-found-distance-button"
                onClick={() => setFoundDistance(true)}
              >
                <span>OK</span>
                <figure>
                  <picture>
                    <source src={dataCss.saveIconImage} type="image/png" />
                    <img src={dataCss.saveIconImage} alt="icon-img" />
                  </picture>
                </figure>
              </StyledButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
