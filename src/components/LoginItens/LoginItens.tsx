'use client';

import React from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
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

  const toggleActiveItem = async (item: any) => {
    try {
      const itemRef = firestore.collection('items').doc(item.id); // Substitua 'seu_nome_de_colecao' pelo nome real da sua coleção Firestore
      const novoValorAtivo = !item.active; // Alterna a propriedade 'active'
      await itemRef.update({ active: novoValorAtivo }); // Atualiza o Firestore
    } catch (error) {
      console.error('Erro ao atualizar o status ativo no Firestore:', error);
    }
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
                      height="100px"
                      width="100px"
                      alt={item.title}
                    />
                  </picture>
                </figure>
                <div>
                  <button onClick={() => toggleActiveItem(item)}>
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
                <span>{item.title}</span>
                <span>{item.description}</span>
                <span>R$ {item.price}</span>
              </div>
              <div>
                <button onClick={() => handleIsEditItem(item)}>Editar</button>
                <button onClick={() => handleDeleteItem(item.id)}>
                  Excluir
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
