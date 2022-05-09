import http from './httpService';

export function getCartItems() {
  return http.get('/');
}
