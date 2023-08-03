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
  isOpen: boolean;
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
  isOpen: false,
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
  };
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
      title: 'Card 1',
      description: 'Description for Card 1',
      price: 10,
      image: '/path/to/card1.jpg',
      category: 'Bebidas Alcólicas',
    },
    {
      title: 'Card 2',
      description: 'Description for Card 2',
      price: 20,
      image: '/path/to/card2.jpg',
      category: 'Bebidas Alcólicas',
    },
    {
      title: 'Card 3',
      description: 'Description for Card 3',
      price: 30,
      image: '/path/to/card3.jpg',
      category: 'Bebidas Alcólicas',
    },
  ];
  const drinkNoAlcoolCards: Card[] = [
    {
      title: 'Card 4',
      description: 'Description for Card 4',
      price: 10,
      image: '/path/to/card4.jpg',
      category: 'Bebidas não Alcólicas',
    },
    {
      title: 'Card 5',
      description: 'Description for Card 5',
      price: 20,
      image: '/path/to/card5.jpg',
      category: 'Bebidas não Alcólicas',
    },
    {
      title: 'Card 6',
      description: 'Description for Card 6',
      price: 30,
      image: '/path/to/card6.jpg',
      category: 'Bebidas não Alcólicas',
    },
  ];
  const portionsCards: Card[] = [
    {
      title: 'Card 7',
      description: 'Description for Card 7',
      price: 10,
      image: '/path/to/card7.jpg',
      category: 'Porções',
    },
    {
      title: 'Card 8',
      description: 'Description for Card 8',
      price: 20,
      image: '/path/to/card8.jpg',
      category: 'Porções',
    },
    {
      title: 'Card 9',
      description: 'Description for Card 9',
      price: 30,
      image: '/path/to/card9.jpg',
      category: 'Porções',
    },
  ];

  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  return (
    <GlobalContext.Provider
      value={{
        dataCss,
        isOpen,
        isTilted,
        handleCheckboxChange,
        handleCartClick,
        drinkCards,
        drinkNoAlcoolCards,
        portionsCards,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
