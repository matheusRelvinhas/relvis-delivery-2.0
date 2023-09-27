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
    isEditPurchase,
    setIsEditPurchase,
    namePurchase,
    setNamePurchase,
    cellphonePurchase,
    setCellphonePurchase,
    cepPurchase,
    setCepPurchase,
    roadPurchase,
    setRoadPurchase,
    numberPurchase,
    setNumberPurchase,
    complementPurchase,
    setComplementPurchase,
    districtPurchase,
    setDistrictPurchase,
    purchasePurchase,
    setPurchasePurchase,
    observationPurchase,
    setObservationPurchase,
    paymentPurchase,
    setPaymentPurchase,
    trocoPurchase,
    setTrocoPurchase,
    totalPurchase,
    setTotalPurchase,
    handleEditPurchase,
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
    const total = purchaseRequests.reduce(
      (acc: number, purchaseRequest: any) => {
        if (purchaseRequest.status === 'finish') { // Usa reduce para somar os valores 'total' de todos os itens com status 'finish'
          const itemTotal = parseFloat(purchaseRequest.total); // Converte para número
          if (!isNaN(itemTotal)) {
            return acc + itemTotal;
          }
        }
        return acc;
      },
      0
    );
    return total.toFixed(2); // Formata o total com 2 casas decimais
  };

  const handleIsEditPurchase = (purchaseRequest: any) => {
    if (isEditPurchase) {
      handleEditPurchase(purchaseRequest);
      setIsEditPurchase(false);
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
      setIsEditPurchase(true);
    }
  };

  const getStatusClassName = (purchaseRequestStatus: string) => {
    switch (purchaseRequestStatus) {
      case 'new':
        return 'border-orange';
      case 'accepted':
        return 'border-yellow';
      case 'finish':
        return 'border-green';
      case 'canceled':
        return 'border-gray';
      default:
        return;
    }
  };

  function formatPurchaseString(purchaseString: string) {
    const lines = purchaseString.split('-------');
    return lines.map((line, index) => <div key={index} className="purchase-request-p">{line}</div>);
  }

  return (
    <div className="login-purchase-requests">
      <div className="login-purchase-requests-indice">
        <div className="login-purchase-requests-title">
          <span>Pedidos</span>
          <figure>
            <picture>
              <source src={dataCss.purchaseRequestsImage} type="image/png" />
              <img src={dataCss.purchaseRequestsImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
        <div className="login-purchase-requests-select">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Hoje">Hoje</option>
            <option value="Período">Período</option>
            <option value="Todos">Todos</option>
          </select>
        </div>
        <div className="login-purchase-requests-date">
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
              <div>
                <span className="purchase-requests-item-order">
                  # 000{purchaseRequest.order}
                </span>
                <div className="purchase-requests-item-status">
                  <span
                    className={`${getStatusClassName(purchaseRequest.status)}`}
                  >
                    {purchaseRequest.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="purchase-requests-item-name">
                  {purchaseRequest.name}
                </span>
              </div>
              <div>
                <span className="purchase-requests-item-price">
                  R$ {parseFloat(purchaseRequest.total.toString()).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="purchase-requests-total">
          <span>Total</span>
          <span>R$ {calculateTotal(filteredPurchaseRequests)}</span>
        </div>
      </div>
      <div className="purchase-request">
        {selectedPurchaseRequest !== '' ? (
          <div className="purchase-request-container">
            <div>
              <div className="purchase-request-print-edit">
                <button onClick={handlePrint} disabled={isEditPurchase}>
                  <figure>
                    <picture>
                      <source src={dataCss.printIconImage} type="image/png" />
                      <img src={dataCss.printIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
              <div className="purchase-request-print-edit">
                <button onClick={() => handleIsEditPurchase(purchaseRequest)}>
                  {isEditPurchase ? (
                    <figure>
                      <picture>
                        <source src={dataCss.saveIconImage} type="image/png" />
                        <img src={dataCss.saveIconImage} alt="icon-img" />
                      </picture>
                    </figure>
                  ) : (
                    <figure>
                      <picture>
                        <source src={dataCss.editIconImage} type="image/png" />
                        <img src={dataCss.editIconImage} alt="icon-img" />
                      </picture>
                    </figure>
                  )}
                </button>
              </div>
            </div>
            <div
              className="purchase-request-selected"
              key={purchaseRequest?.id}
              ref={printRef}
            >
              <div className="purchase-request-p-span">
                <div>
                  <p>
                    Status: <h4 className={`${getStatusClassName(purchaseRequest.status)}`}>{`${purchaseRequest?.status}`}</h4>
                  </p>
                </div>
                <div>
                  <p>
                    Data / Hora:{' '}
                    <span>
                      {purchaseRequest?.date} {purchaseRequest?.time}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    ID: <span>000{purchaseRequest?.order}</span>
                  </p>
                </div>
              </div>
              <div className="purchase-request-p-span">
                <div>
                  <p>
                    Cliente:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Cliente"
                        value={namePurchase}
                        onChange={(event) =>
                          setNamePurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.name}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Celular:{' '}
                    {isEditPurchase ? (
                      <input
                        type="number"
                        placeholder="Celular"
                        value={cellphonePurchase}
                        onChange={(event) => {
                          const formattedInput = event.target.value.replace(
                            /[^0-9]/g,
                            ''
                          );
                          if (formattedInput.length <= 11) {
                            setCellphonePurchase(formattedInput);
                          }
                        }}
                      />
                    ) : (
                      <span>{purchaseRequest?.cellphone}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Cep:{' '}
                    {isEditPurchase ? (
                      <input
                        type="number"
                        placeholder="Cep"
                        value={cepPurchase}
                        onChange={(event) => {
                          const formattedInput = event.target.value.replace(
                            /[^0-9]/g,
                            ''
                          );
                          if (formattedInput.length <= 8) {
                            setCepPurchase(formattedInput);
                          }
                        }}
                      />
                    ) : (
                      <span>{purchaseRequest?.cep}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Rua / Av.:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Rua / Av.:"
                        value={roadPurchase}
                        onChange={(event) =>
                          setRoadPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.road}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Nº:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Número"
                        value={numberPurchase}
                        onChange={(event) =>
                          setNumberPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.number}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Complemento:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Complemento"
                        value={complementPurchase}
                        onChange={(event) =>
                          setComplementPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.complement}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Bairro:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={districtPurchase}
                        onChange={(event) =>
                          setDistrictPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.district}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="purchase-request-p-span">
                <div>
                  <p>
                    Pedido:{' '}
                    {isEditPurchase ? (
                      <textarea
                        rows={5}
                        placeholder="Pedido"
                        value={purchasePurchase}
                        onChange={(event) =>
                          setPurchasePurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{formatPurchaseString(purchaseRequest?.purchase)}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Obs.:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Observação"
                        value={observationPurchase}
                        onChange={(event) =>
                          setObservationPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.observation}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="purchase-request-p-span">
                <div>
                  <p>
                    Pagamento:{' '}
                    {isEditPurchase ? (
                      <input
                        type="text"
                        placeholder="Pagamento"
                        value={paymentPurchase}
                        onChange={(event) =>
                          setPaymentPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.payment}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Troco:{' '}
                    {isEditPurchase ? (
                      <input
                        type="number"
                        placeholder="Troco"
                        value={trocoPurchase}
                        onChange={(event) =>
                          setTrocoPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>{purchaseRequest?.troco}</span>
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Total:{' '}
                    {isEditPurchase ? (
                      <input
                        type="number"
                        placeholder="Total"
                        value={totalPurchase}
                        onChange={(event) =>
                          setTotalPurchase(event.target.value)
                        }
                      />
                    ) : (
                      <span>
                        R$ {parseFloat(purchaseRequest?.total.toString()).toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="purchase-request-buttons">
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
                disabled={
                  purchaseRequest?.status === 'canceled' || isEditPurchase
                }
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePurchase(purchaseRequest)}
                disabled={
                  purchaseRequest?.status !== 'canceled' || isEditPurchase
                }
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
