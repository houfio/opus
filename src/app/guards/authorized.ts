import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export function authorized() {
  return redirectUnauthorizedTo(['login']);
}
