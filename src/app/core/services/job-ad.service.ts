import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { CreateJobAdsDto } from '../domain/dto/create-job-ads.dto';
import { HttpResponseMessageEntity } from '../domain/entities/http-response-entity';
import { Injectable } from '@angular/core';
import { JobAds } from '../domain/entities/job-ads';
import { StorageService } from '../../shared/services/storage.service';
import { UpdateJobAdStatusDto } from '../domain/dto/update-job-ads-status.dto';
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

    findJobAdsByEmployerId(employerId: string, status: string): Observable<JobAds[]> {
        const endpoint = `${this.endpoint}/employer/job-ads/status`;
        const params = new HttpParams().set('employerId', employerId).set('status', status);

        return this.http.get<any>(endpoint, { params }).pipe(
            map((response) => response.data),
            catchError((error: HttpErrorResponse) => handlerHttpError(error)),
        );
    }

    updateJobAdStatus(
        jobAdsId: string,
        body: UpdateJobAdStatusDto,
    ): Observable<HttpResponseMessageEntity> {
        const endpoint = `${this.endpoint}/employer/job-ads/${jobAdsId}/status`;
        return this.http
            .patch<HttpResponseMessageEntity>(endpoint, body)
            .pipe(catchError((error: HttpErrorResponse) => handlerHttpError(error)));
    }
}
