import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'test-c9086',
        appId: '1:1084178538565:web:d18799a6bc2549660e432c',
        storageBucket: 'test-c9086.firebasestorage.app',
        apiKey: 'AIzaSyAEO67IDOMt6d69zsReDa7jvmjG3SFjTqQ',
        authDomain: 'test-c9086.firebaseapp.com',
        messagingSenderId: '1084178538565',
        measurementId: 'G-269NEFBN14',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
  ],
};
