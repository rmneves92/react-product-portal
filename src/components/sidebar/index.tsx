import * as S from './styles'
import { SidebarItem } from '@/components/sidebar/sidebar-item'

const sidebarItems = [
  {
    name: 'Lista de Produtos',
    url: '/home'
  },
  {
    name: 'Cadastrar Produto',
    url: '/cadastrar'
  }
]

export function Sidebar() {
  return (
    <S.Wrapper>
      <>
        {sidebarItems.map((sidebarItem) => (
          <SidebarItem
            key={sidebarItem.name}
            text={sidebarItem.name}
            url={sidebarItem.url}
          />
        ))}
      </>
    </S.Wrapper>
  )
}
