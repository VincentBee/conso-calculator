import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { list } from './shared/spend/spend.action';
import { SpendListComponent } from './pages/spend-list/spend-list.component';
import { SpendCreateComponent } from './pages/spend-create/spend-create.component';
import { spendReducer } from './shared/spend/spend.reducer';
import { RANDOM_ID, SpendEffects } from './shared/spend/spend.effect';
import { SpendFormComponent } from './parts/spend-form/spend-form.component';
import { SpendTableComponent } from './parts/spend-table/spend-table.component';
import { SavingService } from './shared/saving/saving.service';
import { SpendService } from './shared/spend/spend.service';

registerLocaleData(localeFr, 'fr');

export function InitSpendList(store: Store) {
    return () => store.dispatch(list());
}

const routes: Routes = [
    { path: '', component: SpendListComponent },
    { path: 'create', component: SpendCreateComponent },
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSortModule,
        MatMenuModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        StoreModule.forRoot({
            spend: spendReducer
        }),
        EffectsModule.forRoot([
            SpendEffects,
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production
        }),
    ],
    declarations: [
        AppComponent,
        SpendCreateComponent,
        SpendListComponent,
        SpendFormComponent,
        SpendTableComponent,
    ],
    providers: [
        SavingService,
        SpendService,
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: APP_INITIALIZER, useFactory: InitSpendList, deps: [Store], multi: true },
        { provide: RANDOM_ID, useFactory: () => () => Math.floor(Math.random() * Math.floor(10000)) },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
