import { Injectable } from '@angular/core';
import { Spend, SpendCategory, SpendFrequency } from '../spend/spend.model';

@Injectable()
export class SavingService {
    private savingMapping = {
        [SpendCategory.CAR_INSURANCE]: 10,
        [SpendCategory.MUTUAL]: 30,
        [SpendCategory.HOUSE_INSURANCE]: 1,
        [SpendCategory.GAS_ELECTRICITY]: 4,
        [SpendCategory.BIKE_INSURANCE]: 12,
        [SpendCategory.LOAN_INSURANCE]: 0,
    };

    public calculateSaving(spend: Spend): number {
        if (spend.category === undefined) {
            return 0;
        }

        switch (spend.frequency) {
            case SpendFrequency.DAILY:
                return ((spend.amount * 365) * this.savingMapping[spend.category] / 100) / 356;
            case SpendFrequency.WEEKLY:
                return ((spend.amount * 52) * this.savingMapping[spend.category] / 100) / 52;
            case SpendFrequency.MONTHLY:
                return ((spend.amount * 12) * this.savingMapping[spend.category] / 100) / 12;
            case SpendFrequency.YEARLY:
                return spend.amount * this.savingMapping[spend.category] / 100;
            default:
                return 0;
        }
    }

    public calculateGlobalSaving(spend: Spend): number {
        if (spend.category === undefined) {
            return 0;
        }

        switch (spend.frequency) {
            case SpendFrequency.DAILY:
                return ((spend.amount * 365) * this.savingMapping[spend.category] / 100);
            case SpendFrequency.WEEKLY:
                return ((spend.amount * 52) * this.savingMapping[spend.category] / 100);
            case SpendFrequency.MONTHLY:
                return ((spend.amount * 12) * this.savingMapping[spend.category] / 100);
            case SpendFrequency.YEARLY:
                return spend.amount * this.savingMapping[spend.category] / 100;
            default:
                return 0;
        }
    }

}
