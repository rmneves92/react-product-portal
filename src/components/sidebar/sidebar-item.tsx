import * as S from './styles'

type Props = {
  text: string
  url: string
}

export function SidebarItem({ text, url }: Props) {
  const { pathname } = window.location
  const isActive = pathname === url

  return (
    <S.SidebarItem isActive={!!isActive} href={url}>
      <span>{text}</span>
    </S.SidebarItem>
  )
}
