'use client';

import React, { useRef } from 'react';
import './CardCarousel.css';
import { useGlobalContext } from '@/Context/store';
import StyledButton from '../StyledButton/StyledButton';

type Card = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

interface CardCarouselProps {
  cards: Card[];
  category: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  category,
}) => {
  
  const { dataCss, handleAddItem, handleRemoveItem, handleQuantityChange, getItemQuantity } = useGlobalContext();

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
  };

  return (
    <>
      <div className='card-carousel-container'>
        <h1 className='category'>{category}</h1>
        <div className="card-carousel">
          <StyledButton normalColor='#333' hoverColor={dataCss.colorSecundary} className="scroll-button left" onClick={scrollLeft}>
            &#9664;
          </StyledButton>
          <div className="card-list" ref={carouselRef}>
            {cards.map((card, index) => (
              <div 
                style={{backgroundColor: dataCss.backgroundColorCard}}
                key={index} 
                className="card"
              >
                <div className='card-list-img-title'>
                  <figure>
                    <picture>
                      <source src={card.image} type="image/png" />
                      <img className='logo-img' src={card.image} alt={card.title} height='50px' width='50px' />
                    </picture>
                  </figure>
                  <h3>{card.title}</h3>
                </div>
                <p style={{color: dataCss.fontColor}}>{card.description}</p>
                <p style={{color: dataCss.colorSecundary}} className="price">Preço: R${card.price}</p>
                <div className="item-controls">
                  <StyledButton
                    style={{color: dataCss.buttonColor}}
                    normalBackgroundColor={dataCss.colorSecundary} 
                    hoverBackgroundColor={dataCss.colorPrimary} 
                    onClick={() => handleRemoveItem(card)}
                  >
                    -
                  </StyledButton>
                  <input
                    type="number"
                    min={0}
                    value={getItemQuantity(card)}
                    onChange={(e) => handleQuantityChange(card, e)}
                  />
                  <StyledButton
                    style={{color: dataCss.buttonColor}}
                    normalBackgroundColor={dataCss.colorSecundary} 
                    hoverBackgroundColor={dataCss.colorPrimary} 
                    onClick={() => handleAddItem(card)}
                  >
                    +
                  </StyledButton>
                </div>
              </div>
            ))}
          </div>
          <StyledButton normalColor='#333' hoverColor={dataCss.colorSecundary} className="scroll-button right" onClick={scrollRight}>
            &#9654;
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;