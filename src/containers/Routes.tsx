import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ExpensesTable from './ExpensesTable';
import AppMenu from './AppMenu';
import ExpensesSummary from './ExpensesSummary';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { persistance } from '../types/constants';
import Expense from '../types/expense';
import { set } from '../state/expensesSlice';

export default function Routes() {
    const dispatch = useDispatch();
    useEffect(() => {
      const persistedData = localStorage.getItem(persistance)
      if (persistedData) {
        const parsedData: Expense[] = JSON.parse(persistedData).transactions;
        dispatch(set(parsedData));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Router>
            <AppMenu />
            <Switch> 
                <Route exact path="/">
                    <ExpensesTable />
                </Route>
                <Route path="/summary">
                    <ExpensesSummary />
                </Route>
            </Switch>
        </Router>
    );
}