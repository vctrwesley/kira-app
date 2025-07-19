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
  apiURLBase: 'https://kira-api-2omz.onrender.com/',
  clientId: 'kira-api',
  clientSecret: '@2025',
  obterTokenUrl: '/oauth/token',
};
