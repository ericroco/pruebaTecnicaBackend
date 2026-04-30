export interface JwtPayload {
  sub: string;
  email: string;
  fullName?: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName?: string;
}
