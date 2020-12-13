import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('The app component', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatIconModule,
                MatToolbarModule,
            ],
            declarations: [
                AppComponent,
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('Should be instanciated correctly.', () => {

        // WHEN
        fixture.detectChanges();

        // THEN
        expect(component).toBeDefined();
    });
});
