export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: UserProfile;
}

export interface UserPayload {
  username: string;
  sub: string;
  email: string;
  role: string;
}
