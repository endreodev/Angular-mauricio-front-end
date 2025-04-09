import { ApplicationConfig,  provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient,  provideHttpClient,  withInterceptorsFromDi} from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter,  withComponentInputBinding,  withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      SweetAlert2Module.forRoot()
    ),
  ],
};