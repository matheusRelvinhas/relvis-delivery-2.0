import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddClientForm from '../AddClientForm/AddClientForm';
import './LoginClient.css';

const LoginClient: React.FC = () => {
  const {
    dataCss,
    clients,
    message,
    setNameClient,
    setCellphoneClient,
    setCepClient,
    setRoadClient,
    setNumberClient,
    setComplementClient,
    setDistrictClient,
    setIsEditClient,
    setClientId,
    setIsContentClientOpen,
    handleDeleteClient,
  } = useGlobalContext();

  const handleIsEditClient = (client: any) => {
    setIsContentClientOpen(true);
    setClientId(client.id);
    setNameClient(client.name);
    setCellphoneClient(client.cellphone);
    setCepClient(client.cep);
    setRoadClient(client.road);
    setNumberClient(client.number);
    setComplementClient(client.complement);
    setDistrictClient(client.district);
    setIsEditClient(true);
  };

  const sendWhats = (cellphone: string) => {
    const whatsappLink = `https://api.whatsapp.com/send?phone=+55${cellphone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="login-client-container">
      <div className="login-client-title">
        <span>Clientes</span>
        <figure>
          <picture>
            <source src={dataCss.clientsImage} type="image/png" />
            <img src={dataCss.clientsImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <AddClientForm />
      <div className="login-client-list">
        {clients?.map((client) => (
          <div key={client.id} className="login-client-items">
            <div className="login-client-items-title">
              <h3>{client.name}</h3>
              <span>+55 {client.cellphone}</span>
            </div>
            <p>
              {client.road}, {client.number}, {client.complement},{' '}
              {client.district} - {client.cep}
            </p>
            <div className="login-client-buttons">
              <div>
                <button onClick={() => handleIsEditClient(client)}>
                  <figure>
                    <picture>
                      <source src={dataCss.editIconImage} type="image/png" />
                      <img src={dataCss.editIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
                <button onClick={() => sendWhats(client.cellphone)}>
                  <figure>
                    <picture>
                      <source src={dataCss.whatsImage} type="image/png" />
                      <img src={dataCss.whatsImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
              <button onClick={() => handleDeleteClient(client.id)}>
                <figure>
                  <picture>
                    <source src={dataCss.deleteIconImage} type="image/png" />
                    <img src={dataCss.deleteIconImage} alt="icon-img" />
                  </picture>
                </figure>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginClient;
