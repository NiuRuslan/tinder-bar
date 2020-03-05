import Slider from "../src/components/slider/Slider"

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import {Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';

ReactDOM.render( <CookiesProvider><Provider store={store}><App /> </Provider></CookiesProvider>, document.getElementById('root'));
