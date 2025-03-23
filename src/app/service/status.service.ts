// status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

interface EndpointStatus {
  id: string;
  url: string;
  status: 'loading' | 'success' | 'error' | 'idle';
  lastUpdated?: Date;
  error?: any;
}

@Injectable({ providedIn: 'root' })
export class StatusService {
  private endpointsStatus = new BehaviorSubject<EndpointStatus[]>([]);
  private endpoints: EndpointStatus[] = [];

  constructor(private http: HttpClient) {}

  initializeEndpoints(endpoints: string[]): void {
    this.endpoints = endpoints.map(url => ({
      id: this.generateId(url),
      url,
      status: 'idle'
    }));
    this.endpointsStatus.next([...this.endpoints]);
  }

  checkAllEndpoints(): void {
    this.endpoints = this.endpoints.map(ep => ({
      ...ep,
      status: 'loading',
      lastUpdated: new Date(),
      error: null
    }));
    this.endpointsStatus.next([...this.endpoints]);

    const requests = this.endpoints.map(ep =>
      this.http.get(ep.url).pipe(
        tap(() => this.updateStatus(ep.id, 'success')),
        catchError(error => {
          this.updateStatus(ep.id, 'error', error);
          return of(null);
        }),
        finalize(() => {
          // Atualizações finais se necessário
        })
      )
    );

    forkJoin(requests).subscribe();
  }

  getStatusUpdates(): Observable<EndpointStatus[]> {
    return this.endpointsStatus.asObservable();
  }

  private updateStatus(id: string, status: 'success' | 'error', error?: any): void {
    this.endpoints = this.endpoints.map(ep =>
      ep.id === id
        ? { ...ep,
            status,
            lastUpdated: new Date(),
            error: status === 'error' ? error : null
          }
        : ep
    );
    this.endpointsStatus.next([...this.endpoints]);
  }

  private generateId(url: string): string {
    return url.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }
}
