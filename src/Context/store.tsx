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
  dataCss: Record<string, any>;
 
}

const GlobalContext = createContext<ContextProps>({
  dataCss: {},
 
});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const dataCss = {
    profileName: "Relvis Delivery",
    logoImage: [
      './img/logo.png',
      './img/logo.webp',
    ],
    cartImage: './img/cart.png',
    backImage: '/img/back.png',
    searchImage:'/img/search.png',
    logoutImage: '/img/logout.png',
    storeImage: '/img/store.png',
    loginImage: '/img/login.png',
    clientsImage: '/img/clients.png',
    clientImage: '/img/client.png',
    categoryImage: '/img/category.png',
    categoryItemImage: '/img/category-item.png',
    itemsImage: '/img/items.png',
    itemImage: '/img/item.png',
    purchaseRequestsImage: 'img/purchase-requests.png',
    addIconImage:'img/add-icon.png',
    editIconImage:'img/edit-icon.png',
    deleteIconImage:'img/delete-icon.png',
    printIconImage:'img/print.png',
    saveIconImage:'img/save.png',
    moneyImage: 'img/money.png',
    iconAbout: {
      local: '/img/local.png',
      payment: '/img/payment.png',
      contact: '/img/contact.png',
      operation: '/img/operation.png',
      whats: '/img/whatsapp-icon.png',
    },
    whatsImage: '/img/whatsapp.png',
    colorPrimary: '#bd482d',
    colorSecundary: '#f0f0f0',
    colorThird: '#f0f0f0',
    colorFourth: '#f0dcd3',
    backgroundColorCard: '#f5f5f5',
    backgroundColorHeader: 'linear-gradient(to bottom, #bd482d 0%, #bd482d 15vh, transparent 50%, transparent 100%)',
    fontColor: '#262626',
    summaryFont: '#f0f0f0',
    buttonColor: '#f0f0f0',
    activeButtonColor: '#1c554a',
    disabledButtonColor: '#bfbfbf',
  };

  return (
    <GlobalContext.Provider
      value={{
        dataCss,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
