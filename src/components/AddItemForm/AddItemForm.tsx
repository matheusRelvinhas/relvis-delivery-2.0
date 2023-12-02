'use client';

import React, { useRef, useState } from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddItemForm.css';

const AddItemForm: React.FC = () => {
  const {
    dataCss,
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    setImageFile,
    categories,
    addItem,
    isEditItem,
    setIsEditItem,
    itemId,
    handleEditItem,
    isContentItemOpen,
    setIsContentItemOpen,
    toggleActiveComplementItem,
    setToggleActiveComplementItem,
    selectedComplement,
    setSelectedComplement,
    complementsList,
    toggleActiveTimeItem,
    setToggleActiveTimeItem,
    startTimeItem,
    setStartTimeItem,
    endTimeItem,
    setEndTimeItem,
    toggleActiveDaysItem,
    setToggleActiveDaysItem,
    toggleActiveSundayItem, //domingo
    setToggleActiveSundayItem,
    toggleActiveMondayItem, //segunda
    setToggleActiveMondayItem,
    toggleActiveTuesdayItem, //terça
    setToggleActiveTuesdayItem,
    toggleActiveWednesdayItem, //quarta
    setToggleActiveWednesdayItem,
    toggleActiveThursdayItem, //quinta
    setToggleActiveThursdayItem,
    toggleActiveFridayItem, //sexta
    setToggleActiveFridayItem,
    toggleActiveSaturdayItem, //sábado
    setToggleActiveSaturdayItem,
  } = useGlobalContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleContentItem = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setSelectedCategory('');
    setImageFile(null);
    setSelectedComplement('');
    setToggleActiveComplementItem(false);
    setToggleActiveTimeItem(false);
    setStartTimeItem('');
    setEndTimeItem('');
    setIsContentItemOpen(!isContentItemOpen);
    setIsEditItem(false);
    setToggleActiveSundayItem(true);
    setToggleActiveMondayItem(true);
    setToggleActiveTuesdayItem(true);
    setToggleActiveWednesdayItem(true);
    setToggleActiveThursdayItem(true);
    setToggleActiveFridayItem(true);
    setToggleActiveSaturdayItem(true);
  };

  const handleSubmitItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditItem) {
      handleEditItem(itemId);
    } else {
      addItem(event);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Redefina o valor do input file para null
    }
  };

  const handlePriceItemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (input !== '') {
      input = (parseFloat(input) / 100).toFixed(2);
    }
    setPrice(input);
  };

  return (
    <div className="add-item-form-container">
      <button onClick={toggleContentItem} type="button">
        <div className="add-item-form-title">
          <span>{isContentItemOpen ? '-' : '+'}</span>
          <h2>{isEditItem ? 'Editar' : 'Adicionar'}</h2>
          <figure>
            <picture>
              <source src={dataCss.itemsImage} type="image/png" />
              <img src={dataCss.itemsImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentItemOpen && (
        <form onSubmit={handleSubmitItem} className="add-items-form">
          <input
            type="text"
            placeholder="título"
            maxLength={40}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="descrição"
            maxLength={100}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <input
            type="number"
            placeholder="preço"
            value={price}
            onChange={handlePriceItemChange}
            required
          />
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            required
          >
            <option value="" disabled>
              selecione uma categoria
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setImageFile(file);
              }
            }}
            ref={fileInputRef}
          />
          <div className="add-item-form-complements">
            <button
              type="button"
              onClick={() => {
                setToggleActiveComplementItem(!toggleActiveComplementItem);
                setSelectedComplement('');
              }}
            >
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  id="toggle"
                  type="checkbox"
                  checked={toggleActiveComplementItem}
                />
                <label className="toggle-label"></label>
              </div>
            </button>
            <select
              className="add-item-form-complements-select"
              value={selectedComplement}
              onChange={(event) => setSelectedComplement(event.target.value)}
              disabled={!toggleActiveComplementItem}
            >
              <option value="">
                {toggleActiveComplementItem
                  ? 'sem complemento'
                  : 'selecione um complemento'}
              </option>
              {complementsList.map((complement) => (
                <option key={complement.id} value={complement.complement}>
                  {complement.complement}
                </option>
              ))}
            </select>
          </div>
          <div className="add-item-form-time">
            <button
              type="button"
              onClick={() => {
                setToggleActiveTimeItem(!toggleActiveTimeItem);
                setStartTimeItem('');
                setEndTimeItem('');
              }}
            >
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  id="toggle"
                  type="checkbox"
                  checked={toggleActiveTimeItem}
                />
                <label className="toggle-label"></label>
              </div>
            </button>
            <input
              type="time"
              value={startTimeItem}
              onChange={(e) => setStartTimeItem(e.target.value)}
              disabled={!toggleActiveTimeItem}
              required={toggleActiveTimeItem}
            />
            <span>até:</span>
            <input
              type="time"
              value={endTimeItem}
              onChange={(e) => {
                // Validar se o endTime é maior que o startTime
                if (startTimeItem && e.target.value <= startTimeItem) {
                  // Se for menor ou igual ao startTime, defina o endTime como vazio
                  setEndTimeItem('');
                } else {
                  // Se for maior que o startTime, atualize o endTime
                  setEndTimeItem(e.target.value);
                }
              }}
              disabled={startTimeItem === ''}
              required={toggleActiveTimeItem}
              min={startTimeItem}
            />
          </div>
          <div className="add-item-form-days">
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveSundayItem(!toggleActiveSundayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveSundayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Dom</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveMondayItem(!toggleActiveMondayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveMondayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Seg</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveTuesdayItem(!toggleActiveTuesdayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveTuesdayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Ter</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveWednesdayItem(!toggleActiveWednesdayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveWednesdayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Qua</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveThursdayItem(!toggleActiveThursdayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveThursdayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Qui</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveFridayItem(!toggleActiveFridayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveFridayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Sex</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setToggleActiveSaturdayItem(!toggleActiveSaturdayItem);
                }}
              >
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id="toggle"
                    type="checkbox"
                    checked={toggleActiveSaturdayItem}
                  />
                  <label className="toggle-label"></label>
                </div>
              </button>
              <span>Sáb</span>
            </div>
          </div>
          <button className="add-items-form-button" type="submit">
            <span>{isEditItem ? 'Editar' : 'Adicionar'}</span>
            <figure>
              <picture>
                <source
                  src={
                    isEditItem ? dataCss.editIconImage : dataCss.addIconImage
                  }
                  type="image/png"
                />
                <img
                  src={
                    isEditItem ? dataCss.editIconImage : dataCss.addIconImage
                  }
                  alt="icon-img"
                />
              </picture>
            </figure>
          </button>
        </form>
      )}
    </div>
  );
};

export default AddItemForm;
