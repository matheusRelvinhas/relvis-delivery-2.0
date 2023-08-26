  "use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/Context/store';
import AddItemForm from '@/components/AddItemForm/AddItemForm';

  const PartnerPage: React.FC = () => {
    const { isLogin } = useGlobalContext();
    
    const router = useRouter();
    
    if (!isLogin) {
      router.push('/login');
      return null; // Retornar nulo para interromper a renderização atual
    }
    
    return (
      <div>
        <h1>Portal Parceiro</h1>
          <AddItemForm/>
      </div>
    );
  };

  export default PartnerPage;
