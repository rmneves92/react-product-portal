import { Profile } from '@/components/profile'
import { useUser } from '@/context/userContext'
import * as S from './styles'

export function Header() {
  const { user } = useUser()

  return (
    <S.Wrapper>
      <p>React Product Portal</p>

      <section>
        {user ? (
          <>
            <Profile
              imageUrl={user.image}
              imageAlt={`Foto de perfil de ${user.nome}`}
              name={user.nome}
            />
          </>
        ) : (
          <p>Faça login</p>
        )}
      </section>
    </S.Wrapper>
  )
}
