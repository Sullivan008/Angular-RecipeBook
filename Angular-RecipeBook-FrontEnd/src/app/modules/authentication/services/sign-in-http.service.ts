import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInRequestModel } from '../models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class SignInHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/Authentication`;
  }

  public signIn(requestModel: SignInRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/SignIn`;

    return this.http.post(requestUrl, requestModel);
  }
}
