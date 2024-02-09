import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './redux-toolkit/store.js'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </ChakraProvider>
  ,
)
