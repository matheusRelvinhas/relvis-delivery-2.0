'use client';

import React, { useRef, useState, useEffect } from 'react';
import './CardCarousel.css';
import { useGlobalContext } from '@/Context/store';
import StyledButton from '../StyledButton/StyledButton';
import { format } from 'date-fns-tz';

interface CardCarouselProps {
  category: any;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ category }) => {
  const {
    dataCss,
    searchResults,
    handleAddItem,
    handleRemoveItem,
    handleQuantityChange,
    getItemQuantity,
  } = useGlobalContext();

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [itemSelectedComplement, setItemSelectedComplement] = useState<
    {
      id: string;
      valuePriceComplements: number;
      valueTitleComplements: string;
    }[]
  >([]);

  const getItemStateById = (itemId: string) => {
    return itemSelectedComplement?.find((state: any) => state.id === itemId);
  };

  const updateItemState = (
    itemId: string,
    valuePrice: number,
    valueTitle: string
  ) => {
    setItemSelectedComplement((prevStates) => {
      const existingItemIndex = prevStates.findIndex(
        (state) => state.id === itemId
      );
      if (existingItemIndex !== -1) {
        // Item já existe, atualize-o
        const updatedStates = [...prevStates];
        updatedStates[existingItemIndex] = {
          ...updatedStates[existingItemIndex],
          valuePriceComplements: valuePrice,
          valueTitleComplements: valueTitle,
        };
        return updatedStates;
      } else {
        // Item não existe, adicione-o
        return [
          ...prevStates,
          {
            id: itemId,
            valuePriceComplements: valuePrice,
            valueTitleComplements: valueTitle,
          },
        ];
      }
    });
  };

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

  const [dateTime] = useState(new Date());
  const currentDay = format(dateTime, 'EEEE');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const currentDateTime = new Date();
      const formattedTime = format(currentDateTime, 'HH:mm', {
        timeZone: 'America/Sao_Paulo',
      });
      setTime(formattedTime);
    };
    const intervalId = setInterval(updateDateTime, 60000); // Atualiza a hora a cada minuto
    updateDateTime(); // Chama a função uma vez para definir o valor inicial
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <>
      <div className="card-carousel-container">
        <div className="category-title">
          {category.deliveryPromotion && (
            <figure>
              <picture>
                <source src={dataCss.deliveryPromotionImage} type="image/png" />
                <img src={dataCss.deliveryPromotionImage} alt="icon-img" />
              </picture>
            </figure>
          )}
          <h1 className="category">{category.category}</h1>
        </div>
        <div className="card-carousel">
          <StyledButton
            normalColor="#333"
            hoverColor={dataCss.colorPrimary}
            className="scroll-button left"
            onClick={scrollLeft}
          >
            <span className="arrow">◄</span>
          </StyledButton>
          <div className="card-list" ref={carouselRef}>
            {searchResults?.map((card) => {
              const complementItem = getItemStateById(card.id);
              if (card.active && card.category === category.category) {
                if (
                  (card.activeSunday && currentDay == 'Sunday') ||
                  (card.activeMonday && currentDay == 'Monday') ||
                  (card.activeTuesday && currentDay == 'Tuesday') ||
                  (card.activeWednesday && currentDay == 'Wednesday') ||
                  (card.activeThursday && currentDay == 'Thursday') ||
                  (card.activeFriday && currentDay == 'Friday') ||
                  (card.activeSaturday && currentDay == 'Saturday')
                ) {
                  if (
                    (card.activeTime &&
                      new Date(`1970-01-01T${time}:00`) >=
                        new Date(`1970-01-01T${card.startTime}:00`) &&
                      new Date(`1970-01-01T${time}:00`) <=
                        new Date(`1970-01-01T${card.endTime}:00`)) ||
                    card.activeTime == false
                  ) {
                    return (
                      <div key={card.id} className="card">
                        <div
                          style={{
                            backgroundColor: dataCss.backgroundColorCard,
                          }}
                          className="card-div"
                        >
                          <div
                            className="card-img"
                            style={{
                              borderColor: dataCss.colorPrimary,
                              background: dataCss.colorPrimary,
                            }}
                          >
                            <figure>
                              <picture>
                                <source src={card.image} type="image/png" />
                                <img src={card.image} alt="image-item" />
                              </picture>
                            </figure>
                          </div>
                          <div className="card-info">
                            <span
                              className="card-title"
                              style={{ borderColor: dataCss.colorPrimary }}
                            >
                              {card.title}
                            </span>
                            <span
                              style={{ color: dataCss.fontColor }}
                              className="description"
                            >
                              {card.description}
                            </span>
                            <span
                              style={{
                                color: dataCss.fontColor,
                                borderColor: dataCss.colorPrimary,
                              }}
                              className="price"
                            >
                              R${' '}
                              {(
                                card.price +
                                (complementItem?.valuePriceComplements
                                  ? complementItem?.valuePriceComplements
                                  : 0)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {card.activeComplements ? (
                          <form
                            className="form-item-controls"
                            onSubmit={() =>
                              handleAddItem(
                                card,
                                complementItem?.valueTitleComplements
                                  ? complementItem?.valueTitleComplements
                                  : '',
                                complementItem?.valuePriceComplements
                                  ? complementItem?.valuePriceComplements
                                  : 0
                              )
                            }
                          >
                            <select
                              style={{
                                backgroundColor: dataCss.colorPrimary,
                                color: dataCss.summaryFont,
                              }}
                              className="select-card-carousel"
                              required
                              onChange={(e) => {
                                const optionValue = e.target.value;
                                if (optionValue) {
                                  const { price, title } =
                                    JSON.parse(optionValue);
                                  updateItemState(card.id, price, title);
                                }
                              }}
                            >
                              <option value="">
                                {card.complements.complement}
                              </option>
                              {card.complements.complements.map((option) => (
                                <option
                                  key={`${card.complements.id}${option.order}`}
                                  value={JSON.stringify(option)}
                                >
                                  {option.title} - R$ {option.price.toFixed(2)}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={0}
                              value={getItemQuantity(
                                card,
                                complementItem?.valueTitleComplements
                                  ? complementItem?.valueTitleComplements
                                  : ''
                              )}
                              onChange={(e) => {
                                const newAmount =
                                  parseInt(e.target.value, 10) || 0;
                                handleQuantityChange(
                                  card,
                                  complementItem?.valueTitleComplements
                                    ? complementItem?.valueTitleComplements
                                    : '',
                                  complementItem?.valuePriceComplements
                                    ? complementItem?.valuePriceComplements
                                    : 0,
                                  newAmount
                                );
                              }}
                            />
                            <StyledButton
                              style={{ color: dataCss.buttonColor }}
                              normalBackgroundColor={dataCss.colorPrimary}
                              hoverBackgroundColor={dataCss.activeButtonColor}
                              className="card-carousel-add-button"
                              type="submit"
                            >
                              +
                            </StyledButton>
                          </form>
                        ) : (
                          <div className="item-controls">
                            <StyledButton
                              style={{ color: dataCss.buttonColor }}
                              normalBackgroundColor={dataCss.colorPrimary}
                              hoverBackgroundColor={dataCss.activeButtonColor}
                              className="card-carousel-remove-button"
                              onClick={() =>
                                handleRemoveItem(
                                  card,
                                  complementItem?.valueTitleComplements
                                    ? complementItem?.valueTitleComplements
                                    : ''
                                )
                              }
                              type="button"
                            >
                              -
                            </StyledButton>
                            <input
                              type="number"
                              min={0}
                              value={getItemQuantity(
                                card,
                                complementItem?.valueTitleComplements
                                  ? complementItem?.valueTitleComplements
                                  : ''
                              )}
                              onChange={(e) => {
                                const newAmount =
                                  parseInt(e.target.value, 10) || 0;
                                handleQuantityChange(
                                  card,
                                  complementItem?.valueTitleComplements
                                    ? complementItem?.valueTitleComplements
                                    : '',
                                  complementItem?.valuePriceComplements
                                    ? complementItem?.valuePriceComplements
                                    : 0,
                                  newAmount
                                );
                              }}
                            />
                            <StyledButton
                              style={{ color: dataCss.buttonColor }}
                              normalBackgroundColor={dataCss.colorPrimary}
                              hoverBackgroundColor={dataCss.activeButtonColor}
                              className="card-carousel-add-button"
                              onClick={() =>
                                handleAddItem(
                                  card,
                                  complementItem?.valueTitleComplements
                                    ? complementItem?.valueTitleComplements
                                    : '',
                                  complementItem?.valuePriceComplements
                                    ? complementItem?.valuePriceComplements
                                    : 0
                                )
                              }
                              type="button"
                            >
                              +
                            </StyledButton>
                          </div>
                        )}
                      </div>
                    );
                  }
                }
              }
              return null;
            })}
          </div>
          <StyledButton
            normalColor="#333"
            hoverColor={dataCss.colorPrimary}
            className="scroll-button right"
            onClick={scrollRight}
          >
            <span className="arrow">►</span>
          </StyledButton>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
