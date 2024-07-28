import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { CreateJobAdsDto } from '../domain/dto/create-job-ads.dto';
import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { environment } from '../../../environments/environment.development';
import { handlerHttpError } from '../utility/http-handle-error';

@Injectable({
    providedIn: 'root',
})
export class JobAdService {
    endpoint = environment.endpoint;

    constructor(
        private readonly http: HttpClient,
        private readonly storageService: StorageService,
    ) {}

    createJobAd(body: CreateJobAdsDto): Observable<unknown> {
        const employerId = this.storageService.getEmployerIdentity();
        return this.http
            .post(`${this.endpoint}/employer/job-ads/${employerId}`, body)
            .pipe(catchError((error: HttpErrorResponse) => handlerHttpError(error)));
    }
}
