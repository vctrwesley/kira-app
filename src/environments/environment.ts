interface Environment {
  production: boolean;
  apiURLBase: string;
  clientId: string;
  clientSecret: string;
  obterTokenUrl: string;
}

export const environment: Environment = {
  production: false,
  //apiURLBase: 'http://localhost:8088',
  apiURLBase: '',
  clientId: 'kira-app',
  clientSecret: '',
  obterTokenUrl: '/oauth/token',
};
