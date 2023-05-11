import { Injectable } from '@angular/core';

const USER_KEY = 'pmi-secret-key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    // const date = new Date();

    // // Set it expire in -1 days
    // date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    // document.cookie =
    //   USER_KEY + '=; expires=' + date.toUTCString() + '; path=/';

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: any): void {
    // const date = new Date();
    // const cookie = token;

    // // Set it expire in 1 days
    // date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);

    // document.cookie =
    //   USER_KEY + '=' + cookie + '; expires=' + date.toUTCString() + '; path=/';

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(token));
  }

  public getAccessToken(): any {
    // const cookie = '; ' + document.cookie;
    // const parts: any = ([] = cookie.split('; ' + USER_KEY + '='));

    // if (parts.length == 2) {
    //   return parts.pop().split(';').shift();
    // } else {
    //   return null;
    // }

    const token = window.sessionStorage.getItem(USER_KEY);
    if (token !== null) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  public getIsLogged(): boolean {
    const token = this.getAccessToken();
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  }
}