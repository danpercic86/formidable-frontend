export type TokenType = 'access' | 'refresh'

export interface IToken
{
  exp: number,
  jti: string,
  token_type: TokenType,
  user_id: number
}
