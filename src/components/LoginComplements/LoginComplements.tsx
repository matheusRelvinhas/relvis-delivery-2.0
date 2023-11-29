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
    setLastComplements,
    setIsContentComplementsOpen,
    handleMoveCategoryUp,
    handleMoveCategoryDown,
    handleDeleteComplements,
    handleDeleteItemComplements,
    setIsAddComplementsItem,
    handleMoveComplementsUp,
    handleMoveComplementsDown,
    handleMoveComplementsItemUp,
    handleMoveComplementsItemDown,
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
    setIsAddComplementsItem(true);
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
            <div>
              <span>{complement.complement}</span>
              <button
                type="button"
                onClick={() =>
                  handleIsEditComplements(complement.id, complement.complement)
                }
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteComplements(complement.id)}
              >
                Remover
              </button>
              <button
                onClick={() =>
                  handleMoveComplementsUp(complement.id, complement.order)
                }
              >
                UP
              </button>
              <button
                onClick={() =>
                  handleMoveComplementsDown(complement.id, complement.order)
                }
              >
                DOWN
              </button>
            </div>
            {complement.complements && (
              <ul>
                {complement.complements.map((complementItem) => (
                  <li key={complement.id}>
                    <div>
                      <span>{complementItem.title}</span>
                      <span>R$ {complementItem.price}</span>
                      <button
                        onClick={() =>
                          handleMoveComplementsItemUp(
                            complement.id,
                            complementItem.order
                          )
                        }
                      >
                        UP
                      </button>
                      <button
                        onClick={() =>
                          handleMoveComplementsItemDown(
                            complement.id,
                            complementItem.order
                          )
                        }
                      >
                        DOWN
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
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div>
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
