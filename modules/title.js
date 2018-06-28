// Grab http
const https = require( 'https' )
const http = require( 'http' )

// Input: String url
// Output: { url: String, title: String }

const title = url => new Promise( ( resolve, reject ) => {

	const handler = response => { 

		// Prepare variables and set encoding
		const { statusCode } = response
		let appendedbody = ''
		response.setEncoding( 'utf8' )

		// If failure, reject with the status code
		if ( statusCode !== 200 ) reject( `Failed request, status: ${ statusCode }` )
		
		// Append data to the body string as we go along
		response.on( 'data', body => appendedbody += body )

		// When done, resolve with the object
		response.on( 'end', f => resolve( { 
			url: url,
			title: appendedbody.match( /<title>(.*?)<\/title>/)[1]
		} ) )
	 }

	// Use the right protocol for the right url
	url.indexOf( 'https' ) != -1 ? https.get( url, handler ) : http.get( url, handler )

} )

module.exports = title