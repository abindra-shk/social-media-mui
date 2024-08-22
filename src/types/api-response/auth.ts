interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    userName: string;
    isEmailVerified: boolean;
    profile: {
      avatar: string;
    };
  };
}
