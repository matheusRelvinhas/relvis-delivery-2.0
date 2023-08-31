'use client';

import React, { createContext, useContext, useState, ReactNode, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { database, firestore, storage, auth } from '@/firebase';


type Card = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Item = {
  chave: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

interface ItemData {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string; // Adicione o campo de categoria
}

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
  cep: string;
  address: Address | null; // Adicione essa linha à interface
  cepError: string; // Adicione essa linha à interface
  handleCepChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  road: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  setRoad: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  setComplement: React.Dispatch<React.SetStateAction<string>>;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  isBuy: boolean;
  setIsBuy: React.Dispatch<React.SetStateAction<boolean>>;
  messageItens: string;
  name: string;
  paymentMethod: string;
  troco: string;
  handleFinalizeOrder: () => void;
  handleFinalize: (event: React.FormEvent<HTMLFormElement>) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  setTroco: React.Dispatch<React.SetStateAction<string>>;
  cellphone: string;
  setCellphone: React.Dispatch<React.SetStateAction<string>>;
  categories: { id: string; category: string }[];
  handleDeleteCategory: (categoryId: string) => void;
  category: string;
  setCategory:React.Dispatch<React.SetStateAction<string>>;
  addCategory: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string; 
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  optionCategories: string[];
  save: (event: React.FormEvent) => Promise<void>;
  handleAddItem: (card: Card) => void;
  handleRemoveItem: (card: Card) => void;
  handleQuantityChange: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => void;
  getItemQuantity: (card: Card) => number;
  cartTotal: number;
  allCards: Card[]; // Adicione essa linha à interface
  totalItems: number; // Adicione essa linha à interface
  handleRemoveAllItems: (title: string) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  items: Item[] | undefined;
  isFormValid: boolean;
}

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
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
  cep: '',           // Adicione essa linha para incluir a propriedade cep
  address: null,     // Adicione essa linha para incluir a propriedade address
  cepError: '',      // Adicione essa linha para incluir a propriedade cepError
  handleCepChange: () => {}, // Adicione essa linha para incluir a propriedade handleCepChange
  road: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  setRoad: () => {},
  setNumber: () => {},
  setComplement: () => {},
  setDistrict: () => {},
  setCity: () => {},
  setState: () => {},
  isBuy: false,
  setIsBuy: () => {},
  messageItens: '',
  name: '',
  paymentMethod: '',
  troco: '',
  handleFinalizeOrder: () => {},
  handleFinalize: () => {},
  setName: () => {},
  setPaymentMethod: () => {},
  setTroco: () => {},
  cellphone: '',
  setCellphone: () => {},
  categories: [],
  handleDeleteCategory: () => {},
  category: '',
  setCategory: () => {},
  addCategory: () => {},
  title: '',
  setTitle: () => {},
  price: '',
  setPrice: () => {},
  description: '',
  setDescription: () => {},
  selectedCategory: '',
  setSelectedCategory: () => {},
  imageFile: null,
  setImageFile: () => {},
  optionCategories: [],
  save: async (event: React.FormEvent) => {},
  handleAddItem: (card: Card) => {},
  handleRemoveItem: (card: Card) => {},
  handleQuantityChange: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => {},
  getItemQuantity: (card: Card) => 0,
  cartTotal: 0,
  allCards: [], // Adicione essa linha à interface
  totalItems: 0, // Adicione essa linha à interface
  handleRemoveAllItems: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  items: [],
  isFormValid: false,
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
    backImage: '/img/back.png',
    colorPrimary: '#226154',
    colorSecundary: '#e74c3c',
    colorThird: '#ebc49d',
    backgroundColorCard: '#f5f5f5',
    backgroundColorHeader: 'linear-gradient(to bottom, #226154 0%, #226154 15vh, transparent 50%, transparent 100%)',
    fontColor: '#141414',
    summaryFont: '#ecddcd',
    buttonColor: '#fafafa',
    activeButtonColor: '#c0392b',
    colorInput: '#1c554a',
    colorBorder: '#14463c',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [cepError, setCepError] = useState('');
  const [road, setRoad] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isBuy, setIsBuy] = useState(false);
  const [messageItens, setMessageItens] = useState('');
  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [troco, setTroco] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleCheckboxChange = () => {
    setIsOpen(!isOpen);
    setIsTilted(false)
  };
  const handleCartClick = () => {
    setIsTilted(!isTilted);
    setIsOpen(false)
    setIsBuy(false)
  };

  const handleAddItem = (card: Card) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [card.title]: (prevItems[card.title] || 0) + 1,
    }));
  };

  const handleRemoveItem = (card: Card) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[card.title] > 0) {
        updatedItems[card.title] -= 1;
      }
      return updatedItems;
    });
  };

  const handleQuantityChange = (card: Card, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity)) return;

    setCartItems((prevItems) => ({
      ...prevItems,
      [card.title]: newQuantity,
    }));
  };

  const getItemQuantity = (card: Card) => {
    return cartItems[card.title] || 0;
  };
  
  const fetchAddress = async (inputCep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${inputCep}/json/`);
      setAddress(response.data);
      setCepError('');
      if (response.data.logradouro) {
        setRoad(response.data.logradouro);
        setDistrict(response.data.bairro);
        setCity(response.data.localidade)
        setState(response.data.uf)
      }
    } catch (err) {
      setAddress(null);
      setCepError('CEP não encontrado.');
    }
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value.replace(/\D/g, ''); // Remove qualquer caracter que não seja número
    if (newCep.length <= 8) {
      setCep(newCep);
      if (newCep.length === 8) {
        fetchAddress(newCep);
      } else {
        setAddress(null);
        setCepError('');
      }
    }
  };

  const handleFinalizeOrder = () => {
    const cartSummaryElement = document.querySelector(
      '.cart-summary'
    ) as HTMLInputElement | null;
    const cartSummaryText = cartSummaryElement?.innerText || '';
    const messageItems = cartSummaryText.replace(/X/g, '-------');
    setMessageItens(messageItems);
    setIsBuy(true);
  };

  const handleFinalize = async (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('cellphone', cellphone);
    localStorage.setItem('cep', cep);
    localStorage.setItem('road', road);
    localStorage.setItem('number', number);
    localStorage.setItem('complement', complement);
    localStorage.setItem('district', district);
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);

    const clientRef = database.ref('clients');
    const query = clientRef.orderByChild('cellphone').equalTo(cellphone);

    try {
      const snapshot = await query.once('value');
      if (!snapshot.exists()) {
        const data = {
          name,
          cellphone,
          cep,
          road,
          number,
          complement,
          district,
          city,
          state,
        };
        clientRef.push(data);
      } else {
        console.log('Cliente já existe na lista');
      }
    } catch (error) {
      console.error('Erro ao consultar banco de dados:', error);
    }
    let message = `Pedido Novo!!\nCliente: ${name}\nTelefone: ${cellphone}\nCEP: ${cep}\nEndereço: ${road}\nNº: ${number}    Compl.: ${complement}\nBairro: ${district}\nCidade: ${city}    Estado: ${state}\n\n${messageItens}\nForma de Pagamento: ${paymentMethod}\n`;
    if (trocoMessage == Math.abs(cartTotal - parseFloat(troco))) {
      message += `Troco: R$${trocoMessage.toFixed(2)}`;
    }
    setTroco('')
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5531971451910&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, '_blank');
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

  const allCards = [...drinkCards, ...drinkNoAlcoolCards, ...portionsCards];

  const cartTotal = Object.entries(cartItems).reduce(
    (total, [title, quantity]) => {
      const card = allCards.find((card) => card.title === title);
      if (card && quantity > 0) {
        total += card.price * quantity;
      }
      return total;
    },
    0
  );

  const trocoMessage = Math.abs(cartTotal - parseFloat(troco));

  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const handleRemoveAllItems = (title: string) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [title]: 0,
    }));
  };

  useEffect(() => {
    const isValid =
      name !== '' &&
      cellphone !== '' &&
      road !== '' &&
      number !== '' &&
      district !== '' &&
      paymentMethod !== '' &&
      (paymentMethod !== 'dinheiro' || troco !== '');

    setIsFormValid(isValid);
  }, [name, cellphone, road, number, district, city, state, paymentMethod, troco]);

  useEffect(() => {
    const storedName = localStorage.getItem('name') || '';
    const storedCellphone = localStorage.getItem('cellphone') || '';
    const storedCep = localStorage.getItem('cep') || '';
    const storedRoad = localStorage.getItem('road') || '';
    const storedNumber = localStorage.getItem('number') || '';
    const storedComplement = localStorage.getItem('complement') || '';
    const storedDistrict = localStorage.getItem('district') || '';
    const storedCity = localStorage.getItem('city') || '';
    const storedState = localStorage.getItem('state') || '';
  
    setName(storedName);
    setCellphone(storedCellphone);
    setCep(storedCep);
    setRoad(storedRoad);
    setNumber(storedNumber);
    setComplement(storedComplement);
    setDistrict(storedDistrict);
    setCity(storedCity);
    setState(storedState);
  }, []);

  //LOGIN PAGE
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState<{ id: string; category: string }[]>([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [optionCategories, setOptionCategories] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItens] = useState<Item[]>();
  
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login successful');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logout successful');
      setIsLogin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addCategory = async () => {
    if (category.trim() !== '') {
      try {
        const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção
        await collectionRef.add({ category });
        setCategory('');
        console.log('Categoria salva com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar categoria:', error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção
      await collectionRef.doc(categoryId).delete();
      console.log('Categoria excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  async function save(event: React.FormEvent) {
    event.preventDefault();

    const collectionRef = firestore.collection('items'); // Substitua 'items' pelo nome correto da coleção

    const data: ItemData = {
      title,
      description,
      price: parseFloat(price),
      image: '',
      category: selectedCategory, // Adicione a categoria selecionada
    };

    try {
      if (imageFile) {
        // Faz upload da imagem para o Storage
        const storageRef = storage.ref();
        const imageRef = storageRef.child(imageFile.name);
        await imageRef.put(imageFile);

        // Obtém a URL de download da imagem
        const imageUrl = await imageRef.getDownloadURL();
        data.image = imageUrl;
      }

      // Salva o objeto no Firestore
      await collectionRef.add(data);

      setTitle('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setSelectedCategory(''); // Limpa a categoria selecionada
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  useEffect(() => {
    const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção

    // Cria o listener para mudanças na coleção
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const categoriesData: { id: string; category: string }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
      }));
      setCategories(categoriesData);
    });

    return () => {
      // Remove o listener quando o componente é desmontado
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    // Verifica se o usuário já está autenticado ao carregar a página
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => {
      // Remove o listener quando o componente é desmontado
      unsubscribe();
    };
  }, [setIsLogin]); // Executa somente uma vez ao carregar o componente
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção
        const snapshot = await collectionRef.get();
        const categoriesData = snapshot.docs.map((doc) => doc.data().category);
        setOptionCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('items');

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const resultItens: Item[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          chave: doc.id,
          title: data.title,
          description: data.description,
          price: data.price,
          image: data.image,
        };
      });
      setItens(resultItens);
    });

    return () => {
      unsubscribe();
    };
  }, []);
   
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
        cep,
        address,
        cepError,
        handleCepChange,
        road,
        number,
        complement,
        district,
        city,
        state,
        setRoad,
        setNumber,
        setComplement,
        setDistrict,
        setCity,
        setState,
        isBuy,
        setIsBuy,
        messageItens,
        handleFinalizeOrder,
        handleFinalize,
        setName,
        paymentMethod,
        setPaymentMethod,
        troco,
        setTroco,
        name,
        cellphone,
        setCellphone,
        categories,
        handleDeleteCategory,
        category,
        setCategory,
        addCategory,
        title,
        setTitle, 
        price, 
        setPrice, 
        description, 
        setDescription,
        selectedCategory, 
        setSelectedCategory,
        imageFile,
        setImageFile,
        optionCategories,
        save,
        handleAddItem,
        handleRemoveItem,
        handleQuantityChange,
        getItemQuantity,
        cartTotal,
        allCards,
        totalItems,
        handleRemoveAllItems,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleLogout,
        items,
        isFormValid,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
