'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddComplementsForm.css';

const AddComplementsForm: React.FC = () => {
  const {
    dataCss,
    complements,
    setComplements,
    isEditComplements,
    setIsEditComplements,
    complementsId,
    complementsOrder,
    addComplements,
    handleEditComplements,
    isContentComplementsOpen,
    setIsContentComplementsOpen,
    isAddEditComplementsItem,
    setIsAddEditComplementsItem,
    addComplementItem,
    complementTitle,
    setComplementTitle,
    complementPrice,
    setComplementPrice,
    isEditComplementsItem,
    setIsEditComplementsItem,
    handleEditComplementsItem,
  } = useGlobalContext();

  const toggleContentComplements = () => {
    setComplements('');
    setComplementTitle('');
    setComplementPrice('');
    setIsContentComplementsOpen(!isContentComplementsOpen);
    setIsEditComplements(false);
    setIsAddEditComplementsItem(false);
  };

  const handleSubmitComplements = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditComplements) {
      handleEditComplements(complementsId, complements);
    } else {
      addComplements(complements);
    }
  };

  const handleSubmitComplementsItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditComplementsItem) {
      handleEditComplementsItem(complementsId, complementsOrder, complementTitle, complementPrice);
      setIsContentComplementsOpen(false);
      setIsEditComplements(false);
      setIsAddEditComplementsItem(false);
    } else {
      addComplementItem(complementsId, complementTitle, complementPrice);
      setIsContentComplementsOpen(false);
      setIsAddEditComplementsItem(false);
    }
  };

  const handlePriceComplementItemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (input !== '') {
      input = (parseFloat(input) / 100).toFixed(2);
    }
    setComplementPrice(input);
  };

  return (
    <div className="add-complements-form-container">
      <button onClick={toggleContentComplements}>
        <div className="add-complements-form-title">
          <span>{isContentComplementsOpen ? '-' : '+'}</span>
          <h2>
            {isEditComplements || isEditComplementsItem
              ? 'Editar'
              : 'Adicionar'}
          </h2>
          <figure>
            <picture>
              <source src={dataCss.complementsImage} type="image/png" />
              <img src={dataCss.complementsImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentComplementsOpen && (
        <>
          {isAddEditComplementsItem ? (
            <form
              onSubmit={handleSubmitComplementsItem}
              className="add-complements-form"
            >
              <input
                type="text"
                placeholder={
                  isEditComplementsItem
                    ? 'editar item do complemento'
                    : 'novo item do complemento'
                }
                value={complementTitle}
                onChange={(event) => setComplementTitle(event.target.value)}
                maxLength={20}
                required
              />
              <input
                type="number"
                placeholder={'preço'}
                value={complementPrice}
                onChange={handlePriceComplementItemChange}
                required
              />
              <button type="submit">
                <span>{isEditComplementsItem ? 'Editar' : 'Adicionar'}</span>
                <figure>
                  <picture>
                    <source
                      src={
                        isEditComplementsItem
                          ? dataCss.editIconImage
                          : dataCss.addIconImage
                      }
                      type="image/png"
                    />
                    <img
                      src={
                        isEditComplementsItem
                          ? dataCss.editIconImage
                          : dataCss.addIconImage
                      }
                      alt="icon-img"
                    />
                  </picture>
                </figure>
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitComplements}
              className="add-complements-form"
            >
              <input
                type="text"
                placeholder={
                  isEditComplements ? 'editar complemento' : 'novo complemento'
                }
                value={complements}
                onChange={(event) => setComplements(event.target.value)}
                maxLength={20}
                required
              />
              <button type="submit">
                <span>{isEditComplements ? 'Editar' : 'Adicionar'}</span>
                <figure>
                  <picture>
                    <source
                      src={
                        isEditComplements
                          ? dataCss.editIconImage
                          : dataCss.addIconImage
                      }
                      type="image/png"
                    />
                    <img
                      src={
                        isEditComplements
                          ? dataCss.editIconImage
                          : dataCss.addIconImage
                      }
                      alt="icon-img"
                    />
                  </picture>
                </figure>
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default AddComplementsForm;
