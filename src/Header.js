import React from 'react';

import Icon from './Icon';
import PageBlock from './PageBlock';

import './Header.css';

export default function Header( props ) {
	return <PageBlock className="Header">
		<h1><Icon alt="WordPress" type="wordpress" /> Plugin Installer Widget</h1>

		<p>Help users install a plugin on their site. This widget
			automatically finds the WordPress admin for a user, and sends
			them directly to the plugin installer.</p>

		<p>Here's a demo:</p>
		<iframe
			src={ `${ props.widgetURL }?dark=true&slug=gutenberg&name=Gutenberg` }
			style={ { border: 'none', width: 600 } }
			title="WordPress Plugin Installer"
		></iframe>

		<p className="Header-powered-by">
			<Icon type="rest-api" />
			{ ' ' }
			Powered by the WordPress REST API,
			{ ' ' }
			<a href="https://infernojs.org/">Inferno</a>,
			and <a href="https://developer.wordpress.org/resource/dashicons/">Dashicons</a>.
		</p>
		<p className="Header-powered-by">
			Built for you with <Icon type="heart" /> by Ryan McCue.
			{ ' ' }
			<a href="https://github.com/rmccue/plugin-installer-widget">View the source on GitHub.</a>
		</p>
	</PageBlock>;
};
