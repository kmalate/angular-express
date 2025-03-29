import { HttpInterceptorFn } from "@angular/common/http";
import { ID_TOKEN } from "../shared/constants";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {    
    const idToken = localStorage.getItem(ID_TOKEN);

    if (idToken) {
        const authReq = req.clone({
            setHeaders: {
              Authorization: idToken
            }
          });

          return next(authReq);
    }

    return next(req);    
};

/*
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem(ID_TOKEN);

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", idToken),
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

*/