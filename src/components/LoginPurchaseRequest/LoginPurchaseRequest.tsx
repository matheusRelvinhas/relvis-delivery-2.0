import React, { useRef, RefObject, useState } from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
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
    isEditPurchase,
    setIsEditPurchase,
  } = useGlobalContext();

  const [namePurchase, setNamePurchase] = useState('');
  const [cellphonePurchase, setCellphonePurchase] = useState('');
  const [cepPurchase, setCepPurchase] = useState('');
  const [roadPurchase, setRoadPurchase] = useState('');
  const [numberPurchase, setNumberPurchase] = useState('');
  const [complementPurchase, setComplementPurchase] = useState('');
  const [districtPurchase, setDistrictPurchase] = useState('');
  const [purchasePurchase, setPurchasePurchase] = useState('');
  const [observationPurchase, setObservationPurchase] = useState('');
  const [paymentPurchase, setPaymentPurchase] = useState('');
  const [trocoPurchase, setTrocoPurchase] = useState('');
  const [totalPurchase, setTotalPurchase] = useState('');

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

  const handleEditPurchase = async (purchaseRequest: any) => {
    const collectionRef = firestore.collection('purchaseRequests');
    const purchaseRequestRef = collectionRef.doc(purchaseRequest.id);
    try {
      const updatedPurchaseRequestData = {
        name: namePurchase,
        cellphone: cellphonePurchase,
        cep: cepPurchase,
        road: roadPurchase,
        number: numberPurchase,
        complement: complementPurchase,
        district: districtPurchase,
        purchase: purchasePurchase,
        observation: observationPurchase,
        payment: paymentPurchase,
        troco: trocoPurchase,
        total: totalPurchase,
      };
      await purchaseRequestRef.update(updatedPurchaseRequestData);
      console.log('Pedido editado com sucesso!');
      } catch (error) {
      console.error('Erro ao editar pedido:', error);
    }
  };

  const handleIsEditPurchase = (purchaseRequest: any) => {
    if (isEditPurchase) {
      handleEditPurchase(purchaseRequest)
      setIsEditPurchase(false)
    } else {
      setNamePurchase(purchaseRequest.name);
      setCellphonePurchase(purchaseRequest.cellphone);
      setCepPurchase(purchaseRequest.cep);
      setRoadPurchase(purchaseRequest.road);
      setNumberPurchase(purchaseRequest.number);
      setComplementPurchase(purchaseRequest.complement);
      setDistrictPurchase(purchaseRequest.district);
      setPurchasePurchase(purchaseRequest.purchase);
      setObservationPurchase(purchaseRequest.observation);
      setPaymentPurchase(purchaseRequest.payment);
      setTrocoPurchase(purchaseRequest.troco);
      setTotalPurchase(purchaseRequest.total);
      setIsEditPurchase(true)
    }
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
              R$ {parseFloat(purchaseRequest.total.toString()).toFixed(2)}
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
              <button onClick={() =>handleIsEditPurchase(purchaseRequest)}>{ isEditPurchase ? 'Salvar' : 'Editar'}</button>
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
                <p>Cliente: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Cliente"
                    value={namePurchase}
                    onChange={(event) => setNamePurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.name}
                </p>
                <p>Celular: {isEditPurchase ? (
                  <input
                    type="number"
                    placeholder="Celular"
                    value={cellphonePurchase}
                    onChange={(event) => {
                      const formattedInput = event.target.value.replace(/[^0-9]/g, '');
                      if (formattedInput.length <= 11) {
                        setCellphonePurchase(formattedInput);
                      }
                    }}
                  />
                  ) : purchaseRequest?.cellphone}
                </p>
                <p>Cep: {isEditPurchase ? (
                  <input
                    type="number"
                    placeholder="Cep"
                    value={cepPurchase}
                    onChange={(event) => {
                      const formattedInput = event.target.value.replace(/[^0-9]/g, '');
                      if (formattedInput.length <= 8) {
                        setCepPurchase(formattedInput);
                      }
                    }}
                  />
                  ) : purchaseRequest?.cep}
                </p>
                <p>Rua / Av.: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Rua / Av.:"
                    value={roadPurchase}
                    onChange={(event) => setRoadPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.road}
                </p>
                <p>Nº: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Número"
                    value={numberPurchase}
                    onChange={(event) => setNumberPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.number}
                </p>
                <p>Complemento: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Complemento"
                    value={complementPurchase}
                    onChange={(event) => setComplementPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.complement}
                </p>
                <p>Bairro: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Bairro"
                    value={districtPurchase}
                    onChange={(event) => setDistrictPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.district}
                </p>
              </div>
              <div>
                <p>Pedido: {isEditPurchase ? (
                  <textarea
                    rows={3}
                    placeholder="Pedido"
                    value={purchasePurchase}
                    onChange={(event) => setPurchasePurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.purchase}
                </p>
                <p>Obs.: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Observação"
                    value={observationPurchase}
                    onChange={(event) => setObservationPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.observation}
                </p>
              </div>
              <div>
                <p>Pagamento: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Pagamento"
                    value={paymentPurchase}
                    onChange={(event) => setPaymentPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.payment}
                </p>
                <p>Troco: {isEditPurchase ? (
                  <input
                    type="number"
                    placeholder="Troco"
                    value={trocoPurchase}
                    onChange={(event) => setTrocoPurchase(event.target.value)}
                  />
                  ) : purchaseRequest?.troco}
                </p>
                <p>Total: {isEditPurchase ? (
                  <input
                    type="text"
                    placeholder="Total"
                    value={totalPurchase}
                    onChange={(event) => setTotalPurchase(event.target.value)}
                  />
                  ) : parseFloat(purchaseRequest?.total.toString()).toFixed(2)}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleAcepptPurchase(purchaseRequest)}
                disabled={
                  purchaseRequest?.status === 'finish' ||
                  purchaseRequest?.status === 'accepted' ||
                  isEditPurchase
                }
              >
                {purchaseRequest?.status === 'canceled' ? 'Reabrir' : 'Aceitar'}
              </button>
              <button
                onClick={() => handleFinishPurchase(purchaseRequest)}
                disabled={
                  purchaseRequest?.status === 'canceled' ||
                  purchaseRequest?.status === 'finish' ||
                  purchaseRequest?.status === 'new' ||
                  isEditPurchase
                }
              >
                Finalizar
              </button>
              <button
                onClick={() => handleCanceledPurchase(purchaseRequest)}
                disabled={purchaseRequest?.status === 'canceled' || isEditPurchase}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePurchase(purchaseRequest)}
                disabled={purchaseRequest?.status !== 'canceled' || isEditPurchase}
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
