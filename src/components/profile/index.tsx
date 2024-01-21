import * as S from './styles'

export type Props = {
  imageUrl: string
  imageAlt: string
  name: string
}

export function Profile({ imageUrl, imageAlt, name }: Props) {
  const canShowFallbackImage = !!imageUrl

  return (
    <S.Wrapper>
      {canShowFallbackImage ? (
        <img src={imageUrl} alt={imageAlt} />
      ) : (
        <S.FallbackImage />
      )}

      <S.Profile>
        <p>{name}</p>
      </S.Profile>
    </S.Wrapper>
  )
}
