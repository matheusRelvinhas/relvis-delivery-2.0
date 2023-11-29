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
      <button onClick={toggleContentItem}>
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
          <div className="add-item-form-time">
            <button
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
            />
            <input
              type="time"
              value={endTimeItem}
              onChange={(e) => setEndTimeItem(e.target.value)}
              disabled={startTimeItem == ''}
            />
          </div>
          <div className="add-item-form-complements">
            <button
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
