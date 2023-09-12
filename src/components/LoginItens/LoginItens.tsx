'use client';

import React from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import { useGlobalContext } from '@/Context/store';
import { firestore} from '@/firebase';

const LoginItens: React.FC = () => {
  const { items, handleDeleteItem, setItemId, setIsEditItem, setTitle, setDescription, setPrice, setLastImage, setSelectedCategory } = useGlobalContext();
  
  const handleIsEditItem = (item:any) => {
    setItemId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setPrice(item.price)
    setSelectedCategory(item.category)
    setLastImage(item.image)
    setIsEditItem(true)
  }

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
    <div>
      <AddItemForm />
      <h2>Produtos</h2>
      {items?.map((item) => (
        <div key={item.id}>
          <figure className='logo-container'>
            <picture>
              <source src={item.image} type="image/webp" />
              <source src={item.image} type="image/png" />
              <source src={item.image} type="image/jpeg" />
              <img src={item.image} height='100px' width='100px' alt={item.title} />
            </picture>
          </figure>
          <h3>Titulo: {item.title}</h3>
          <p>Descrição: {item.description}</p>
          <p>Preço: {item.price}</p>
          <p>Categoria: {item.category}</p>
          <p>Ativo: {item.active ? 'Sim' : 'Não'}</p>
          <button onClick={() => handleIsEditItem(item)}>Editar</button>
          <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
          <button onClick={() => toggleActiveItem(item)}>
            {item.active ? 'Desligar' : 'Ligar'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoginItens;
