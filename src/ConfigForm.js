import React from 'react';

import './ConfigForm.css';

export default function ConfigForm( props ) {
	const { className, dark, defaults, name, slug, onChange } = props;

	return <form className={ `ConfigForm ${ className }` }>
		<label>
			<span>Display name:</span>
			<input
				placeholder={ defaults.name }
				type="text"
				value={ name }
				onChange={ e => onChange( { name: e.target.value } ) }
			/>
		</label>
		<label>
			<span>Plugin slug:</span>
			<input
				placeholder={ defaults.slug }
				className="code"
				type="text"
				value={ slug }
				onChange={ e => onChange( { slug: e.target.value } ) }
			/>
		</label>
		<label>
			<span>Dark mode:</span>
			<input
				type="checkbox"
				value={ !! dark }
				onChange={ e => onChange( { dark: e.target.checked ? true : undefined } ) }
			/>
			Use light text colour?
		</label>
	</form>;
}
