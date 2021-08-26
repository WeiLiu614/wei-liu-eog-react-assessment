import { takeEvery, call } from "redux-saga/effects";
import { toast } from "react-toastify";

function* errorReceived(action) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchError() {
  yield takeEvery("ERROR_RECEIVED", errorReceived);
}

export default [watchError];