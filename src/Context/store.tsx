'use client';

import React, { createContext, useContext, useState, ReactNode, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { firestore, storage, auth } from '@/firebase';

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
  handleDeleteCategory: (categoryId: string, category: string) => void;
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
  handleDeleteCategory: () => {},
  handleEditCategory: () => {},
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
    searchImage:'/img/search.png',
    iconAbout: {
      local: '/img/local.png',
      payment: '/img/payment.png',
      contact: '/img/contact.png',
      operation: '/img/operation.png',
    },
    whatsImage: '/img/whatsapp.png',
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
  const [alertLogin, setAlertLogin] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [lastCategory, setLastCategory] = useState('');
  const [itemId, setItemId] = useState('');
  const [isEditItem, setIsEditItem] = useState(false);
  const [lastImage, setLastImage] = useState('');
  const [searchResults, setSearchResults] = useState<Item[] | undefined>(items);
  const [clients, setClients] = useState<Client[]>();
  const [nameClient, setNameClient] = useState('');
  const [cellphoneClient, setCellphoneClient] = useState('');
  const [cepClient, setCepClient] = useState('');
  const [roadClient, setRoadClient] = useState('');
  const [numberClient, setNumberClient] = useState('');
  const [complementClient, setComplementClient] = useState('');
  const [districtClient, setDistrictClient] = useState('');
  const [stateClient, setStateClient] = useState('');
  const [isEditClient, setIsEditClient] = useState(false);
  const [clientId, setClientId] = useState('');
  
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
        const collectionRef = firestore.collection('categories');
        // Consulte todas as categorias para contar quantas existem
        const querySnapshot = await collectionRef.get();
        const totalCategories = querySnapshot.size;
        const order = totalCategories + 1; // Determine a ordem para a nova categoria
        // Verifique se a categoria já existe
        const existingCategory = await collectionRef.where('category', '==', category).get();
        if (existingCategory.size === 0) {
          // A categoria ainda não existe, pode adicioná-la com a ordem calculada
          await collectionRef.add({ category, order });
          setCategory('');
          console.log('Categoria salva com sucesso!');
        } else {
          // A categoria já existe, defina o alertLogin como true por 3 segundos
          setAlertLogin(true);
          setTimeout(() => {
            setAlertLogin(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Erro ao salvar categoria:', error);
      }
    }
  };

  const handleEditCategory = async (categoryId: string, lastCategory: string) => {
    try {
      const collectionRef = firestore.collection('categories');
      const collectionItemRef = firestore.collection('items');
      // Atualize a categoria da categoria em questão
      await collectionRef.doc(categoryId).update({
        category: category,
      });
      // Encontre todos os itens com a categoria anterior ('lastCategory')
      const querySnapshot = await collectionItemRef.where('category', '==', lastCategory).get();
      // Atualize a categoria de todos os itens encontrados
      const batch = firestore.batch();
      querySnapshot.forEach((doc) => {
        const itemRef = collectionItemRef.doc(doc.id);
        batch.update(itemRef, { category: category });
      });
      await batch.commit();
      setIsEditCategory(false);
      setLastCategory('')
      setCategory('');
      console.log('Categoria editada com sucesso e itens atualizados!');
    } catch (error) {
      console.error('Erro ao editar categoria!', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string, category: string) => {
    try {
      const collectionRef = firestore.collection('categories');
      const collectionItemRef = firestore.collection('items');
      // Obtenha a ordem da categoria que será excluída
      const categoryDoc = await collectionRef.doc(categoryId).get();
      const orderToDelete = categoryDoc.data()?.order;
      // Exclua a categoria
      await collectionRef.doc(categoryId).delete();
      // Consulte todas as categorias com ordens maiores que a excluída
      const querySnapshot = await collectionRef.where('order', '>', orderToDelete).get();
      // Atualize as ordens das categorias encontradas
      querySnapshot.forEach(async (doc) => {
        const docRef = collectionRef.doc(doc.id);
        const currentOrder = doc.data().order;
        await docRef.update({ order: currentOrder - 1 });
      });
      // Consulte os itens com a mesma categoria e exclua-os
      const itemQuerySnapshot = await collectionItemRef.where('category', '==', category).get();
      itemQuerySnapshot.forEach(async (doc) => {
        await collectionItemRef.doc(doc.id).delete();
      });
      console.log('Categoria e itens associados excluídos com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir categoria e itens associados:', error);
    }
  };

  async function addItem(event: React.FormEvent) {
    event?.preventDefault();
    const collectionRef = firestore.collection('items');

    // Consulte todas os itenss para contar quantos existem
    const querySnapshotOrder = await collectionRef.get();
    const totalCategories = querySnapshotOrder.size;
    const order = totalCategories + 1; // Determine a ordem para o novo item
    
    const data: ItemData = {
      title,
      description,
      price: parseFloat(price),
      image: '',
      category: selectedCategory,
      active: false,
      order,
    };

    try {
      // Verifica se já existe um item com o mesmo título
      const querySnapshot = await collectionRef.where('title', '==', title).get();
      if (!querySnapshot.empty) {
        // Já existe um item com o mesmo título, ativa o alerta
        setAlertLogin(true);
        // Define um timer para desativar o alerta após 3 segundos
        setTimeout(() => {
          setAlertLogin(false);
        }, 3000);
        // Não continue o processo de salvar
        return;
      }
      // Se não houver itens com o mesmo título, continue com o processo de salvar
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
      setSelectedCategory('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  const handleEditItem = async (itemId: string) => {
    const collectionRef = firestore.collection('items');
    const itemRef = collectionRef.doc(itemId);

    try {
      // Verifica se já existe um item com o mesmo título
      const existingItem = await collectionRef.where('title', '==', title).get();
      if (!existingItem.empty && existingItem.docs[0].id !== itemId) {
        setAlertLogin(true);
          setTimeout(() => {
            setAlertLogin(false);
          }, 3000);
        return;
      }
    
      // Define os dados atualizados do item
      const updatedItemData = {
        title: title,
        description: description,
        price: parseFloat(price),
        category: selectedCategory,
        image: lastImage, // Adicione esta propriedade
      };

      if (imageFile) {
        // Faz upload da nova imagem para o Firebase Storage
        const storageRef = storage.ref();
        const imageRef = storageRef.child(itemId);
        await imageRef.put(imageFile);
        // Obtém a URL de download da nova imagem
        const imageUrl = await imageRef.getDownloadURL();
        updatedItemData.image = imageUrl;
      }
      setTitle('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setSelectedCategory('');
      setLastImage('')
      setIsEditItem(false)
      // Atualiza o documento do item no Firestore
      await itemRef.update(updatedItemData);

      console.log('Item editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar item:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const collectionRef = firestore.collection('items');
      const itemDoc = await collectionRef.doc(itemId).get();
      const orderToDelete = itemDoc.data()?.order;
      await collectionRef.doc(itemId).delete();
      const querySnapshot = await collectionRef.where('order', '>', orderToDelete).get();
      // Atualize as ordens dos itens encontradas
      querySnapshot.forEach(async (doc) => {
        const docRef = collectionRef.doc(doc.id);
        const currentOrder = doc.data().order;
        await docRef.update({ order: currentOrder - 1 });
      });
      console.log('Item excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };
  
  async function addClient(event: React.FormEvent) {
    event?.preventDefault();
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

    try {
      // Verifica se já existe um item com o mesmo celular
      const querySnapshot = await collectionRef.where('cellphone', '==', cellphoneClient).get();
      if (!querySnapshot.empty) {
        // Já existe um item com o mesmo celular, ativa o alerta
        setAlertLogin(true);
        // Define um timer para desativar o alerta após 3 segundos
        setTimeout(() => {
          setAlertLogin(false);
        }, 3000);
        // Não continue o processo de salvar
        return;
      }
      // Salva o objeto no Firestore
      await collectionRef.add(data);
      setNameClient('');
      setCellphoneClient('');
      setCepClient('');
      setRoadClient('');
      setNumberClient('');
      setComplementClient('');
      setDistrictClient('');
    } catch (error) {
      console.error('Error adding client:', error);
    }
  }
  
  const handleEditClient = async (clientId: string) => {
    const collectionRef = firestore.collection('clients');
    const clientRef = collectionRef.doc(clientId);
    try {
      // Verifica se já existe um cliente com o mesmo celular
      const existingClient = await collectionRef.where('cellphone', '==', cellphoneClient).get();
      if (!existingClient.empty && existingClient.docs[0].id !== clientId) {
        setAlertLogin(true);
          setTimeout(() => {
            setAlertLogin(false);
          }, 3000);
        return;
      }
      // Define os dados atualizados do item
      const updatedClientData = {
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
      setIsEditClient(false)
      // Atualiza o documento do item no Firestore
      await clientRef.update(updatedClientData);
      console.log('Cliente editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar cliete:', error);
    }
  };

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
    const collectionRef = firestore.collection('categories'); // Substitua 'categories' pelo nome correto da coleção

    // Cria o listener para mudanças na coleção
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const categoriesData: { id: string; category: string; order: number }[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        order: doc.data().order,
      }));
      categoriesData.sort((a, b) => a.order - b.order);
      setCategories(categoriesData);
    });

    return () => {
      // Remove o listener quando o componente é desmontado
      unsubscribe();
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

    const clientRef = firestore.collection('clients');
    
    const data = {
      name: name,
      cellphone: cellphone,
      cep: cep,
      road: road,
      number: number,
      complement: complement,
      district: district,
    };
    
    try {
      // Verifique se já existe um cliente com o mesmo número de celular
      const snapshot = await clientRef.where('cellphone', '==', cellphone).get();
      if (!snapshot.empty) {
        // Já existe um cliente com o mesmo número de celular, exiba uma mensagem de erro
        const docId = snapshot.docs[0].id; // Obtenha o ID do documento existente
        await clientRef.doc(docId).update(data); // Atualize o documento existente com os novos dados
      } else {
        // Não há cliente com o mesmo número de celular, salve o novo cliente
        await clientRef.add(data);
      }
        // Resto do código para enviar a mensagem no WhatsApp
        let message = `Pedido Novo!!\nCliente: ${name}\nTelefone: ${cellphone}\nCEP: ${cep}\nEndereço: ${road}\nNº: ${number}    Compl.: ${complement}\nBairro: ${district}\n-------\n${messageItens}\nForma de Pagamento: ${paymentMethod}\n`;
        if (trocoMessage == Math.abs(cartTotal - parseFloat(troco))) {
          message += `Troco: R$${trocoMessage.toFixed(2)}`;
        }
        setTroco('');
        const whatsappLink = `https://api.whatsapp.com/send?phone=+5531971451910&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error('Erro ao salvar o cliente:', error);
    }
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
  }, [name, cellphone, road, number, district, paymentMethod, troco]);

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
        handleCheckboxChange,
        handleCartClick,
        cartItems,
        setCartItems,
        setIsLogin,
        cep,
        address,
        handleCepChange,
        road,
        number,
        complement,
        district,
        setRoad,
        setNumber,
        setComplement,
        setDistrict,
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
        handleDeleteItem,
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
        addItem,
        handleAddItem,
        handleRemoveItem,
        handleQuantityChange,
        getItemQuantity,
        cartTotal,
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
        alertLogin,
        isEditCategory,
        setIsEditCategory,
        categoryId,
        setCategoryId,
        lastCategory,
        setLastCategory,
        handleEditCategory,
        itemId,
        setItemId,
        isEditItem,
        setIsEditItem,
        lastImage,
        setLastImage,
        handleEditItem,
        searchResults, 
        setSearchResults,
        clients,
        nameClient, 
        setNameClient,
        cellphoneClient, 
        setCellphoneClient,
        cepClient, 
        setCepClient,
        roadClient, 
        setRoadClient,
        numberClient, 
        setNumberClient,
        complementClient, 
        setComplementClient,
        districtClient, 
        setDistrictClient,
        isEditClient,
        setIsEditClient,
        addClient,
        clientId,
        setClientId,
        handleEditClient,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
