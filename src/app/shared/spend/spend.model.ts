export enum SpendFrequency {
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY,
}

export enum SpendCategory {
    CAR_INSURANCE,
    MUTUAL,
    HOUSE_INSURANCE,
    GAS_ELECTRICITY,
    BIKE_INSURANCE,
    LOAN_INSURANCE
}

export class Spend {
    constructor(
        public name: string,
        public amount: number,
        public frequency: SpendFrequency,
        public category?: SpendCategory,
        public id?: number,
    ) { }
}
