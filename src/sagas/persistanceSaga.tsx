import { put, takeLatest } from "redux-saga/effects";
import { add, modify, remove, save } from "../state/expensesSlice";

function* persistData() {
    yield put(save())
}

export function* persistDataOnAdd() {
    yield takeLatest(add.type, persistData)
}
export function* persistDataOnRemove() {
    yield takeLatest(remove.type, persistData)
}
export function* persistDataOnModify() {
    yield takeLatest(modify.type, persistData)
}