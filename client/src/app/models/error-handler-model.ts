import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export abstract class HttpErrorHandler{
    constructor(private router: Router){}

    protected handleError(errorMessage : string = "Page not found"){
        return (error: HttpErrorResponse) : Observable<never> =>{
            if(error.error instanceof ErrorEvent){
                console.log("An error occured: ", error.error.message);
            }else{

                this.router.navigate([
                    '/error',
                    {message: errorMessage},
                ]);

            }

            return throwError("Something happened. Please try again later!");
        }
    }
}