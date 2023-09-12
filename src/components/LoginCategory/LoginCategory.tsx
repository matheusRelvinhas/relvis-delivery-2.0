'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';

const LoginCategory: React.FC = () => {
  const {
    categories,
    handleDeleteCategory,
    setIsEditCategory,
    setCategory,
    setCategoryId,
    setLastCategory
  } = useGlobalContext();

  const handleIsEditCategory = (categoryId: string, category: string) => {
    setLastCategory(category);
    setCategory(category);
    setCategoryId(categoryId);
    setIsEditCategory(true);
  };

  const handleMoveCategoryUp = async (categoryId: string, order: number) => {
    // Verifique se a categoria pode ser movida para cima
    if (order > 1) {
      const batch = firestore.batch();
      const categoryRef = firestore.collection('categories').doc(categoryId);
      const previousCategorySnapshot = await firestore
        .collection('categories')
        .where('order', '==', order - 1)
        .limit(1)
        .get();
      if (!previousCategorySnapshot.empty) {
        // Encontrou uma categoria com a ordem anterior, portanto, pode atualizar a ordem
        const previousCategoryId = previousCategorySnapshot.docs[0].id;
        const previousCategoryRef = firestore.collection('categories').doc(previousCategoryId);
        // Atualize a ordem da categoria selecionada
        batch.update(categoryRef, { order: order - 1 });
        // Atualize a ordem da categoria anterior
        batch.update(previousCategoryRef, { order: order });
        // Execute a transação
        await batch.commit();
      }
    }
  };
  
  const handleMoveCategoryDown = async (categoryId: string, order: number) => {
    const batch = firestore.batch();
    const categoryRef = firestore.collection('categories').doc(categoryId);
    const nextCategorySnapshot = await firestore
      .collection('categories')
      .where('order', '==', order + 1)
      .limit(1)
      .get();
    if (!nextCategorySnapshot.empty) {
      // Encontrou uma categoria com a ordem seguinte, portanto, pode atualizar a ordem
      const nextCategoryId = nextCategorySnapshot.docs[0].id;
      const nextCategoryRef = firestore.collection('categories').doc(nextCategoryId);
      // Atualize a ordem da categoria selecionada
      batch.update(categoryRef, { order: order + 1 });
      // Atualize a ordem da categoria seguinte
      batch.update(nextCategoryRef, { order: order });
      // Execute a transação
      await batch.commit();
    }
  };

  return (
    <div>
      <AddCategoryForm />
      <h2>Categorias</h2>
      {categories.map((category) => (
        <div key={category.id}>
          {category.category}
          <button onClick={() => handleIsEditCategory(category.id, category.category)}>Editar</button>
          <button onClick={() => handleDeleteCategory(category.id, category.category)}>Excluir</button>
          <button onClick={() => handleMoveCategoryUp(category.id, category.order)}>Subir</button>
          <button onClick={() => handleMoveCategoryDown(category.id, category.order)}>Descer</button>
        </div>
      ))}
    </div>
  );
};

export default LoginCategory;
