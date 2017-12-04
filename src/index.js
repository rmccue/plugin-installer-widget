import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = Root => ReactDOM.render(
	<Root />,
	document.getElementById( 'root' )
);

render( App );

registerServiceWorker();

if ( module.hot ) {
	module.hot.accept( './App', () => {
		import( './App' ).then( nextModule => render( nextModule.default ) );
	} );
}
