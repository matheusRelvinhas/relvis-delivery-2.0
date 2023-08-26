'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Card = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

interface ContextProps {
  dataCss: Record<string, any>;
  isLogin: boolean;
  isOpen: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isTilted: boolean;
  handleCheckboxChange: () => void;
  handleCartClick: () => void;
  drinkCards: Card[];
  drinkNoAlcoolCards: Card[];
  portionsCards: Card[];
  cartItems: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const GlobalContext = createContext<ContextProps>({
  dataCss: {},
  isLogin: false,
  isOpen: false,
  setIsLogin: () => {},
  isTilted: false,
  handleCheckboxChange: () => {},
  handleCartClick: () => {},
  drinkCards: [],
  drinkNoAlcoolCards: [],
  portionsCards: [],
  cartItems: {},
  setCartItems: () => {},
});

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const dataCss = {
    logoImage: [
      './img/logo.png',
      './img/logo.webp',
      'https://i.postimg.cc/gkryRqsX/easy-ia-logo.png',
      'https://i.postimg.cc/pVsYp1fM/easy-ia-logo.webp',
    ],
    cartImage: './img/cart.png',
    colorPrimary: '#226154',
    colorSecundary: '#e74c3c',
    colorThird: '#ebc49d',
    backgroundColorCard: '#f5f5f5',
    backgroundColorHeader: 'linear-gradient(to bottom, #226154 0%, #226154 15vh, transparent 50%, transparent 100%)',
    fontColor: '#141414',
    summaryFont: '#ecddcd',
    buttonColor: '#fafafa',
    activeButtonColor: '#c0392b'
  };

  const[isLogin, setIsLogin] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  
  const handleCheckboxChange = () => {
    setIsOpen(!isOpen);
    setIsTilted(false)
  };
  const handleCartClick = () => {
    setIsTilted(!isTilted);
    setIsOpen(false)
  };

  const drinkCards: Card[] = [
    {
      title: 'Cerveja Brahma',
      description: 'Cerveja Brahma lata 473ml',
      price: 8,
      image: './img/cerveja-brahma.png',
      category: 'Bebidas Alcólicas',
    },
    {
      title: 'Cerveja Heineken',
      description: 'Cerveja Heineken lata 473ml',
      price: 10,
      image: './img/cerveja-heineken.png',
      category: 'Bebidas Alcólicas',
    },
    {
      title: 'Cerveja Skol',
      description: 'Cerveja Skol lata 473ml',
      price: 6,
      image: './img/cerveja-skol.png',
      category: 'Bebidas Alcólicas',
    },
  ];
  const drinkNoAlcoolCards: Card[] = [
    {
      title: 'Refrigerante Coca',
      description: 'Refrigerante Coca-cola lata 350ml',
      price: 6,
      image: './img/refrigerante-coca.png',
      category: 'Bebidas não Alcólicas',
    },
    {
      title: 'Refrigerante Pepsi',
      description: 'Refrigerante Pepsi lata 350ml',
      price: 5,
      image: './img/refrigerante-pepsi.png',
      category: 'Bebidas não Alcólicas',
    },
    {
      title: 'Refrigerante Kuat',
      description: 'Refrigerante Kuat lata 350ml',
      price: 5,
      image: './img/refrigerante-kuat.png',
      category: 'Bebidas não Alcólicas',
    },
  ];
  const portionsCards: Card[] = [
    {
      title: 'Porção Boi',
      description: 'Porção 500g carne de boi',
      price: 40,
      image: './img/porcao-boi.png',
      category: 'Porções',
    },
    {
      title: 'Porção Porco',
      description: 'Porção 500g carne de porco',
      price: 30,
      image: './img/porcao-porco.png',
      category: 'Porções',
    },
    {
      title: 'Porção Frango',
      description: 'Porção 500g carne de frango',
      price: 30,
      image: './img/porcao-frango.png',
      category: 'Porções',
    },
  ];

  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  return (
    <GlobalContext.Provider
      value={{
        dataCss,
        isLogin,
        isOpen,
        isTilted,
        handleCheckboxChange,
        handleCartClick,
        drinkCards,
        drinkNoAlcoolCards,
        portionsCards,
        cartItems,
        setCartItems,
        setIsLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
