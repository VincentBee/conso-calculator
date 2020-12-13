import { EventEmitter, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SavingService } from '../../shared/saving/saving.service';
import { SpendFrequency } from '../../shared/spend/spend.model';
import { SpendService } from '../../shared/spend/spend.service';
import { SpendListComponent } from './spend-list.component';

describe('The spend list component', () => {

    let component: SpendListComponent;
    let fixture: ComponentFixture<SpendListComponent>;
    const list = new EventEmitter();
    const totalPerMonth = new EventEmitter();
    const totalPerYear = new EventEmitter();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
            ],
            declarations: [
                SpendListComponent,
            ],
            providers: [
                { provide: SpendService, useValue: {
                    loadingList$: list,
                    totalPerMonth$: totalPerMonth,
                    totalPerYear$: totalPerYear
                } },
                { provide: SavingService, useValue: { calculateGlobalSaving: () => 0, calculateSaving: () => 0 }},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpendListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be able to load the list of spend from the state.', () => {

        // WHEN
        list.emit({
            loading: false,
            list: [
                { id: 1, name: 'test1', amount: 123, frequency: SpendFrequency.DAILY },
                { id: 2, name: 'test2', amount: 123, frequency: SpendFrequency.DAILY },
            ]
        });

        // THEN
        expect(component.spends).toEqual([
            { id: 1, name: 'test1', amount: 123, frequency: SpendFrequency.DAILY, save: 0 },
            { id: 2, name: 'test2', amount: 123, frequency: SpendFrequency.DAILY, save: 0 },
        ]);
    });
});
