import { Observable, map } from 'rxjs';

import { Employer } from '../domain/entities/employer';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  endpoint = environment.endpoint;

  constructor(
    private readonly http: HttpClient,
  ) { }

  findEmployer(id: string): Observable<Employer> {
    return this.http.get<HttpResponseEntity<Employer>>(`${this.endpoint}/employer/${id}`)
      .pipe(map((response) => response.data));
  }

}
