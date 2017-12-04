import { render } from 'inferno';
import Widget from './Widget';
import './index.css';

const currentURL = new URL( window.location );
const props = {
	dark: currentURL.searchParams.has( 'dark' ),
	name: currentURL.searchParams.get( 'name' ),
	slug: currentURL.searchParams.get( 'slug' ),
};

if ( ! props.name ) {
	console.warn( 'Missing name parameter in URL.' );
}
if ( ! props.slug ) {
	console.warn( 'Missing slug parameter in URL.' );
}

render(
	<Widget { ...props } />,
	document.getElementById( 'app' )
);

if ( module.hot ) {
	module.hot.accept( './Widget', () => {
		import( './Widget' ).then( nextModule => {
			const NextWidget = nextModule.default;
			render(
				<NextWidget { ...props } />,
				document.getElementById( 'app' )
			);
		} );
	} );
}
