import './App.css'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { router } from './routes';
import MessageToast from './components/MessageToast';

function App() {
  return (
    <Provider store={store}>
      <MessageToast />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
