/**
 * A manifest object representing a site.
 *
 * @typedef {object} Manifest
 * @property {string} url - Root URL for the REST API
 * @property {object} authentication - Map of authentication type to authentication details for available auth.
 * @property {string[]} namespaces - Available namespaces.
 * @property {object} index - Raw index data from the site.
 */

/**
 * Discover the REST API from a URL.
 *
 * Runs the auto-discovery mechanism, and finds the API index.
 *
 * @param {string} url URL to run discovery on.
 * @return {Promise.<Manifest>} Promise resolving to a Manifest object, or error if API cannot be found.
 */
export default function discover( url ) {
	const indexUrl = new URL( url );
	indexUrl.search = '?rest_route=/';

	return fetch( indexUrl )
		.then( resp => {
			if ( ! resp.ok ) {
				throw new Error( 'Non-200 from API' );
			}

			return resp.json().then( data => {
				return {
					url: data.routes['/']._links.self,
					authentication: data.authentication,
					namespaces: data.namespaces,
					index: data,
				}
			} )
		} )
		.catch( e => {
			throw new Error( 'Unable to find the REST API' )
		} );
}
