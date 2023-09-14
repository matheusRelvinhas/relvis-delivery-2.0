'use client';

import React from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import { useGlobalContext } from '@/Context/store';
import { firestore} from '@/firebase';
import StyledInput from '../StyledInput/StyledInput';

const LoginItens: React.FC = () => {
  const { items, handleDeleteItem, setItemId, setIsEditItem, setTitle, setDescription, setPrice, setLastImage, setSelectedCategory, setImageFile } = useGlobalContext();
  
  const handleIsEditItem = (item:any) => {
    setItemId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setPrice(item.price)
    setSelectedCategory(item.category)
    setLastImage(item.image)
    setImageFile(null)
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

    const handleMoveItemUp = async (itemId: string, order: number) => {
      // Verifique se a categoria pode ser movida para cima
      if (order > 1) {
        const batch = firestore.batch();
        const itemRef = firestore.collection('items').doc(itemId);
        const previousItemSnapshot = await firestore
          .collection('items')
          .where('order', '==', order - 1)
          .limit(1)
          .get();
        if (!previousItemSnapshot.empty) {
          // Encontrou uma categoria com a ordem anterior, portanto, pode atualizar a ordem
          const previousItemId = previousItemSnapshot.docs[0].id;
          const previousItemRef = firestore.collection('items').doc(previousItemId);
          // Atualize a ordem da categoria selecionada
          batch.update(itemRef, { order: order - 1 });
          // Atualize a ordem da categoria anterior
          batch.update(previousItemRef, { order: order });
          // Execute a transação
          await batch.commit();
        }
      }
    };
    
    const handleMoveItemDown = async (itemId: string, order: number) => {
      const batch = firestore.batch();
      const itemRef = firestore.collection('items').doc(itemId);
      const nextItemSnapshot = await firestore
        .collection('items')
        .where('order', '==', order + 1)
        .limit(1)
        .get();
      if (!nextItemSnapshot.empty) {
        // Encontrou uma categoria com a ordem seguinte, portanto, pode atualizar a ordem
        const nextItemId = nextItemSnapshot.docs[0].id;
        const nextItemRef = firestore.collection('items').doc(nextItemId);
        // Atualize a ordem da categoria selecionada
        batch.update(itemRef, { order: order + 1 });
        // Atualize a ordem da categoria seguinte
        batch.update(nextItemRef, { order: order });
        // Execute a transação
        await batch.commit();
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
          <button onClick={() => handleMoveItemUp(item.id, item.order)}>Subir</button>
          <button onClick={() => handleMoveItemDown(item.id, item.order)}>Descer</button>
        </div>
      ))}
    </div>
  );
};

export default LoginItens;
