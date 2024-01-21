import styled, { css } from 'styled-components'

export const Wrapper = styled.header`
  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 2px 0px rgba(46, 45, 55, 0.12);

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}

  > section {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`
