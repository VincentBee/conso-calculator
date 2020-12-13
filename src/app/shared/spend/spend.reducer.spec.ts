import { addSuccess } from './spend.action';
import { Spend, SpendCategory, SpendFrequency } from './spend.model';
import { spendReducer, SpendState } from './spend.reducer';

describe('Spend reducer.', () => {
    let state: SpendState;

    beforeEach(() => {
        state = {
            list: [],
            loading: false,
        };
    });

    it('Should be able to add a spend object to the list.', () => {

        // GIVEN
        const spend = new Spend('test', 123, SpendFrequency.DAILY, SpendCategory.BIKE_INSURANCE);
        const spendSuccess = new Spend('test', 123, SpendFrequency.DAILY, SpendCategory.BIKE_INSURANCE, 1);
        const action = addSuccess({
            previous: {
                payload: spend
            },
            payload: spendSuccess
        })

        // WHEN
        state = spendReducer(state, action);

        // THEN
        expect(state.list).toEqual([
            spendSuccess
        ]);
        expect(state.loading).toBeFalsy();
    });
});
