import React, { useRef, useState } from 'react';
import './CardCarousel.css'; // Importe o CSS aqui

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
  handleAddItem: (card: Card) => void;
  handleRemoveItem: (card: Card) => void;
  handleQuantityChange: (card: Card, e: React.ChangeEvent<HTMLInputElement>) => void;
  getItemQuantity: (card: Card) => number;
  cartTotal: number;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  category,
  handleAddItem,
  handleRemoveItem,
  handleQuantityChange,
  getItemQuantity,
}) => {
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
          <button className="scroll-button left" onClick={scrollLeft}>
            &#9664;
          </button>
          <div className="card-list" ref={carouselRef}>
            {cards.map((card, index) => (
              <div key={index} className="card">
                <div className='card-list-img-title'>
                  <figure>
                    <picture>
                      <source src={card.image} type="image/png" />
                      <img className='logo-img' src={card.image} alt={card.title} height='50px' width='50px' />
                    </picture>
                  </figure>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.description}</p>
                <p className="price">Preço: R${card.price}</p>
                <div className="item-controls">
                  <button onClick={() => handleRemoveItem(card)}>-</button>
                  <input
                    type="number"
                    min={0}
                    value={getItemQuantity(card)}
                    onChange={(e) => handleQuantityChange(card, e)}
                  />
                  <button onClick={() => handleAddItem(card)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            &#9654;
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;