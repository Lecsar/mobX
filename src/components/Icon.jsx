import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { noop } from '../helpers';

const ICONS = {
  check: {
    url:
      'https://www.pinclipart.com/picdir/big/19-192041_palm-rejection-checkmark-checkmark-check-mark-clipart.png',
    alt: 'checkIcon'
  },

  plus: {
    url: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic/plus1600.png',
    alt: 'plusIcon'
  },

  delete: {
    url: 'https://png.icons8.com/metro/1600/delete-sign.png',
    alt: 'deleteIcon'
  }
};

const StyledIcon = styled.img`
  height: ${({ size }) => (size ? size + 'px' : '')};
  width: ${({ size }) => (size ? size + 'px' : '')};
  padding: ${({ padding }) => padding + 'px'};
  padding: ${({ margin }) => margin + 'px'};
  max-width: 100%;
  cursor: pointer;
  filter: invert(0.5);

  &:hover {
    filter: invert(0);
  }
`;

export const Icon = observer(
  ({ type = 'check', size, padding = 5, margin = 5, onClick = noop }) => (
    <StyledIcon
      src={ICONS[type].url}
      alt={ICONS[type].alt}
      size={size}
      padding={padding}
      margin={margin}
      onClick={onClick}
    />
  )
);
