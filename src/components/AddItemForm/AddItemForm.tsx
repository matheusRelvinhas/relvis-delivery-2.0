import React, { useRef } from 'react';
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
  } = useGlobalContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleContentItem = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setSelectedCategory('');
    setImageFile(null);
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
    if (fileInputRef.current) { // Redefina o valor do input file para null 
      fileInputRef.current.value = '';
    }
  };

  const handlePriceItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <button type="submit">
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
