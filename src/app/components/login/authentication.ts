
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
  image: String;
  available: String;
  earned: String;
  used: String;
}

