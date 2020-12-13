import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpendService } from '../../shared/spend/spend.service';
import { SavingService } from '../../shared/saving/saving.service';
import { Spend } from '../../shared/spend/spend.model';

@Component({
    selector: 'app-spend-list',
    templateUrl: './spend-list.component.html',
    styleUrls: ['./spend-list.component.scss']
})
export class SpendListComponent implements OnDestroy {
    public spends: Spend[] = [];
    public loading = false;
    public totalPerMonth$?: Observable<number>;
    public totalPerYear$?: Observable<number>;
    public totalSave = 0;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor (
        private spendService: SpendService,
        private saveService: SavingService,
    ) {
        this.spendService.loadingList$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(loadingList => {
            let totalSave = 0;
            this.loading = loadingList.loading;
            this.spends = loadingList.list.map(item => {
                totalSave += this.saveService.calculateGlobalSaving(item);
                return {
                    ...item,
                    save: this.saveService.calculateSaving(item),
                };
            });
            this.totalSave = totalSave;
        });

        this.totalPerMonth$ = this.spendService.totalPerMonth$;
        this.totalPerYear$ = this.spendService.totalPerYear$;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
