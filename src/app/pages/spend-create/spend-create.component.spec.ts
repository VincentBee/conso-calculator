import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spend, SpendCategory, SpendFrequency } from '../../shared/spend/spend.model';
import { SpendService } from '../../shared/spend/spend.service';
import { SpendCreateComponent } from './spend-create.component';

describe('The spend create component', () => {

    let component: SpendCreateComponent;
    let fixture: ComponentFixture<SpendCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
            ],
            declarations: [
                SpendCreateComponent,
            ],
            providers: [
                { provide: SpendService, useValue: { create: () => { }, } }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpendCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should send a new Spend object when submit.', () => {

        // GIVEN
        const expectedSpend = new Spend('test', 123, SpendFrequency.DAILY, SpendCategory.BIKE_INSURANCE);
        const spendServiceSpy = spyOn(TestBed.inject(SpendService), 'create').and.callThrough();
        component.form.patchValue({
            name: 'test',
            amount: 123,
            frequency: SpendFrequency.DAILY,
            category: SpendCategory.BIKE_INSURANCE
        });

        // WHEN
        component.submit();

        // THEN
        expect(spendServiceSpy).toHaveBeenCalledWith(expectedSpend);
    });
});
