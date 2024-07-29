import { Observable, map } from 'rxjs';

import { Employer } from '../domain/entities/employer';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { UpdateAccountNameDto } from '../domain/dto/update-account-name.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class EmployerService {
    endpoint = environment.endpoint;

    constructor(
        private readonly http: HttpClient,
        private readonly storageService: StorageService,
    ) {}

    findEmployer(id: string): Observable<Employer> {
        return this.http
            .get<HttpResponseEntity<Employer>>(`${this.endpoint}/employer/${id}`)
            .pipe(map((response) => response.data));
    }

    updateAccountName(body: UpdateAccountNameDto): Observable<unknown> {
        const employerId = this.storageService.getEmployerIdentity();
        return this.http.patch(`${this.endpoint}/employer/${employerId}`, body);
    }

    uploadLogo(companyId: string, image: FormData): Observable<unknown> {
        const token = this.storageService.getAccessToken();
        return this.http.post<unknown>(
            `${this.endpoint}/employer/upload/logo/${companyId}`,
            image,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    }

    uploadHeader(companyId: string, image: FormData): Observable<unknown> {
        const token = this.storageService.getAccessToken();
        return this.http.post<unknown>(
            `${this.endpoint}/employer/upload/header/${companyId}`,
            image,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    }
}
