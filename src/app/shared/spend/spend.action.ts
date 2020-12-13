import { createAction, props } from '@ngrx/store';
import { Spend } from './spend.model';

export const list = createAction(
    '[Spend] list',
);

export const listSuccess = createAction(
    '[Spend] list success',
    props<{
        payload: Spend[],
    }>()
);

export const listFail = createAction(
    '[Spend] list fail',
    props<{
        error: string,
    }>()
);

export const add = createAction(
    '[Spend] add',
    props<{
        payload: Spend;
    }>()
);

export const addSuccess = createAction(
    '[Spend] add success',
    props<{
        previous: {
            payload: Spend;
        },
        payload: Spend,
    }>()
);

export const addFail = createAction(
    '[Spend] add fail',
    props<{
        previous: {
            payload: Spend;
        },
        error: string,
    }>()
);

export const remove = createAction(
    '[Spend] remove',
    props<{
        payload: Spend;
    }>()
);

export const removeSuccess = createAction(
    '[Spend] remove success',
    props<{
        previous: {
            payload: Spend;
        },
    }>()
);

export const removeFail = createAction(
    '[Spend] remove fail',
    props<{
        previous: {
            payload: Spend;
        },
        error: string,
    }>()
);
