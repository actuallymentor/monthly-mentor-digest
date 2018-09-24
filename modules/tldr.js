const tldr = require('smmry')( {
  SM_API_KEY: process.env.smmryapikey,
  SM_LENGTH: 5,
  SM_WITH_ENCODE: true
} )

const youtube = require( `${__dirname}/videos.js` )

// Input: { url: String, category: String }
// Output { url: String, title: String, type: String, category: String tldr: String, length: String, readtime: String/null, duration: String/null }

const gettldr = url => { 

	// If it is not a video
	if( url.url.toLowerCase().indexOf( 'youtube.com/watch' ) == -1 ) return tldr.summarizeUrl( url.url ).then( summary => { 
		// Destructure data
		const { sm_api_content, sm_api_title, sm_api_content_reduced, sm_api_character_count } = summary
		// Length of input in characters
		const length = ( 100 * sm_api_character_count ) / ( 100 - sm_api_content_reduced.match( /\d+/ ) )

		// Return structured data
		// The reading time is an estimate based on me trying to read slow ( 370 wpm ) and converting the demo text to char count
		// Ony apply the below to non-youtube links
		return {
			url: url.url,
			title: sm_api_title,
			type: 'Article',
			category: url.category,
			tldr: sm_api_content,
			length: length,
			readtime: `${Math.floor( length / 2300 )}-${Math.floor( length * 2 / 2300 )} minutes`
		}
	} )
	.catch( err => console.log( url, err ) )

	// If the above didn't match, we are dealing with a video
	return youtube( url.url ).then( video => { 
		const { hours, minutes, seconds } = video.duration
		return { 
			url: `https://youtube.com/watch?v=${video.id}`,
			title: video.title,
			type: 'Video',
			category: url.category,
			tldr: 'VIDEO_CONTENT_MANUALLY_DESCRIBE',
			readtime: null,
			duration: `${ hours ? hours + ' hours and ' + minutes + ' minutes' : minutes + ' minutes'}`
		}
	 } )
	.catch( err => console.log( url, err ) )

}

module.exports = gettldr