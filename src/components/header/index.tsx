import { Profile } from '@/components/profile'
const mockProfile = {
  imageUrl: '',
  imageAlt: 'Foto de perfil do usuário',
  name: 'Nome sobrenome'
}

import * as S from './styles'

export function Header() {
  return (
    <S.Wrapper>
      <a href="/">
        <p>Home</p>
      </a>

      <section>
        <Profile
          imageUrl={mockProfile.imageUrl}
          imageAlt={mockProfile.imageAlt}
          name={mockProfile.name}
        />
      </section>
    </S.Wrapper>
  )
}
