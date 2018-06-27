// Grab http
const https = require( 'https' )
const http = require( 'http' )

const title = url => new Promise( ( resolve, reject ) => {

	const handler = response => { 
		const { statusCode } = response
		let appendedbody = ''
		if ( statusCode !== 200 ) reject( `Failed request, status: ${ statusCode }` )
		response.setEncoding( 'utf8' )
		response.on( 'data', body => { 
			appendedbody += body
		} )
		response.on( 'end', f => resolve( appendedbody.match( /<title>(.*?)<\/title>/)[1] ) )
	 }

	url.indexOf( 'https' ) != -1 ? https.get( url, handler ) : http.get( url, handler )

} )

module.exports = title