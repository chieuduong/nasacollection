import { fromJS } from 'immutable';
import { collection } from '../constants';

export const initialState = fromJS({
  loading: false,
  nasaList: [],
  errorLog: '',
});

export function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case collection.REQUEST_NASA:
      return state.set('loading', true);
    case collection.REQUEST_NASA_SUCCESS:
      return state.set('loading', false)
      .set('nasaList', action.listData);
    case collection.REQUEST_NASA_FAIL:
      return state.set('loading', false)
      .set('errorLog', action.error);
    default:
      return state;
  }
}
