'use client';

import React, { useRef } from 'react';
import './CardCarousel.css';
import { useGlobalContext } from '@/Context/store';
import StyledButton from '../StyledButton/StyledButton';

interface CardCarouselProps {
  category: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ category }) => {
  const {
    dataCss,
    items,
    handleAddItem,
    handleRemoveItem,
    handleQuantityChange,
    getItemQuantity,
  } = useGlobalContext();

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
      <div className="card-carousel-container">
        <h1 className="category">{category}</h1>
        <div className="card-carousel">
          <StyledButton
            normalColor="#333"
            hoverColor={dataCss.colorSecundary}
            className="scroll-button left"
            onClick={scrollLeft}
          >
            &#9664;
          </StyledButton>
          <div className="card-list" ref={carouselRef}>
            {items?.map((card) => {
              if (card.category === category) {
                return (
                  <div key={card.chave} className="card">
                    <div
                      style={{ backgroundColor: dataCss.backgroundColorCard }}
                      className="card-div"
                    >
                      <div className='card-img'>
                        <figure>
                          <picture>
                            <source src={card.image} type="image/png" />
                            <img
                              src={card.image}
                              alt={card.title}
                            />
                          </picture>
                        </figure>
                      </div>
                      <div className='card-info'>
                        <h3>{card.title}</h3>
                        <p style={{ color: dataCss.fontColor }} className="description">
                          {card.description}
                        </p>
                        <p
                          style={{ color: dataCss.colorSecundary }}
                          className="price"
                        >
                          Preço: R${card.price}
                        </p>
                      </div>
                    </div>
                    <div className="item-controls">
                      <StyledButton
                        style={{ color: dataCss.buttonColor }}
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
                        style={{ color: dataCss.buttonColor }}
                        normalBackgroundColor={dataCss.colorSecundary}
                        hoverBackgroundColor={dataCss.colorPrimary}
                        onClick={() => handleAddItem(card)}
                      >
                        +
                      </StyledButton>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <StyledButton
            normalColor="#333"
            hoverColor={dataCss.colorSecundary}
            className="scroll-button right"
            onClick={scrollRight}
          >
            &#9654;
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
