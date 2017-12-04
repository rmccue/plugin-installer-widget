import { stripIndent } from 'common-tags'
import { stringify } from 'qs';
import React, { Component } from 'react';

import Footer from './Footer';
import Header from './Header';
import ConfigForm from './ConfigForm';

import './App.css';

const DEFAULTS = {
	slug: 'rest-oauth',
	name: 'REST OAuth',
};

const WIDGET_URL = `${ window.location.origin }/widget/`;

export default class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			params: {
				slug: '',
				name: '',
			},
		};
	}

	onResetPreview() {
		if ( ! this.iframeWrapper ) {
			return;
		}

		const iframe = this.iframeWrapper.querySelector( 'iframe' );
		iframe.src = iframe.src;
	}

	getURL() {
		const params = { ...this.state.params };
		if ( ! params.slug ) {
			params.slug = DEFAULTS.slug;
		}
		if ( ! params.name ) {
			params.name = DEFAULTS.name;
		}

		return `${ WIDGET_URL }?${ stringify( params ) }`;
	}

	getCode() {
		return stripIndent`
		<iframe
			src="${ this.getURL() }"
			style="border: none; width: 600px"
			title="WordPress Plugin Installer"
		></iframe>
		`;
	}

	render() {
		const { dark } = this.state.params;

		return <div className="App">
			<Header
				widgetURL={ WIDGET_URL }
			/>

			<h2>Build Your Own</h2>
			<ConfigForm
				className="App-block"
				defaults={ DEFAULTS }
				params={ this.state.params }
				onChange={ params => this.setState( { params } ) }
			/>

			<div className={ dark ? 'App-preview dark' : 'App-preview' }>
				<div className="App-preview-title">
					<h2>Preview</h2>
					<button
						onClick={ () => this.onResetPreview() }
						type="button"
					>Reset</button>
				</div>
				<div
					dangerouslySetInnerHTML={ { __html: this.getCode() } }
					ref={ ref => this.iframeWrapper = ref }
				/>
				{ dark ?
					<small className="App-preview-bg-note">
						<p>Dark background shown for preview purposes only.</p>
					</small>
				: null }
			</div>

			<h2>Your Code</h2>
			<div className="App-block App-copy-code">
				<textarea
					readOnly
					value={ this.getCode() }
				/>

				<p>
					Need more customisation?
					{ ' ' }
					<a href="https://github.com/rmccue/plugin-installer-widget">Host your own</a>.
				</p>
			</div>

			<Footer />
		</div>;
	}
}
