import styled from 'styled-components';

const ButtonDelete = styled('button')({
  display: 'inline-block',
  width: '2rem',
  height: '2rem',
  outline: 'none',
  borderRadius: 32,
  border: 'none',
  background: 'url(/img/trash.png) no-repeat center',
  backgroundSize: '17px',
  cursor: 'pointer',
  transition: 'all .3s ease-out',
  '&:active': {
    backgroundColor: '#e0e0e0',
  },
});

export default ButtonDelete;
