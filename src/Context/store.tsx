'use client';

import React, { createContext, useContext, useState, ReactNode, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { parse, format, addHours, isValid } from 'date-fns';
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
  isLogin: boolean;
  isOpen: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isTilted: boolean;
  handleCheckboxChange: () => void;
  handleCartClick: () => void;
  cartItems: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>
  cep: string;
  address: Address | null; // Adicione essa linha à interface
  handleCepChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  road: string;
  number: string;
  complement: string;
  district: string;
  setRoad: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  setComplement: React.Dispatch<React.SetStateAction<string>>;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
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
  categories: { id: string; category: string; order: number }[];
  handleEditOpenStore: (openStore: boolean) => void;
  handleEditMessage: (message: string) => void;
  handleDeleteCategory: (categoryId: string, category: string) => void;
  handleMoveCategoryUp: (categoryId: string, order: number) => void;
  handleMoveCategoryDown: (categoryId: string, order: number) => void;
  handleEditCategory: (categoryId: string, category: string) => void;
  handleDeleteItem: (categoryId: string) => void;
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
  imageFile: any;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  addItem: (event: React.FormEvent) => Promise<void>;
  handleAddItem: (card: Card) => void;
  handleRemoveItem: (card: Card) => void;
  handleMoveItemUp: (itemId: string, order: number) => void;
  handleMoveItemDown: (itemId: string, order: number) => void;
  toggleActiveItem:(itemId: string, itemActive: boolean) => void;
  handleQuantityChange: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => void;
  getItemQuantity: (card: Card) => number;
  cartTotal: number;
  totalItems: number; // Adicione essa linha à interface
  handleRemoveAllItems: (title: string) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  items: Item[] | undefined;
  purchaseRequests: PurchaseRequest[] | undefined;
  filteredPurchaseRequests: PurchaseRequest[] | undefined;
  isFormValid: boolean;
  alertLogin: boolean;
  isEditCategory: boolean;
  setIsEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  lastCategory: string;
  setLastCategory: React.Dispatch<React.SetStateAction<string>>;
  itemId: string;
  setItemId: React.Dispatch<React.SetStateAction<string>>;
  isEditItem: boolean;
  setIsEditItem: React.Dispatch<React.SetStateAction<boolean>>;
  lastImage: string;
  setLastImage: React.Dispatch<React.SetStateAction<string>>;
  handleEditItem: (ItemId: string) => void;
  searchResults: Item[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<Item[] | undefined>>;
  clients: Client[] | undefined;
  nameClient: string;
  setNameClient: React.Dispatch<React.SetStateAction<string>>;
  cellphoneClient: string; 
  setCellphoneClient: React.Dispatch<React.SetStateAction<string>>;
  cepClient: string;
  setCepClient: React.Dispatch<React.SetStateAction<string>>;
  roadClient: string;
  setRoadClient: React.Dispatch<React.SetStateAction<string>>;
  numberClient: string;
  setNumberClient: React.Dispatch<React.SetStateAction<string>>;
  complementClient: string;
  setComplementClient: React.Dispatch<React.SetStateAction<string>>;
  districtClient: string;
  setDistrictClient: React.Dispatch<React.SetStateAction<string>>;
  isEditClient: boolean;
  setIsEditClient: React.Dispatch<React.SetStateAction<boolean>>;
  addClient: (event: React.FormEvent) => Promise<void>;
  clientId: string;
  setClientId: React.Dispatch<React.SetStateAction<string>>;
  handleEditClient: (clientId: string) => void;
  handleDeleteClient: (clientId: string) => void;
  observation: string;
  setObservation: React.Dispatch<React.SetStateAction<string>>;
  handlePurchaseRequestClick: (purchaseRequest: PurchaseRequest) => void;
  selectedPurchaseRequest: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleAcepptPurchase: (purchaseRequest: PurchaseRequestData) => void;
  handleFinishPurchase: (purchaseRequest: PurchaseRequestData) => void;
  handleCanceledPurchase: (purchaseRequest: PurchaseRequestData) => void;
  handleDeletePurchase: (purchaseRequest: PurchaseRequestData) => void;
  handleEditPurchase: (purchaseRequest: PurchaseRequestData) => void;
  isEditPurchase: boolean;
  setIsEditPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isEditMessage: boolean; 
  setIsEditMessage: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenStore: boolean;
  setIsOpenStore: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isContentClientOpen: boolean;
  setIsContentClientOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContentCategoryOpen: boolean;
  setIsContentCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContentItemOpen: boolean,
  setIsContentItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
  namePurchase: string;
  setNamePurchase: React.Dispatch<React.SetStateAction<string>>;
  cellphonePurchase: string;
  setCellphonePurchase: React.Dispatch<React.SetStateAction<string>>;
  cepPurchase: string;
  setCepPurchase: React.Dispatch<React.SetStateAction<string>>;
  roadPurchase: string;
  setRoadPurchase: React.Dispatch<React.SetStateAction<string>>;
  numberPurchase: string;
  setNumberPurchase: React.Dispatch<React.SetStateAction<string>>;
  complementPurchase: string;
  setComplementPurchase: React.Dispatch<React.SetStateAction<string>>;
  districtPurchase: string;
  setDistrictPurchase: React.Dispatch<React.SetStateAction<string>>;
  purchasePurchase: string;
  setPurchasePurchase: React.Dispatch<React.SetStateAction<string>>;
  observationPurchase: string;
  setObservationPurchase: React.Dispatch<React.SetStateAction<string>>;
  paymentPurchase: string;
  setPaymentPurchase: React.Dispatch<React.SetStateAction<string>>;
  trocoPurchase: string;
  setTrocoPurchase: React.Dispatch<React.SetStateAction<string>>;
  totalPurchase: string;
  setTotalPurchase: React.Dispatch<React.SetStateAction<string>>;
  isContentMessageOpen: boolean;
  setIsContentMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQueryLogin: string;
  setSearchQueryLogin: React.Dispatch<React.SetStateAction<string>>;
  searchResultsLogin: Item[] | undefined;
}

const GlobalContext = createContext<ContextProps>({
  dataCss: {},
  isLogin: false,
  isOpen: false,
  setIsLogin: () => {},
  isTilted: false,
  handleCheckboxChange: () => {},
  handleCartClick: () => {},
  cartItems: {},
  setCartItems: () => {},
  cep: '',           // Adicione essa linha para incluir a propriedade cep
  address: null,     // Adicione essa linha para incluir a propriedade address
  handleCepChange: () => {}, // Adicione essa linha para incluir a propriedade handleCepChange
  road: '',
  number: '',
  complement: '',
  district: '',
  setRoad: () => {},
  setNumber: () => {},
  setComplement: () => {},
  setDistrict: () => {},
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
  handleEditOpenStore: () => {},
  handleEditMessage: () => {},
  handleDeleteCategory: () => {},
  handleEditCategory: () => {},
  handleMoveCategoryUp: () => {},
  handleMoveCategoryDown: () => {},
  toggleActiveItem:() => {},
  handleDeleteItem: () => {},
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
  addItem: async (event: React.FormEvent) => {},
  handleAddItem: (card: Card) => {},
  handleMoveItemUp: () => {},
  handleMoveItemDown: () => {},
  handleRemoveItem: (card: Card) => {},
  handleQuantityChange: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => {},
  getItemQuantity: (card: Card) => 0,
  cartTotal: 0,
  totalItems: 0, // Adicione essa linha à interface
  handleRemoveAllItems: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  items: [],
  purchaseRequests: [],
  filteredPurchaseRequests: [],
  isFormValid: false,
  alertLogin: false,
  isEditCategory: false,
  setIsEditCategory: () => {},
  categoryId: '',
  setCategoryId: () => {},
  lastCategory: '',
  setLastCategory: () => {},
  itemId: '',
  setItemId: () => {},
  isEditItem: false,
  setIsEditItem: () => {},
  lastImage: '',
  setLastImage: () => {},
  handleEditItem: () => {},
  searchResults: [],
  setSearchResults: () => {},
  clients: [],
  nameClient: '', 
  setNameClient: () => {},
  cellphoneClient: '', 
  setCellphoneClient: () => {},
  cepClient: '', 
  setCepClient: () => {},
  roadClient: '', 
  setRoadClient: () => {},
  numberClient: '', 
  setNumberClient: () => {},
  complementClient: '', 
  setComplementClient: () => {},
  districtClient: '', 
  setDistrictClient: () => {},
  isEditClient: false,
  setIsEditClient: () => {},
  addClient: async (event: React.FormEvent) => {},
  clientId: '',
  setClientId: () => {},
  handleEditClient: () => {},
  handleDeleteClient: () => {},
  observation: '',
  setObservation: () => {},
  handlePurchaseRequestClick: () => {},
  selectedPurchaseRequest: '',
  selectedOption: 'Hoje',
  setSelectedOption: () => {},
  startDate: '',
  setStartDate: () => {},
  endDate: '',
  setEndDate: () => {},
  handleAcepptPurchase: () => {},
  handleFinishPurchase: () => {},
  handleCanceledPurchase: () => {},
  handleDeletePurchase: () => {},
  handleEditPurchase: () => {},
  isEditPurchase: false,
  setIsEditPurchase: () => {},
  message: '',
  setMessage: () => {},
  isEditMessage: false,
  setIsEditMessage: () => {},
  isOpenStore: true,
  setIsOpenStore: () => {},
  isLoading: true,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  isContentClientOpen: false,
  setIsContentClientOpen: () => {},
  isContentCategoryOpen: false,
  setIsContentCategoryOpen: () => {},
  isContentItemOpen: false,
  setIsContentItemOpen: () => {},
  namePurchase: '',
  setNamePurchase: () => {},
  cellphonePurchase: '',
  setCellphonePurchase: () => {},
  cepPurchase: '',
  setCepPurchase: () => {},
  roadPurchase: '',
  setRoadPurchase: () => {},
  numberPurchase: '',
  setNumberPurchase: () => {},
  complementPurchase: '',
  setComplementPurchase: () => {},
  districtPurchase: '',
  setDistrictPurchase: () => {},
  purchasePurchase: '',
  setPurchasePurchase: () => {},
  observationPurchase: '',
  setObservationPurchase: () => {},
  paymentPurchase: '',
  setPaymentPurchase: () => {},
  trocoPurchase: '',
  setTrocoPurchase: () => {},
  totalPurchase: '',
  setTotalPurchase: () => {},
  isContentMessageOpen: false,
  setIsContentMessageOpen: () => {},
  activeItem: 'Perfil',
  setActiveItem: () => {},
  isNavOpen: false,
  setIsNavOpen: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  searchQueryLogin: '',
  setSearchQueryLogin: () => {},
  searchResultsLogin: [],
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
    arrowImage: {
      up: 'img/arrow-up.png',
      right: 'img/arrow-right.png',
      down: 'img/arrow-down.png',
      left: 'img/arrow-left.png',
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

  //LOGIN PAGE
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState<{ id: string; category: string; order:number }[]>([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItens] = useState<Item[]>();
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>();
  const [filteredPurchaseRequests, setFilteredPurchaseRequests] = useState<PurchaseRequest[]>();
  const [alertLogin, setAlertLogin] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [lastCategory, setLastCategory] = useState('');
  const [itemId, setItemId] = useState('');
  const [isEditItem, setIsEditItem] = useState(false);
  const [lastImage, setLastImage] = useState('');
  const [clients, setClients] = useState<Client[]>();
  const [nameClient, setNameClient] = useState('');
  const [cellphoneClient, setCellphoneClient] = useState('');
  const [cepClient, setCepClient] = useState('');
  const [roadClient, setRoadClient] = useState('');
  const [numberClient, setNumberClient] = useState('');
  const [complementClient, setComplementClient] = useState('');
  const [districtClient, setDistrictClient] = useState('');
  const [isEditClient, setIsEditClient] = useState(false);
  const [clientId, setClientId] = useState('');
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState('');
  const [selectedOption, setSelectedOption] = useState('Hoje');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isEditPurchase, setIsEditPurchase] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [isOpenStore, setIsOpenStore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isContentClientOpen, setIsContentClientOpen] = useState(false);
  const [isContentCategoryOpen, setIsContentCategoryOpen] = useState(false);
  const [isContentItemOpen, setIsContentItemOpen] = useState(false);
  const [namePurchase, setNamePurchase] = useState('');
  const [cellphonePurchase, setCellphonePurchase] = useState('');
  const [cepPurchase, setCepPurchase] = useState('');
  const [roadPurchase, setRoadPurchase] = useState('');
  const [numberPurchase, setNumberPurchase] = useState('');
  const [complementPurchase, setComplementPurchase] = useState('');
  const [districtPurchase, setDistrictPurchase] = useState('');
  const [purchasePurchase, setPurchasePurchase] = useState('');
  const [observationPurchase, setObservationPurchase] = useState('');
  const [paymentPurchase, setPaymentPurchase] = useState('');
  const [trocoPurchase, setTrocoPurchase] = useState('');
  const [totalPurchase, setTotalPurchase] = useState('');
  const [isContentMessageOpen, setIsContentMessageOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('Perfil');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [searchQueryLogin, setSearchQueryLogin] = useState('');
  const [searchResultsLogin, setSearchResultsLogin] = useState<Item[] | undefined>(items);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setEmail('');
      setPassword('');
      setAlertLogin(true)
      setErrorMessage('Email ou senha incorretos')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      console.log('Logout successful');
      setIsLogin(false);
    } catch (error) {
      console.error('Logout error:', error);
      setErrorMessage('Error ao deslogar')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleEditOpenStore = async (openStore: boolean) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('openStore');
    const openStoreRef = collectionRef.doc('openStoreID');
    const isOpen = !openStore;
    try {
      const updatedOpenStoreData = {
        openStore: isOpen,
      };
      await openStoreRef.update(updatedOpenStoreData);
    } catch (error) {
      console.error('Erro ao editar status da loja:', error);
    }
    setIsLoading(false);
  };

  const handleEditMessage = async (message: string) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('message');
    const messageRef = collectionRef.doc('messageID');
    try {
      const updatedMessageData = {
        message: message,
      };
      await messageRef.update(updatedMessageData);
    } catch (error) {
      console.error('Erro ao editar mensagem:', error);
    }
    setIsLoading(false);
  };

  const addCategory = async () => {
    setIsLoading(true);
    if (category.trim() !== '') {
      try {
        const collectionRef = firestore.collection('categories'); // Consulte todas as categorias para contar quantas existem
        const querySnapshot = await collectionRef.get();
        const totalCategories = querySnapshot.size;
        const order = totalCategories + 1; // Determine a ordem para a nova categoria
        const existingCategory = await collectionRef.where('category', '==', category.toLowerCase()).get(); // Verifique se a categoria já existe
        if (existingCategory.size === 0) { // A categoria ainda não existe, pode adicioná-la com a ordem calculada
          
          await collectionRef.add({ category, order });
          setCategory('');
          setIsContentCategoryOpen(false);
        } else { // A categoria já existe, defina o alertLogin como true por 3 segundos
          setErrorMessage('Categoria já cadastrada')
          setAlertLogin(true);
          setIsLoading(false);
          setTimeout(() => {
            setAlertLogin(false);
            setErrorMessage('')
          }, 3000);
        }
      } catch (error) {
        console.error('Erro ao adicioanar categoria:', error);
        setErrorMessage('Erro ao adicioanar categoria')
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('')
        }, 3000);
      }
    }
    setIsLoading(false);
  };

  const handleEditCategory = async (categoryId: string, lastCategory: string) => {
    setIsLoading(true);
    try {
      const collectionRef = firestore.collection('categories');
      const collectionItemRef = firestore.collection('items');
      const existingCategoryQuery = await collectionRef.where('category', '==', category.toLowerCase()).get();  // Verifique se a nova categoria já existe (independentemente de ser maiúscula ou minúscula)
      if (existingCategoryQuery.size > 0) {
        setErrorMessage('Categoria já cadastrada');
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('');
        }, 3000);
        return;
      }
      await collectionRef.doc(categoryId).update({
        category: category,
      });
      setIsContentCategoryOpen(false);
      const querySnapshot = await collectionItemRef.where('category', '==', lastCategory).get();
      const batch = firestore.batch();
      querySnapshot.forEach((doc) => {
        const itemRef = collectionItemRef.doc(doc.id);
        batch.update(itemRef, { category: category });
      });
      await batch.commit();
      setIsEditCategory(false);
      setLastCategory('');
      setCategory('');
      console.log('Categoria editada com sucesso e itens atualizados!');
    } catch (error) {
      console.error('Erro ao editar categoria: ', error);
      setErrorMessage('Erro ao editar categoria');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteCategory = async (categoryId: string, category: string) => {
    setIsLoading(true);
    try {
      const collectionRef = firestore.collection('categories');
      const collectionItemRef = firestore.collection('items');
      const categoryDoc = await collectionRef.doc(categoryId).get(); // Obtenha a ordem da categoria que será excluída
      const orderToDelete = categoryDoc.data()?.order;
      await collectionRef.doc(categoryId).delete(); // Exclua a categoria
      const querySnapshot = await collectionRef.where('order', '>', orderToDelete).get(); // Consulte todas as categorias com ordens maiores que a excluída
      querySnapshot.forEach(async (doc) => { // Atualize as ordens das categorias encontradas
        const docRef = collectionRef.doc(doc.id);
        const currentOrder = doc.data().order;
        await docRef.update({ order: currentOrder - 1 });
      });
      const itemQuerySnapshot = await collectionItemRef.where('category', '==', category).get(); // Consulte os itens com a mesma categoria e exclua-os
      itemQuerySnapshot.forEach(async (doc) => {
        await collectionItemRef.doc(doc.id).delete();
      });
    } catch (error) {
      console.error('Erro ao excluir categoria e itens associados:', error);
      setErrorMessage('Erro ao excluir categoria e itens associados');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleMoveCategoryUp = async (categoryId: string, order: number) => {
    setIsLoading(true);
    if (order > 1) { // Verifique se a categoria pode ser movida para cima
      const batch = firestore.batch();
      const categoryRef = firestore.collection('categories').doc(categoryId);
      const previousCategorySnapshot = await firestore
        .collection('categories')
        .where('order', '==', order - 1)
        .limit(1)
        .get();
      if (!previousCategorySnapshot.empty) { // Encontrou uma categoria com a ordem anterior, portanto, pode atualizar a ordem
        const previousCategoryId = previousCategorySnapshot.docs[0].id;
        const previousCategoryRef = firestore
          .collection('categories')
          .doc(previousCategoryId);
        batch.update(categoryRef, { order: order - 1 }); // Atualize a ordem da categoria selecionada
        batch.update(previousCategoryRef, { order: order }); // Atualize a ordem da categoria anterior
        await batch.commit(); // Execute a transação
      }
    }
    setIsLoading(false);
  };

  const handleMoveCategoryDown = async (categoryId: string, order: number) => {
    setIsLoading(true);
    const batch = firestore.batch();
    const categoryRef = firestore.collection('categories').doc(categoryId);
    const nextCategorySnapshot = await firestore
      .collection('categories')
      .where('order', '==', order + 1)
      .limit(1)
      .get();
    if (!nextCategorySnapshot.empty) { // Encontrou uma categoria com a ordem seguinte, portanto, pode atualizar a ordem
      const nextCategoryId = nextCategorySnapshot.docs[0].id;
      const nextCategoryRef = firestore
        .collection('categories')
        .doc(nextCategoryId);
      batch.update(categoryRef, { order: order + 1 }); // Atualize a ordem da categoria selecionada
      batch.update(nextCategoryRef, { order: order }); // Atualize a ordem da categoria seguinte
      await batch.commit(); // Execute a transação
    }
    setIsLoading(false);
  };

  async function addItem(event: React.FormEvent) {
    event?.preventDefault();
    setIsLoading(true);
    const collectionRef = firestore.collection('items');
    const querySnapshotOrder = await collectionRef.get(); // Consulte todas os itenss para contar quantos existem
    const totalItems = querySnapshotOrder.size;
    const order = totalItems + 1; // Determine a ordem para o novo item
    const data: ItemData = {
      title,
      description,
      price: parseFloat(price),
      image: '',
      category: selectedCategory,
      active: false,
      order,
    };
    try { // Verifica se já existe um item com o mesmo título
      const querySnapshot = await collectionRef.where('title', '==', title).get();
      if (!querySnapshot.empty) {      
        setErrorMessage('Item já cadastrado');
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('');
        }, 3000);
        return; // Não continue o processo de salvar
      }
      if (imageFile) { // Se não houver itens com o mesmo título, continue com o processo de salvar
        const storageRef = storage.ref(); // Faz upload da imagem para o Storage
        const imageRef = storageRef.child(imageFile.name);
        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL(); // Obtém a URL de download da imagem
        data.image = imageUrl;
      }
      await collectionRef.add(data); // Salva o objeto no Firestore
      setIsContentItemOpen(false);
      setTitle('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setSelectedCategory('');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      setErrorMessage('Erro ao adicionar item');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  }

  const handleEditItem = async (itemId: string) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('items');
    const itemRef = collectionRef.doc(itemId);
    try { // Verifica se já existe um item com o mesmo título
      const existingItem = await collectionRef.where('title', '==', title).get();
      if (!existingItem.empty && existingItem.docs[0].id !== itemId) {
        setErrorMessage('Item já cadastrado');
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('');
        }, 3000);
        return;
      }
      const updatedItemData = { // Define os dados atualizados do item
        title: title,
        description: description,
        price: parseFloat(price),
        category: selectedCategory,
        image: lastImage, // Adicione esta propriedade
      };
      if (imageFile) { // Faz upload da nova imagem para o Firebase Storage
        const storageRef = storage.ref();
        const imageRef = storageRef.child(itemId);
        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL(); // Obtém a URL de download da nova imagem
        updatedItemData.image = imageUrl;
      }
      await itemRef.update(updatedItemData); // Atualiza o documento do item no Firestore
      setTitle('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setSelectedCategory('');
      setLastImage('');
      setIsEditItem(false);
      setIsContentItemOpen(false);
    } catch (error) {
      console.error('Erro ao editar item:', error);
      setErrorMessage('Erro ao editar item');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  };

  const toggleActiveItem = async (itemId:string, itemActive:boolean) => {
    setIsLoading(true);
    try {
      const itemRef = firestore.collection('items').doc(itemId); // Substitua 'seu_nome_de_colecao' pelo nome real da sua coleção Firestore
      const newValueActive = !itemActive; // Alterna a propriedade 'active'
      await itemRef.update({ active: newValueActive }); // Atualiza o Firestore
    } catch (error) {
      console.error('Erro ao editar item:', error);
      setErrorMessage('Erro ao editar item');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteItem = async (itemId: string) => {
    setIsLoading(true);
    try {
      const collectionRef = firestore.collection('items');
      const itemDoc = await collectionRef.doc(itemId).get();
      const orderToDelete = itemDoc.data()?.order;
      await collectionRef.doc(itemId).delete();
      const querySnapshot = await collectionRef.where('order', '>', orderToDelete).get(); // Atualize as ordens dos itens encontradas
      querySnapshot.forEach(async (doc) => {
        const docRef = collectionRef.doc(doc.id);
        const currentOrder = doc.data().order;
        await docRef.update({ order: currentOrder - 1 });
      });
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      setErrorMessage('Erro ao excluir item');
      setAlertLogin(true);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('');
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleMoveItemUp = async (itemId: string, order: number) => {
    setIsLoading(true);
    if (order > 1) { // Verifique se a categoria pode ser movida para cima
      const batch = firestore.batch();
      const itemRef = firestore.collection('items').doc(itemId);
      const previousItemSnapshot = await firestore
        .collection('items')
        .where('order', '==', order - 1)
        .limit(1)
        .get();
      if (!previousItemSnapshot.empty) {
        const previousItemId = previousItemSnapshot.docs[0].id; // Encontrou uma categoria com a ordem anterior, portanto, pode atualizar a ordem
        const previousItemRef = firestore
          .collection('items')
          .doc(previousItemId);
        batch.update(itemRef, { order: order - 1 }); // Atualize a ordem da categoria selecionada
        batch.update(previousItemRef, { order: order }); // Atualize a ordem da categoria anterior
        await batch.commit(); // Execute a transação
      }
    }
    setIsLoading(false);
  };

  const handleMoveItemDown = async (itemId: string, order: number) => {
    setIsLoading(true);
    const batch = firestore.batch();
    const itemRef = firestore.collection('items').doc(itemId);
    const nextItemSnapshot = await firestore
      .collection('items')
      .where('order', '==', order + 1)
      .limit(1)
      .get();
    if (!nextItemSnapshot.empty) { // Encontrou uma categoria com a ordem seguinte, portanto, pode atualizar a ordem
      const nextItemId = nextItemSnapshot.docs[0].id;
      const nextItemRef = firestore.collection('items').doc(nextItemId); // Atualize a ordem da categoria selecionada
      batch.update(itemRef, { order: order + 1 }); // Atualize a ordem da categoria seguinte
      batch.update(nextItemRef, { order: order }); // Execute a transação
      await batch.commit();
    }
    setIsLoading(false);
  };
  
  async function addClient(event: React.FormEvent) {
    event?.preventDefault();
    setIsLoading(true);
    const collectionRef = firestore.collection('clients');
    const data: ClientData = {
      name: nameClient,
      cellphone: cellphoneClient,
      cep: cepClient,
      road: roadClient,
      number: numberClient,
      complement: complementClient,
      district: districtClient,
    };
    try { // Verifica se já existe um item com o mesmo celular
      const querySnapshot = await collectionRef.where('cellphone', '==', cellphoneClient).get();
      if (!querySnapshot.empty) {
        setErrorMessage('Celular já cadastrado')
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('')
        }, 3000);
        return; // Não continue o processo de salvar
      }
      await collectionRef.add(data); // Salva o objeto no Firestore
      setNameClient('');
      setCellphoneClient('');
      setCepClient('');
      setRoadClient('');
      setNumberClient('');
      setComplementClient('');
      setDistrictClient('');
      setIsContentClientOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      setErrorMessage('Erro ao adicionar cliente')
      setAlertLogin(true);
      setIsLoading(false);
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsEditClient(false)
    setIsLoading(false);
  }
  
  const handleEditClient = async (clientId: string) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('clients');
    const clientRef = collectionRef.doc(clientId);
    try { // Verifica se já existe um cliente com o mesmo celular
      const existingClient = await collectionRef.where('cellphone', '==', cellphoneClient).get();
      if (!existingClient.empty && existingClient.docs[0].id !== clientId) {
        setErrorMessage('Celular já cadastrado')
        setAlertLogin(true);
        setIsLoading(false);
        setTimeout(() => {
          setAlertLogin(false);
          setErrorMessage('')
        }, 3000);
        return;
      }
      const updatedClientData = { // Define os dados atualizados do item
        name: nameClient,
        cellphone: cellphoneClient,
        cep: cepClient,
        road: roadClient,
        number: numberClient,
        complement: complementClient,
        district: districtClient,
      };
      setNameClient('');
      setCellphoneClient('');
      setCepClient('');
      setRoadClient('');
      setNumberClient('');
      setComplementClient('');
      setDistrictClient('');
      setIsContentClientOpen(false);
      setIsEditClient(false)
      await clientRef.update(updatedClientData); // Atualiza o documento do item no Firestore
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao editar cliente')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleDeleteClient = async (clientId: string) => {
    setIsLoading(true);
    try {
      const collectionRef = firestore.collection('clients');
      await collectionRef.doc(clientId).delete();
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao excluir cliente')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handlePurchaseRequestClick = (purchaseRequest : PurchaseRequestData) => {
    setSelectedPurchaseRequest(purchaseRequest.id);
  };

  const handleAcepptPurchase = async (purchaseRequest: any) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('purchaseRequests');
    const purchaseRequestRef = collectionRef.doc(purchaseRequest.id);
    try {
      const updatedPurchaseRequestData = {
        status: 'accepted',
      };
      await purchaseRequestRef.update(updatedPurchaseRequestData);

      } catch (error) {
      console.error('Erro aceitar pedido:', error);
      setAlertLogin(true)
      setErrorMessage('Erro aceitar pedido')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleEditPurchase = async (purchaseRequest: PurchaseRequestData) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('purchaseRequests');
    const purchaseRequestRef = collectionRef.doc(purchaseRequest.id);
    try {
      const updatedPurchaseRequestData = {
        name: namePurchase,
        cellphone: cellphonePurchase,
        cep: cepPurchase,
        road: roadPurchase,
        number: numberPurchase,
        complement: complementPurchase,
        district: districtPurchase,
        purchase: purchasePurchase,
        observation: observationPurchase,
        payment: paymentPurchase,
        troco: trocoPurchase,
        total: totalPurchase,
      };
      await purchaseRequestRef.update(updatedPurchaseRequestData);
    } catch (error) {
      console.error('Erro ao editar pedido:', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao editar pedido')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleFinishPurchase = async (purchaseRequest: PurchaseRequestData) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('purchaseRequests');
    const purchaseRequestRef = collectionRef.doc(purchaseRequest.id);
    try {
      const updatedPurchaseRequestData = {
        status: 'finish',
      };
      await purchaseRequestRef.update(updatedPurchaseRequestData);
      } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao finalizar pedido')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleCanceledPurchase = async (purchaseRequest: PurchaseRequestData) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('purchaseRequests');
    const purchaseRequestRef = collectionRef.doc(purchaseRequest.id);
    try {
      const updatedPurchaseRequestData = {
        status: 'canceled',
      };
      await purchaseRequestRef.update(updatedPurchaseRequestData);
      } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao cancelar pedido')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleDeletePurchase = async (purchaseRequest: PurchaseRequestData) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('purchaseRequests');
    try {
      setSelectedPurchaseRequest('');
      await collectionRef.doc(purchaseRequest.id).delete();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      setAlertLogin(true)
      setErrorMessage('Erro ao excluir pedido')
      setTimeout(() => {
        setAlertLogin(false);
        setErrorMessage('')
      }, 3000);
    }
    setIsLoading(false);
  };

  useEffect(() => { // Verifica se o usuário já está autenticado ao carregar a página
    const unsubscribe = auth.onAuthStateChanged(user => { 
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    return () => {
      unsubscribe(); // Remove o listener quando o componente é desmontado
    };
  }, [setIsLogin]); // Executa somente uma vez ao carregar o componente

  useEffect(() => {
    const collectionRef = firestore.collection('message'); // Substitua 'categories' pelo nome correto da coleção
    const unsubscribe = collectionRef.onSnapshot((snapshot) => { // Cria o listener para mudanças na coleção
      const data: { message: string }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().message,
      }));
      setMessage(data[0].message);
    });
    return () => {
      unsubscribe(); // Remove o listener quando o componente é desmontado
    };
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('openStore'); 
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const data: { openStore: boolean }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        openStore: doc.data().openStore,
      }));
      setIsOpenStore(data[0].openStore);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção
    const unsubscribe = collectionRef.onSnapshot((snapshot) => { // Cria o listener para mudanças na coleção
      const categoriesData: { id: string; category: string; order: number }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        order: doc.data().order,
      }));
      categoriesData.sort((a, b) => a.order - b.order);
      setCategories(categoriesData);
    });
    return () => {
      unsubscribe(); // Remove o listener quando o componente é desmontado
    };
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('items');
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const resultItens: Item[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category,
          active: data.active,
          order: data.order,
        };
      });
      resultItens.sort((a, b) => a.order - b.order);
      setItens(resultItens);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('clients');
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const resultClients: Client[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          cellphone: data.cellphone,
          cep: data.cep,
          road: data.road,
          number: data.number,
          complement: data.complement,
          district: data.district,
        };
      });
      resultClients.sort((a, b) => a.name.localeCompare(b.name));
      setClients(resultClients);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const collectionRef = firestore.collection('purchaseRequests');
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const resultPurchaseRequests: PurchaseRequest[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          cellphone: data.cellphone,
          cep: data.cep,
          road: data.road,
          number: data.number,
          complement: data.complement,
          district: data.district,
          purchase: data.purchase,
          total: data.total,
          order: data.order,
          payment: data.payment,
          troco: data.troco,
          date: data.date,
          time: data.time,
          status: data.status,
          observation: data.observation,
        };
      });
      resultPurchaseRequests.sort((a, b) => b.order - a.order);
      setPurchaseRequests(resultPurchaseRequests);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (selectedOption === 'Hoje') {
      const now = addHours(new Date(), 0);
      const formattedDate = format(now, 'dd/MM/yyyy'); // Formato da data: "dia/mês/ano"
      const todayPurchaseRequests = purchaseRequests?.filter((purchaseRequest) => {
        return purchaseRequest.date === formattedDate;
      });
      setFilteredPurchaseRequests(todayPurchaseRequests);
      setStartDate('')
      setEndDate('')
    } else if (selectedOption === 'Todos') {
      setFilteredPurchaseRequests(purchaseRequests);
      setStartDate('')
      setEndDate('')
    } else if (selectedOption === 'Período') {
      setFilteredPurchaseRequests([]);
    } else {
      setFilteredPurchaseRequests(purchaseRequests);
    }
  }, [selectedOption, purchaseRequests]);

  useEffect(() => {
    if (startDate && endDate) {
      const filteredPurchaseRequest = purchaseRequests?.filter((purchaseRequest) => {
        const requestDate = parse(purchaseRequest.date, 'dd-MM-yyyy', new Date());
        if (isValid(requestDate)) {
          const formattedRequestDate = format(requestDate, 'yyyy-MM-dd');
          return formattedRequestDate >= startDate && formattedRequestDate <= endDate;
        }
        return false; // A data não é válida
      });
      setFilteredPurchaseRequests(filteredPurchaseRequest);
    }
  }, [startDate, endDate, purchaseRequests]);

  useEffect(() => { // Função para atualizar os resultados com base na consulta de pesquisa
    const updateResults = () => {
      if (searchQueryLogin === '') {
        setSearchResultsLogin(items); // Se a consulta de pesquisa estiver vazia, exiba todos os itens
      } else {
        const filteredItems = items?.filter((item) => { // Caso contrário, filtre os itens com base na consulta
          return (
            item.title.toLowerCase().includes(searchQueryLogin.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQueryLogin.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQueryLogin.toLowerCase()) ||
            item.price.toString().includes(searchQueryLogin)
          );
        });
        setSearchResultsLogin(filteredItems);
      }
    }; // Chame a função de atualização dos resultados sempre que a consulta de pesquisa ou os itens mudarem
    updateResults();
  }, [searchQueryLogin, items, setSearchResultsLogin]);

  //CLIENT PAGE
  const [isOpen, setIsOpen] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [road, setRoad] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [isBuy, setIsBuy] = useState(false);
  const [messageItens, setMessageItens] = useState('');
  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [troco, setTroco] = useState('');
  const [observation, setObservation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Item[] | undefined>(items);

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
      if (response.data.logradouro) {
        setRoad(response.data.logradouro);
        setDistrict(`${response.data.bairro}, ${response.data.localidade} -  ${response.data.uf}`);
      }
    } catch (err) {
      setAddress(null);
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
      }
    }
  };

  const handleFinalizeOrder = () => {
    setIsBuy(true);
    const cartSummaryElements = document.querySelectorAll('.cart-summary');
    const formattedLines: string[] = [];
    cartSummaryElements.forEach((element) => {
      const textLines = (element as HTMLElement).innerText.split('\n'); // Use type assertion aqui
      if (textLines.length >= 2) {
        const itemLine = textLines[0];
        const priceLine = textLines[1];
        formattedLines.push(`${itemLine} ${priceLine}`);
      }
    });
    const formattedText = formattedLines.join('\n-------\n');
    setMessageItens(formattedText);
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5531971451910&text=${encodeURIComponent('teste')}`;
    window.open(whatsappLink, '_blank');
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
    const clientRef = firestore.collection('clients');
    const purchaseRequestsRef = firestore.collection('purchaseRequests');
    let nextOrder = 1;
    try {
      const querySnapshot = await purchaseRequestsRef.orderBy('order', 'desc').limit(1).get(); // Consulta os documentos ordenados por "order" em ordem decrescente
      if (!querySnapshot.empty) { // Valor padrão se não houver documentos existentes      
        const lastOrder = querySnapshot.docs[0].data().order; // Se houver documentos, pegue o valor "order" do primeiro documento
        nextOrder = lastOrder + 1; // Calcule o próximo valor para "order"
      }
    } catch (error) {
      console.error('Erro ao determinar o próximo número de ordem:', error);
    }
    const now = addHours(new Date(), 0);
    const formattedDate = format(now, 'dd/MM/yyyy'); // Formato da data: "dia/mês/ano"
    const formattedTime = format(now, 'HH:mm:ss');  // Formato da hora: "hora:minuto:segundo"
    const data = {
      name: name,
      cellphone: cellphone,
      cep: cep,
      road: road,
      number: number,
      complement: complement,
      district: district,
    };
    const purchaseRequest = {
      name: name,
      cellphone: cellphone,
      cep: cep,
      road: road,
      number: number,
      complement: complement,
      district: district,
      purchase: messageItens,
      total: cartTotal,
      order: nextOrder,
      payment: paymentMethod,
      troco: troco,
      date: formattedDate,
      time: formattedTime,
      status: 'new',
      observation: observation,
    };
    try { // Verifique se já existe um cliente com o mesmo número de celular
      const snapshot = await clientRef.where('cellphone', '==', cellphone).get();
      if (!snapshot.empty) { // Já existe um cliente com o mesmo número de celular, exiba uma mensagem de erro
        const docId = snapshot.docs[0].id; // Obtenha o ID do documento existente
        await clientRef.doc(docId).update(data); // Atualize o documento existente com os novos dados
      } else { // Não há cliente com o mesmo número de celular, salve o novo cliente
        await clientRef.add(data);
      }
    } catch (error) {
      console.error('Erro ao salvar o cliente:', error);
    }
    try {
      await purchaseRequestsRef.add(purchaseRequest);
    } catch (error) {
      console.error('Erro ao enviar novo pedido', error);
    }
    const orderPurchase = `000${nextOrder}`
    let message = `${formattedDate} / ${formattedTime}\nPedido Novo !!\nID: ${orderPurchase}\n--------------\nCliente: ${name}\nTelefone: ${cellphone}\nCEP: ${cep}\nEndereço: ${road}\nNº: ${number}  Compl.: ${complement}\nBairro: ${district}\n--------------\nCarrinho\n${messageItens}\n--------------\nObs.: ${observation}\n--------------\nTotal: ${cartTotal.toFixed(2)}\nForma de Pagamento: ${paymentMethod}\n`;
    if (trocoMessage == Math.abs(cartTotal - parseFloat(troco))) {
      message += `Troco: R$${trocoMessage.toFixed(2)}`;
    }
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5531971451910&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setCartItems({});
    setPaymentMethod('');
    setTroco('');
    setObservation('')
    setIsBuy(false);
    setIsTilted(false);
  };

  const cartTotal = Object.entries(cartItems).reduce(
    (total, [title, quantity]) => {
      const card = items?.find((card) => card.title === title);
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

  useEffect(() => { // Função para atualizar os resultados com base na consulta de pesquisa
    const updateResults = () => {
      if (searchQuery === '') {
        setSearchResults(items); // Se a consulta de pesquisa estiver vazia, exiba todos os itens
      } else {
        const filteredItems = items?.filter((item) => { // Caso contrário, filtre os itens com base na consulta
          return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.price.toString().includes(searchQuery)
          );
        });
        setSearchResults(filteredItems);
      }
    }; // Chame a função de atualização dos resultados sempre que a consulta de pesquisa ou os itens mudarem
    updateResults();
  }, [searchQuery, items, setSearchResults]);

  useEffect(() => {
    const isValid =
      isOpenStore !== false &&
      name !== '' &&
      cellphone !== '' &&
      road !== '' &&
      number !== '' &&
      district !== '' &&
      paymentMethod !== '' &&
      (paymentMethod !== 'dinheiro' || troco !== '');
    setIsFormValid(isValid);
  }, [name, cellphone, road, number, district, paymentMethod, troco, isOpenStore]);

  useEffect(() => {
    const storedName = localStorage.getItem('name') || '';
    const storedCellphone = localStorage.getItem('cellphone') || '';
    const storedCep = localStorage.getItem('cep') || '';
    const storedRoad = localStorage.getItem('road') || '';
    const storedNumber = localStorage.getItem('number') || '';
    const storedComplement = localStorage.getItem('complement') || '';
    const storedDistrict = localStorage.getItem('district') || '';
    setName(storedName);
    setCellphone(storedCellphone);
    setCep(storedCep);
    setRoad(storedRoad);
    setNumber(storedNumber);
    setComplement(storedComplement);
    setDistrict(storedDistrict);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        dataCss,
        isLogin,
        isOpen,
        isTilted,
        cartItems,
        cep,
        address,
        road,
        number,
        complement,
        district,
        isBuy,
        messageItens,
        paymentMethod,
        troco,
        name,
        cellphone,
        categories,
        category,
        title,
        description, 
        price, 
        selectedCategory, 
        cartTotal,
        totalItems,
        email,
        password,
        items,
        isFormValid,
        alertLogin,
        isEditCategory,
        categoryId,
        lastCategory,
        isEditItem,
        itemId,
        lastImage,
        searchResults, 
        clients,
        nameClient,
        cellphoneClient, 
        cepClient, 
        roadClient, 
        numberClient, 
        complementClient, 
        districtClient, 
        isEditClient,
        clientId,
        observation,
        purchaseRequests,
        selectedPurchaseRequest,
        filteredPurchaseRequests,
        selectedOption,
        startDate, 
        endDate,
        imageFile,
        setRoad,
        setNumber,
        setComplement,
        setDistrict,
        setIsBuy,
        setName,
        setPaymentMethod,
        setTroco,
        setCellphone,
        setCartItems,
        setIsLogin,
        setEmail,
        setCategory,
        addCategory,
        setTitle, 
        setPrice, 
        setDescription,
        setSelectedCategory,
        setImageFile,
        setPassword,
        setIsEditCategory,
        setCategoryId,
        setLastCategory,
        setItemId,
        setIsEditItem,
        setLastImage,
        setSearchResults,
        setNameClient,
        setCellphoneClient,
        setCepClient,
        setRoadClient,
        setNumberClient,
        setComplementClient,
        setDistrictClient,
        setIsEditClient,
        setClientId,
        setObservation,
        setSelectedOption,
        setStartDate,
        setEndDate,
        addClient,
        addItem,
        getItemQuantity,
        handleFinalizeOrder,
        handleFinalize,
        handleDeleteCategory,
        handleCheckboxChange,
        handleCartClick,
        handleCepChange,
        handleDeleteItem,
        handleAddItem,
        handleRemoveItem,
        handleQuantityChange,
        handleRemoveAllItems,
        handleLogin,
        handleLogout,
        handleEditCategory,
        handleEditItem,
        handleEditClient,
        handlePurchaseRequestClick,
        handleAcepptPurchase,
        handleFinishPurchase,
        handleCanceledPurchase,
        handleDeletePurchase,
        isEditPurchase,
        setIsEditPurchase,
        message,
        setMessage,
        isEditMessage,
        setIsEditMessage,
        isOpenStore,
        setIsOpenStore,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        isContentClientOpen,
        setIsContentClientOpen,
        handleDeleteClient,
        isContentCategoryOpen,
        setIsContentCategoryOpen,
        handleMoveCategoryUp,
        handleMoveCategoryDown,
        handleMoveItemUp,
        handleMoveItemDown,
        isContentItemOpen,
        setIsContentItemOpen,
        toggleActiveItem,
        namePurchase,
        setNamePurchase,
        cellphonePurchase,
        setCellphonePurchase,
        cepPurchase,
        setCepPurchase,
        roadPurchase,
        setRoadPurchase,
        numberPurchase,
        setNumberPurchase,
        complementPurchase,
        setComplementPurchase,
        districtPurchase,
        setDistrictPurchase,
        purchasePurchase,
        setPurchasePurchase,
        observationPurchase,
        setObservationPurchase,
        paymentPurchase,
        setPaymentPurchase,
        trocoPurchase,
        setTrocoPurchase,
        totalPurchase,
        setTotalPurchase,
        handleEditPurchase,
        isContentMessageOpen,
        setIsContentMessageOpen,
        handleEditMessage,
        activeItem, 
        setActiveItem,
        isNavOpen, 
        setIsNavOpen,
        handleEditOpenStore,
        searchQuery,
        setSearchQuery,
        searchQueryLogin,
        setSearchQueryLogin,
        searchResultsLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);