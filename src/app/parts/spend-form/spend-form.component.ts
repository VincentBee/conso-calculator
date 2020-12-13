import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpendCategory, SpendFrequency } from '../../shared/spend/spend.model';

@Component({
    selector: 'app-spend-form',
    templateUrl: './spend-form.component.html',
    styleUrls: ['./spend-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SpendFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SpendFormComponent),
            multi: true
        }
    ]
})
export class SpendFormComponent implements ControlValueAccessor, Validator, OnDestroy {
    readonly SpendFrequency = SpendFrequency;
    readonly SpendCategory = SpendCategory;
    public form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required]),
        frequency: new FormControl(null, [Validators.required]),
        category: new FormControl(null, []),
    });
    private _destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.unsubscribe();
    }

    public registerOnChange(fn: (value: any) => {}) {
        this.form.valueChanges.pipe(
            takeUntil(this._destroy$),
        ).subscribe(fn);
    }

    public writeValue(value: any) {
        if (value) {
            this.form.patchValue(value);
        } else {
            this.form.reset();
        }
    }

    public registerOnTouched(_: () => {}) {}

    public validate(_: FormControl) {
        return this.form.valid ? null : { spend: { valid: false } };
    }
}

