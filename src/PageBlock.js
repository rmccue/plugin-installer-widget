import React from 'react';

import './PageBlock.css';

export default function PageBlock( props ) {
	return <div className={ `PageBlock ${ props.className }` }>
		<div className="PageBlock-inner">
			{ props.children }
		</div>
	</div>;
}
