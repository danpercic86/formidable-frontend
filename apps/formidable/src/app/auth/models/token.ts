export type TokenType = 'access' | 'refresh';

export interface IToken {
  readonly exp: number;
  readonly jti: string;
  readonly token_type: TokenType;
  readonly user_id: number;
}
