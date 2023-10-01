import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/Context/store';

const AlertSound: React.FC = () => {
  const { dataCss, purchaseRequests } = useGlobalContext();

  const [audio] = useState(new Audio('/sounds/alert-sound.mp3'));
  const playSound = purchaseRequests?.some(
    (purchaseRequest) => purchaseRequest.status === 'new'
  );

  useEffect(() => {
    if (playSound) {
      audio.loop = true; // Configura o loop para true
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playSound, audio, purchaseRequests]);
  return null; // O componente não renderiza nada visível na interface
};

export default AlertSound;