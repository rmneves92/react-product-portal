import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.aside`
  width: 216px;
  padding: 1rem;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary['900']};
  `}
`

type SidebarItemProps = {
  isActive: boolean
}

export const SidebarItem = styled(Link)<SidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;

  :hover {
    opacity: 0.8;
  }

  ${({ theme, isActive }) => css`
    color: ${isActive
      ? theme.colors.neutral['300']
      : theme.colors.neutral['500']};

    > span {
      font-size: 1.2rem;
      font-weight: 600;
      font-family: ${theme.fontFamily.figtree};
    }

    &:before {
      content: '';
      position: absolute;
      left: -0.2rem;
      top: 0.2rem;
      width: 4px;
      height: 27px;
      display: ${isActive ? 'block' : 'none'};
      background-color: ${isActive
        ? theme.colors.primary['900']
        : theme.colors.white};
    }
  `}
`
