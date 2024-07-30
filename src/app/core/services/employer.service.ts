import { Observable, map } from 'rxjs';

import { Address } from '../domain/entities/address';
import { Company } from '../domain/entities/company';
import { CompanyDto } from '../domain/dto/create-company.dto';
import { CreateAddressDto } from '../domain/dto/create-address.dto';
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

    createAddress(companyId: string, body: CreateAddressDto): Observable<Address> {
        return this.http
            .post<
                HttpResponseEntity<Address>
            >(`${this.endpoint}/employer/address/${companyId}`, body)
            .pipe(map((response) => response.data));
    }

  createCompany(employerId: string, body: CompanyDto): Observable<Company> {
    return this.http
      .post<
        HttpResponseEntity<Company>
      >(`${this.endpoint}/employer/company/${employerId}`, body)
      .pipe(map((response) => response.data));
  }
}
