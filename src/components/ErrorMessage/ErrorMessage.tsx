'use client';

import React from 'react';
import './ErrorMessage.css';
import { useGlobalContext } from '@/Context/store';

interface ErrorMessage {
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ errorMessage }) => {
  const {
    dataCss,
  } = useGlobalContext();
  

  return (
    <div className='error-message'>
      <span>
        {errorMessage}
      </span>
    </div>
  );
};

export default ErrorMessage;
