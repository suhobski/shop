import styled from 'styled-components';

const Button = styled('button')({
  padding: '0.5rem',
  border: '1px solid #dddddd',
  borderRadius: 4,
  outline: 'none',
  cursor: 'pointer',
  '&:hover': {
    background: '#e0e0e0',
  },
  '&:active': {
    border: '1px solid #888888',
  },
});

export default Button;
