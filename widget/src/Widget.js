import Component from 'inferno-component';

import discover from './discover';
import Icon from './Icon';

import './Widget.css';

const STATE = {
	WAIT:        'WAIT',
	LOADING:     'LOADING',
	REDIRECTING: 'REDIRECTING',
	NOT_FOUND:   'NOT_FOUND',
};

export default class Widget extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			url: '',
			status: STATE.WAIT,
			site: null,
		};
	}

	onStart( e ) {
		e.preventDefault();

		this.setState( { status: STATE.LOADING } );

		const onSuccess = manifest => this.onSuccess( manifest );
		const onFail = e => {
			console.log( e );
			this.setState( { status: STATE.NOT_FOUND } );
		};

		let url = this.state.url;
		if ( url.startsWith( 'http://' ) || url.startsWith( 'https://' ) ) {
			discover( url )
				.then( onSuccess );
			return;
		}

		// Try HTTPS first:
		try {
			discover( `https://${ url }` )
				.then( onSuccess )
				.catch( e => {
					// Try with HTTP as a fallback.
					discover( `http://${ url }` )
						.then( onSuccess )
						.catch( onFail );
				} );
		} catch ( e ) {
			onFail( e );
		}
	}

	onSuccess( manifest ) {
		const { slug } = this.props;

		this.setState( {
			status: STATE.REDIRECTING,
			site: manifest,
		} );

		const site_url = manifest.index.url;

		const url = `${ site_url }/wp-admin/plugin-install.php?tab=search&type=term&s=${ slug }`;

		if ( window.top ) {
			window.top.location = url;
		} else {
			window.location = url;
		}
		// console.log( `Redirecting to ${ url }…` );
	}

	render( props ) {
		const { dark, name } = this.props;
		const { status, url } = this.state;

		return <form
			className={ dark ? 'Widget dark' : 'Widget' }
			novalidate
			onSubmit={ e => this.onStart( e ) }
		>
			<p>To install { name }, enter your WordPress URL:</p>
			{ ( status === STATE.WAIT || status === STATE.NOT_FOUND ) ?
				<div>
					<div className="Widget-form">
						<label>
							<span>URL:</span>
							<input
								placeholder="ma.tt"
								type="text"
								value={ url }
								onChange={ e => this.setState( { url: e.target.value } ) }
							/>
						</label>
						<button
							type="submit"
						>
							<Icon type="admin-plugins" />
							<span>Install</span>
						</button>
					</div>
					{ status === STATE.NOT_FOUND ?
						<p className="Widget-not-found">Unable to find your WordPress site. Make sure you're running WordPress 4.7+.</p>
					: null }
				</div>
			: status === STATE.LOADING ?
				<div className="Widget-status">
					<Icon type="welcome-view-site" />
					<p>Looking for your WordPress install at <code>{ this.state.url }</code>…</p>
				</div>
			: status === STATE.REDIRECTING ?
				<div className="Widget-status">
					<Icon type="dashboard" />
					<p>Loading Dashboard for <em>{ this.state.site.index.name }</em>…</p>
				</div>
			: null }
		</form>;
	}
}
