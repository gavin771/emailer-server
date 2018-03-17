import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';
import 'materialize-css/dist/css/materialize.min.css'
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//registerServiceWorker();

//console.log(process.env.REACT_APP_STRIPE_KEY)