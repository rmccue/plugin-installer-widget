import React from 'react';

import Icon from './Icon';
import PageBlock from './PageBlock';

import './Footer.css';

export default function Footer( props ) {
	return <PageBlock className="Footer">
		<p className="Header-powered-by">
			Built for you with <Icon type="heart" /> by Ryan McCue.
			{ ' ' }
			<a href="https://github.com/rmccue/plugin-installer-widget">Licensed under the GPL.</a>
		</p>
	</PageBlock>;
}
