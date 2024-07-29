import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { CreateJobAdsDto } from '../domain/dto/create-job-ads.dto';
import { HttpResponseEntity } from '../domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { JobAds } from '../domain/entities/job-ads';
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

    findJobAdsByEmployerId(status: string): Observable<JobAds[]> {
        const employerId = this.storageService.getEmployerIdentity();
        return this.http
            .get<
                HttpResponseEntity<JobAds[]>
            >(`${this.endpoint}/employer/job-ads/${employerId}?status=${status}`)
            .pipe(
                map((response) => response.data),
                catchError((error: HttpErrorResponse) => handlerHttpError(error)),
            );
    }
}
