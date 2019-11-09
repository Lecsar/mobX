import styled from 'styled-components';

export const Text = styled.p`
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'left'};
  padding: 0;
  margin: 0;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-family: serif;
  width: 100%;
  cursor: ${({ cursor }) => cursor || 'auto'};
  color: ${({ color }) => color || 'black'};
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
`;
