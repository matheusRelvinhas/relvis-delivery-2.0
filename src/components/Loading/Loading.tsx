'use client';

import { useGlobalContext } from '@/Context/store';
import './Loading.css';



const Loading: React.FC = ({}) => {
  const {
    dataCss,
  } = useGlobalContext();

  return (
    <>
      <div className="loader"></div>
    </>
  );
};

export default Loading;
