
export class AuthenticationRequest {
  email: string;
  password: String
}

export class AuthenticationResponse {
  username: string;
  token: String;
  firstname : string;
  lastname: string;
  rating: string;
  available: String;
  earned: String;
  used: String;
}

