'use client'

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
    addComplements,
    handleEditComplements,
    isContentComplementsOpen,
    setIsContentComplementsOpen,
  } = useGlobalContext();

  const toggleContentComplements = () => {
    setComplements('');
    setIsContentComplementsOpen(!isContentComplementsOpen);
    setIsEditComplements(false);
  };

  const handleSubmitComplements = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditComplements) {
      handleEditComplements(complementsId);
    } else {
      addComplements();
    }
  };

  return (
    <div className="add-complements-form-container">
      <button onClick={toggleContentComplements}>
        <div className="add-complements-form-title">
          <span>{isContentComplementsOpen ? '-' : '+'}</span>
          <h2>{isEditComplements ? 'Editar' : 'Adicionar'}</h2>
          <figure>
            <picture>
              <source src={dataCss.complementsImage} type="image/png" />
              <img src={dataCss.complementsImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentComplementsOpen && (
        <form onSubmit={handleSubmitComplements} className='add-complements-form'>
          <input
            type="text"
            placeholder={isEditComplements ? 'editar complemento' : 'novo complemento'}
            value={complements}
            onChange={(event) => setComplements(event.target.value)}
            required
          />
          <button type="submit">
            <span>{isEditComplements ? 'Editar' : 'Adicionar'}</span>
            <figure>
              <picture>
                <source
                  src={ isEditComplements ? dataCss.editIconImage : dataCss.addIconImage }
                  type="image/png"
                />
                <img
                  src={ isEditComplements ? dataCss.editIconImage : dataCss.addIconImage }
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

export default AddComplementsForm;
