import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Spend, SpendCategory, SpendFrequency } from '../../shared/spend/spend.model';
import { SpendService } from '../../shared/spend/spend.service';

@Component({
    selector: 'app-spend-table',
    templateUrl: './spend-table.component.html',
    styleUrls: ['./spend-table.component.scss']
})
export class SpendTableComponent implements OnChanges, AfterViewInit {
    readonly COLUMNS: string[] = ['name', 'category', 'amount', 'frequency', 'save', 'actions'];
    readonly SpendCategory = SpendCategory;
    readonly SpendFrequency = SpendFrequency;
    @Input() spends: Spend[] = [];
    @ViewChild(MatSort) sort?: MatSort;
    public dataSource?: MatTableDataSource<Spend>;

    constructor(
        private spendService: SpendService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.spends) {
            this.dataSource = new MatTableDataSource(changes.spends.currentValue);
            if (this.sort) {
                this.dataSource.sort = this.sort;
            }
        }
    }

    ngAfterViewInit() {
        if (this.sort && this.dataSource) {
            this.dataSource.sort = this.sort;
        }
    }

    public delete(element: Spend): void {
        this.spendService.remove(element);
    }
}
