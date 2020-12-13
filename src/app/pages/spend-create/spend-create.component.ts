import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpendService } from '../../shared/spend/spend.service';
import { Spend } from '../../shared/spend/spend.model';

@Component({
    selector: 'app-spend-create',
    templateUrl: './spend-create.component.html',
    styleUrls: ['./spend-create.component.scss']
})
export class SpendCreateComponent {
    public form = new FormControl();

    constructor (
        private spendService: SpendService
    ) { }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.spendService.create(new Spend(
            this.form.value.name,
            this.form.value.amount,
            this.form.value.frequency,
            this.form.value.category
        ))
    }
}
