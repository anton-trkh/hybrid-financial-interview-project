import { configureStore } from "@reduxjs/toolkit"
import transactionTable from "./expensesSlice";
import createSagaMiddleware from "redux-saga";
import { persistDataOnAdd, persistDataOnModify, persistDataOnRemove } from "../sagas/persistanceSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        transactionTable
    }, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(sagaMiddleware),
});
sagaMiddleware.run(persistDataOnAdd);
sagaMiddleware.run(persistDataOnModify);
sagaMiddleware.run(persistDataOnRemove);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;