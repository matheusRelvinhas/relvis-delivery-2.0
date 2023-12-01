'use client';

import React, { useState } from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginComplements.css';
import AddComplementsForm from '../AddComplementsForm/AddComplementsForm';

const LoginComplements: React.FC = () => {
  const {
    dataCss,
    complementsList,
    setIsEditComplements,
    setComplements,
    setComplementsId,
    setComplementsOrder,
    setLastComplements,
    setIsContentComplementsOpen,
    handleDeleteComplements,
    handleDeleteItemComplements,
    setIsAddEditComplementsItem,
    setIsEditComplementsItem,
    handleMoveComplementsUp,
    handleMoveComplementsDown,
    handleMoveComplementsItemUp,
    handleMoveComplementsItemDown,
    setComplementTitle,
    setComplementPrice,
  } = useGlobalContext();

  const handleIsEditComplements = (
    complementsId: string,
    complement: string
  ) => {
    setIsContentComplementsOpen(true);
    setLastComplements(complement);
    setComplements(complement);
    setComplementsId(complementsId);
    setIsEditComplements(true);
  };

  const handleIsAddComplementsItem = (complementsId: string) => {
    setIsContentComplementsOpen(true);
    setComplementsId(complementsId);
    setIsAddEditComplementsItem(true);
  };

  const handleIsEditComplementsItem = (
    complementsId: string,
    itemOrder: number,
    complementsTitle: string,
    complementsPrice: number
  ) => {
    setIsContentComplementsOpen(true);
    setComplementsId(complementsId);
    setComplementsOrder(itemOrder);
    setComplementTitle(complementsTitle);
    setComplementPrice(complementsPrice.toString());
    setIsAddEditComplementsItem(true);
    setIsEditComplementsItem(true);
  };

  return (
    <div className="login-complements-container">
      <div className="login-complements-title">
        <span>Complementos</span>
        <figure>
          <picture>
            <source src={dataCss.complementsImage} type="image/png" />
            <img src={dataCss.complementsImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <AddComplementsForm />
      <div className="login-complements-list">
        {complementsList.map((complement) => (
          <div key={complement.id} className="login-complements-items">
            <div className="login-complements-items-title">
              <span>{complement.complement}</span>
              <div>
                <button
                  onClick={() =>
                    handleMoveComplementsUp(complement.id, complement.order)
                  }
                >
                  <figure>
                    <picture>
                      <source src={dataCss.arrowImage.up} type="image/png" />
                      <img src={dataCss.arrowImage.up} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
                <button
                  onClick={() =>
                    handleMoveComplementsDown(complement.id, complement.order)
                  }
                >
                  <figure>
                    <picture>
                      <source src={dataCss.arrowImage.down} type="image/png" />
                      <img src={dataCss.arrowImage.down} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleIsEditComplements(
                      complement.id,
                      complement.complement
                    )
                  }
                >
                  <figure>
                    <picture>
                      <source src={dataCss.editIconImage} type="image/png" />
                      <img src={dataCss.editIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteComplements(complement.id, complement.complement)}
                >
                  <figure>
                    <picture>
                      <source src={dataCss.deleteIconImage} type="image/png" />
                      <img src={dataCss.deleteIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
            </div>
            {complement.complements && (
              <ul className="login-complements-ul">
                {complement.complements.map((complementItem) => (
                  <li key={complement.id + complementItem.order}>
                    <div className="login-complements-li">
                      <div className="login-complements-title-price">
                        <span>-</span>
                        <span className="login-complements-title-name">{complementItem.title}</span>
                        <span className="login-complements-price">R$ {complementItem.price.toFixed(2)}</span>
                      </div>
                      <div className='login-complements-button-up-down'>
                        <button
                          type='button'
                          onClick={() =>
                            handleMoveComplementsItemUp(
                              complement.id,
                              complementItem.order
                            )
                          }
                        >
                          ↑
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            handleMoveComplementsItemDown(
                              complement.id,
                              complementItem.order
                            )
                          }
                        >
                          ↓
                        </button>
                      </div>
                      <div className='login-complements-button-edit-remove'>
                        <button
                          type="button"
                          onClick={() =>
                            handleIsEditComplementsItem(
                              complement.id,
                              complementItem.order,
                              complementItem.title,
                              complementItem.price
                            )
                          }
                        >
                          <span>Editar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteItemComplements(
                              complement.id,
                              complementItem.order
                            )
                          }
                        >
                          <span>Excluir</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className='login-complements-add-button'>
              <button
                type="button"
                onClick={() => handleIsAddComplementsItem(complement.id)}
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginComplements;
