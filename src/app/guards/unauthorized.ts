import { redirectLoggedInTo } from '@angular/fire/auth-guard';

export function unauthorized() {
  return redirectLoggedInTo(['']);
}
