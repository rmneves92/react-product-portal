import styled, { css } from 'styled-components'

const image = css`
  width: 2rem;
  height: 2rem;

  border-radius: 100%;
`

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > img {
    ${image}
  }
`

export const FallbackImage = styled.div`
  ${image}
  border: 2px solid #1a1a1a;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  p,
  span {
    ${({ theme }) => css`
      color: ${theme.colors.neutral['900']};
      font-family: ${theme.fontFamily.poppins};
    `}
  }

  > p {
    font-size: 1.2rem;
    margin-bottom: 0px;
    font-weight: 600;
  }

  > span {
    font-size: 0.8rem;
    font-weight: 400;
  }
`
