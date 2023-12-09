export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// The maximum is exclusive and the minimum is inclusive
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomBoolean = () => {
  return getRandomInt(0, 2) === 1;
}

export function getToken(): string {
  return localStorage.getItem('token') as string;
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function shouldRedirect() {
  if (!getToken()) {
    return '/login';
  }
  return '';
}
