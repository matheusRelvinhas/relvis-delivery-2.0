import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginPurchaseRequest.css';

const LoginPurchaseRequest: React.FC = () => {
  const {
    dataCss,
    purchaseRequests,
    filteredPurchaseRequests,
    handlePurchaseRequestClick,
    selectedPurchaseRequest,
    selectedOption,
    setSelectedOption,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleAcepptPurchase,
  } = useGlobalContext();

  const purchaseRequest: any = purchaseRequests?.find(
    (purchaseRequest) => purchaseRequest.id === selectedPurchaseRequest
  );

  return (
    <div className="login-purchase-requests">
      <div className="purchase-requests-indice">
        <div>
          <h2>Pedidos</h2>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Hoje">Hoje</option>
            <option value="Período">Período</option>
            <option value="Todos">Todos</option>
          </select>
        </div>
        <input
          type="date"
          placeholder="data início"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={selectedOption !== 'Período'}
        />
        <input
          type="date"
          placeholder="data fim"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={selectedOption !== 'Período'}
        />
        <div className="purchase-requests-list">
          {filteredPurchaseRequests?.map((purchaseRequest) => (
            <div
              key={purchaseRequest.id}
              onClick={() => handlePurchaseRequestClick(purchaseRequest)}
              className="purchase-request-item"
            >
              <p>ID: 000{purchaseRequest.order}</p>
              <p>Cliente: {purchaseRequest.name}</p>
              R$ {purchaseRequest.total.toFixed(2)}
              {purchaseRequest.status}
            </div>
          ))}
        </div>
        <div>Total : R$ 10,00</div>
      </div>
      <div className="purchase-request">
        {selectedPurchaseRequest !== '' ? (
          <div className='purchase-request-selected' key={purchaseRequest.id}>
            <div>
              <p>Status: {purchaseRequest.status}</p>
              <p>
                Data / Hora: {purchaseRequest.date} {purchaseRequest.time}
              </p>
              <p>ID: 000{purchaseRequest.order}</p>
            </div>
            <div>
              <p>Cliente: {purchaseRequest.name}</p>
              <p>Celular: {purchaseRequest.cellphone}</p>
              <p>Cep: {purchaseRequest.cep}</p>
              <p>Rua / Av.: {purchaseRequest.road}</p>
              <p>Nº: {purchaseRequest.number}</p>
              <p>Complemento: {purchaseRequest.complement}</p>
              <p>Bairro: {purchaseRequest.district}</p>
            </div>
            <div>
              Pedido: {purchaseRequest.purchase}
              <p>Obs.: {purchaseRequest.observation}</p>
            </div>
            <div>
              <p>Pagamento: {purchaseRequest.payment}</p>
              <p>Troco: {purchaseRequest.troco}</p>
              <p>Total: R$ {purchaseRequest.total.toFixed(2)}</p>
            </div>
            <div>
            <button onClick={() => handleAcepptPurchase(purchaseRequest)}>Aceitar</button>
            </div>
          </div>
        ) : (
          'Clique em um pedido para ver detalhes'
        )}
      </div>
    </div>
  );
};

export default LoginPurchaseRequest;
