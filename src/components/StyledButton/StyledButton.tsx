import styled from 'styled-components';

interface ButtonProps {
  normalColor?: string;
  normalBackgroundColor?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  disabledBackgroundColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  color: ${props => props.normalColor};
  background-color: ${props => props.normalBackgroundColor};
  &:hover {
    color: ${props => props.hoverColor};
    background-color: ${props => props.hoverBackgroundColor};
  }
  &:active {
    background-color: ${props => props.activeBackgroundColor};
  }
  &:disabled {
    background-color: ${props => props.disabledBackgroundColor};
  }
`;

export default StyledButton;
