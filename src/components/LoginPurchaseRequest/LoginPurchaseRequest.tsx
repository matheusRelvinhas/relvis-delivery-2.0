'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const LoginPurchaseRequest: React.FC = () => {
  const { dataCss, purchaseRequests } = useGlobalContext();
  

  return (
    <div>
      <h2>Pedidos</h2>
      {purchaseRequests?.map((purchaseRequest) => (
        <div key={purchaseRequest.id}>
          <p>ID: 000{purchaseRequest.order}</p>
          <p>Cliente: {purchaseRequest.name}</p>
          R$ {purchaseRequest.total.toFixed(2)}
          {purchaseRequest.status}
        </div>
      ))}
    </div>
  );
};

export default LoginPurchaseRequest;
