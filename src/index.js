import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const render = Root => ReactDOM.render(
	<Root />,
	document.getElementById( 'root' )
);

render( App );

if ( module.hot ) {
	module.hot.accept( './App', () => {
		import( './App' ).then( nextModule => render( nextModule.default ) );
	} );
}
