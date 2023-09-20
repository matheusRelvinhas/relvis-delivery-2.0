import React, { useRef, RefObject } from 'react';
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
    handleFinishPurchase,
    handleCanceledPurchase,
    handleDeletePurchase,
  } = useGlobalContext();

  const purchaseRequest: any = purchaseRequests?.find(
    (purchaseRequest) => purchaseRequest.id === selectedPurchaseRequest
  );

  const printRef: RefObject<HTMLDivElement> = useRef(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;

      const printWindow = window.open('', '', 'width=45');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(
          '<html><head><title>Relvis Delivery</title></head><body><div>'
        );
        printWindow.document.write('<p>Relvis Delivery</p>');
        printWindow.document.write(printContent.replace(/\n/g, '</br>'));
        printWindow.document.write('</body></div></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error('Não foi possível abrir a janela de impressão.');
      }
    } else {
      console.error('Elemento de impressão não encontrado.');
    }
  };

  const calculateTotal = (purchaseRequests: any) => {
    if (!purchaseRequests || purchaseRequests.length === 0) {
      return '0.00'; // Retorna 0.00 se a lista estiver vazia ou indefinida
    }
    const total = purchaseRequests.reduce((acc :number, purchaseRequest: any) => { // Usa reduce para somar os valores 'total' de todos os itens com status 'finish'
      if (purchaseRequest.status === 'finish') {
        const itemTotal = parseFloat(purchaseRequest.total); // Converte para número
        if (!isNaN(itemTotal)) {
          return acc + itemTotal;
        }
      }
      return acc;
    }, 0);
    return total.toFixed(2); // Formata o total com 2 casas decimais
  };

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
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={selectedOption !== 'Período'}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={startDate === ''}
          />
        </div>
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
        <div>Total : R$ {calculateTotal(filteredPurchaseRequests)}</div>
      </div>
      <div className="purchase-request">
        {selectedPurchaseRequest !== '' ? (
          <div className="purchase-request-container">
            <div className="purchase-request-print">
              <button onClick={handlePrint}>Imprimir</button>
            </div>
            <div
              className="purchase-request-selected"
              key={purchaseRequest?.id}
              ref={printRef}
            >
              <div>
                <p>Status: {purchaseRequest?.status}</p>
                <p>
                  Data / Hora: {purchaseRequest?.date} {purchaseRequest?.time}
                </p>
                <p>ID: 000{purchaseRequest?.order}</p>
              </div>
              <div>
                <p>Cliente: {purchaseRequest?.name}</p>
                <p>Celular: {purchaseRequest?.cellphone}</p>
                <p>Cep: {purchaseRequest?.cep}</p>
                <p>Rua / Av.: {purchaseRequest?.road}</p>
                <p>Nº: {purchaseRequest?.number}</p>
                <p>Complemento: {purchaseRequest?.complement}</p>
                <p>Bairro: {purchaseRequest?.district}</p>
              </div>
              <div>
                Pedido: {purchaseRequest?.purchase}
                <p>Obs.: {purchaseRequest?.observation}</p>
              </div>
              <div>
                <p>Pagamento: {purchaseRequest?.payment}</p>
                <p>Troco: {purchaseRequest?.troco}</p>
                <p>Total: R$ {purchaseRequest?.total.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleAcepptPurchase(purchaseRequest)}
                disabled={
                  purchaseRequest?.status === 'finish' ||
                  purchaseRequest?.status === 'accepted'
                }
              >
                {purchaseRequest?.status === 'canceled' ? 'Reabrir' : 'Aceitar'}
              </button>
              <button
                onClick={() => handleFinishPurchase(purchaseRequest)}
                disabled={
                  purchaseRequest?.status === 'canceled' ||
                  purchaseRequest?.status === 'finish' ||
                  purchaseRequest?.status === 'new'
                }
              >
                Finalizar
              </button>
              <button
                onClick={() => handleCanceledPurchase(purchaseRequest)}
                disabled={purchaseRequest?.status === 'canceled'}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePurchase(purchaseRequest)}
                disabled={purchaseRequest?.status !== 'canceled'}
              >
                Excluir
              </button>
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
