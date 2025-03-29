import { Injectable } from "@angular/core";
import moment from "moment";
import { EXPIRES_AT, ID_TOKEN } from "../shared/constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    setLocalStorage(responseObj: any) {
        const expiresAt = moment().add(responseObj.expiresIn, "s");
        localStorage.setItem(ID_TOKEN, responseObj.token);
        localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem(ID_TOKEN);
        localStorage.removeItem(EXPIRES_AT);
    }

    getExpiration() {
        const expiration = localStorage.getItem(EXPIRES_AT);
        return expiration ? moment(JSON.parse(expiration)) : null;
    }

    public isLoggedIn() {
        let isLoggedIn = false;
        const expiration = this.getExpiration();
        if (expiration) {
            isLoggedIn = moment().isBefore(expiration);
        }

        return isLoggedIn;
    }
    
    isLoggedOut() {
        return !this.isLoggedIn();
    }
}