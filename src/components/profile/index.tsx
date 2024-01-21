import { Button, Menu, MenuItem } from '@mui/material'
import * as S from './styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type Props = {
  imageUrl: string
  imageAlt: string
  name: string
}

export function Profile({ imageUrl, imageAlt, name }: Props) {
  const canShowFallbackImage = !!imageUrl
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <S.Wrapper>
      {canShowFallbackImage ? (
        <img src={imageUrl} alt={imageAlt} />
      ) : (
        <S.FallbackImage />
      )}

      <S.Profile>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <p>{name}</p>
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={() => navigate('/login')}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </Menu>
      </S.Profile>
    </S.Wrapper>
  )
}
