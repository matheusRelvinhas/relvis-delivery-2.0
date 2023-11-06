import { useEffect, useState } from 'react';
import axios from 'axios';

// Função para obter as coordenadas de latitude e longitude de um endereço usando a API do Google Maps
const getCoordinates = async (address: string) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Substitua pelo sua chave de API do Google Maps
      },
    });
    const { results } = response.data;
    if (results.length > 0) {
      const { location } = results[0].geometry;
      const { lat, lng } = location;
      return { lat, lng };
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error);
  }
  return null;
};

// Função para calcular a distância entre dois pontos (latitude e longitude) usando a fórmula de Haversine
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distância em quilômetros
  return distance;
};

const AddressDistance = () => {
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const address1 = 'Rua Vereador Geraldo Pereira, 232, A, Padre Eustáquio';
    const address2 = 'Rua Sergipe 10 belo horizonte';

    // Obter coordenadas dos endereços
    Promise.all([getCoordinates(address1), getCoordinates(address2)])
      .then(([coords1, coords2]) => {
        if (coords1 && coords2) {
          // Calcular a distância
          const dist = calculateDistance(coords1.lat, coords1.lng, coords2.lat, coords2.lng);
          setDistance(dist);
        }
      });
  }, []);

  return (
    <div>
      {distance !== null ? `A distância entre os endereços é ${distance.toFixed(2)} km.` : 'Calculando...'}
    </div>
  );
};

export default AddressDistance;
