import * as S from './styles'
import { SidebarItem } from '@/components/sidebar/sidebar-item'

const sidebarItems = [
  {
    name: 'Login',
    url: '/login'
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
