'use client';

import React, { createContext, useContext, useState, ReactNode, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'; 
import { firestore, storage, auth } from '@/assets/firebase';

type PurchaseRequest = {
  id: string;
  name: string;
  cellphone: number;
  cep: number;
  road: string;
  number: string;
  complement: string;
  district: string;
  purchase: string;
  total: number;
  order: number;
  payment: string;
  troco: number;
  date: string;
  time: string;
  status: string;
  observation: string;
};

type Card = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
  order: number;
};

type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category:string;
  active: boolean;
  order: number;
};

type Client = {
  id: string;
  name: string;
  cellphone: string;
  cep: string;
  road: string;
  number: string;
  complement:string;
  district: string;
};

interface ItemData {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
  order: number;
}

interface PurchaseRequestData {
  id: string;
  name: string;
  cellphone: number;
  cep: number;
  road: string;
  number: string;
  complement: string;
  district: string;
  purchase: string;
  total: number;
  order: number;
  payment: string;
  troco: number;
  date: string;
  time: string;
  status: string;
  observation: string;
}

interface ClientData {
  name: string;
  cellphone: string;
  cep: string;
  road: string;
  number: string;
  complement:string;
  district: string;
}

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface ContextProps {

}

const GlobalContext = createContext<ContextProps>({

});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {

  return (
    <GlobalContext.Provider
      value={{

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
