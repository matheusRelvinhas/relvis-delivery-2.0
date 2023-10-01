import React from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import { useGlobalContext } from '@/Context/store';
import './LoginItens.css';

const LoginItens: React.FC = () => {
  const {
    dataCss,
    items,
    handleDeleteItem,
    setItemId,
    setIsEditItem,
    setTitle,
    setDescription,
    setPrice,
    setLastImage,
    setSelectedCategory,
    setImageFile,
    handleMoveItemUp,
    handleMoveItemDown,
    setIsContentItemOpen,
    toggleActiveItem,
  } = useGlobalContext();

  const handleIsEditItem = (item: any) => {
    setItemId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
    setSelectedCategory(item.category);
    setLastImage(item.image);
    setImageFile(null);
    setIsEditItem(true);
    setIsContentItemOpen(true);
  };

  return (
    <div className="login-items-container">
      <div className="login-items-title">
        <span>Produtos</span>
        <figure>
          <picture>
            <source src={dataCss.itemsImage} type="image/png" />
            <img src={dataCss.itemsImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <AddItemForm />
      <div className="login-items-list">
        {items?.map((item) => (
          <div key={item.id} className="login-items">
            <div className="login-items-div-title">
              <span>{item.category}</span>
              <figure>
                <picture>
                  <source src={dataCss.itemImage} type="image/png" />
                  <img src={dataCss.itemImage} alt="icon-img" />
                </picture>
              </figure>
            </div>
            <div className="login-items-div">
              <div className="login-items-img-toogle">
                <figure>
                  <picture>
                    <source src={item.image} type="image/webp" />
                    <source src={item.image} type="image/png" />
                    <source src={item.image} type="image/jpeg" />
                    <img
                      src={item.image}
                      alt='img-item'
                    />
                  </picture>
                </figure>
                <div>
                  <button onClick={() => toggleActiveItem(item.id, item.active)}>
                    <div className="toggle-switch">
                      <input
                        className="toggle-input"
                        id="toggle"
                        type="checkbox"
                        checked={item.active}
                      />
                      <label className="toggle-label"></label>
                    </div>
                  </button>
                  <div>
                    <span>{item.active ? 'Ligado' : 'Desligado'}</span>
                  </div>
                  <div className="login-items-move">
                    <button
                      onClick={() => handleMoveItemUp(item.id, item.order)}
                    >
                      <span>◀</span>
                    </button>
                    <button
                      onClick={() => handleMoveItemDown(item.id, item.order)}
                    >
                      <span>▶</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="login-items-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="login-items-buttons-price">
                <button onClick={() => handleIsEditItem(item)}>
                  <figure>
                    <picture>
                      <source src={dataCss.editIconImage} type="image/png" />
                      <img src={dataCss.editIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
                <span>R$ {item.price.toFixed(2)}</span>
                <button onClick={() => handleDeleteItem(item.id)}>
                  <figure>
                    <picture>
                      <source src={dataCss.deleteIconImage} type="image/png" />
                      <img src={dataCss.deleteIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginItens;
