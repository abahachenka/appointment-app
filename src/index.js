import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

render(
    <Provider store={ store }>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);