import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { SpendTableComponent } from './spend-table.component';
import { Spend, SpendCategory, SpendFrequency } from '../../shared/spend/spend.model';
import { SpendService } from '../../shared/spend/spend.service';

describe('The spend table component', () => {

    @Component({
        selector: 'app-test-component',
        template: `<app-spend-table [spends]="spends"></app-spend-table>`
    })
    class TestComponent {
        public spends: Spend[] = [];
    }

    let wrapperComponent: TestComponent;
    let testedComponent: SpendTableComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatTableModule,
                MatSortModule,
                MatMenuModule,
            ],
            declarations: [
                SpendTableComponent,
                TestComponent,
            ],
            providers: [
                { provide: SpendService, useValue: { remove: () => { }, } }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        wrapperComponent = fixture.componentInstance;
        testedComponent = fixture.debugElement.query(By.directive(SpendTableComponent)).componentInstance;
        fixture.detectChanges();
    });

    it('Should display the list of spend.', () => {

        // WHEN
        wrapperComponent.spends = [
            { id: 1, name: 'test1', amount: 1, frequency: SpendFrequency.DAILY, category: SpendCategory.BIKE_INSURANCE },
            { id: 2, name: 'test2', amount: 2, frequency: SpendFrequency.MONTHLY, category: SpendCategory.HOUSE_INSURANCE },
        ];

        // THEN
        fixture.detectChanges();
        const tableRows = fixture.nativeElement.querySelectorAll('.mat-table .mat-row');
        expect(tableRows.length).toEqual(2);

        const firstRow = tableRows[0];
        expect(firstRow.children[0].innerHTML).toContain('test1');

        const secondRow = tableRows[1];
        expect(secondRow.children[0].innerHTML).toContain('test2');
    });
});
