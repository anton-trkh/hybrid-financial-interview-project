import { Provider } from 'react-redux'
import './App.css'
import Routes from './containers/Routes'
import store from './state/store'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Provider store={store}>
          <Routes />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
