import { collection } from '../constants';
import { collectService } from '../service';

export const collectAction = {
  getNasaList,
}

function getNasaList(params) {
  return dispatch => {
    dispatch(request());
    collectService.getCollectionBySearch(params)
      .then(
        listData => dispatch(success(listData)),
        error => dispatch(failure(error))
      );
    };
    
    function request() { return { type: collection.REQUEST_NASA } }
    function success(listData) { return { type: collection.REQUEST_NASA_SUCCESS, listData } }
    function failure(error) { return { type: collection.REQUEST_NASA_FAIL, error } }
}