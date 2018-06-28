// I made the below title grabber before I realised the SMMRY api returns the title as well
// const title = require( `${__dirname}/modules/title.js` )

const tldr = require( `${__dirname}/modules/tldr.js` )
const htmlify = require(`${__dirname}/modules/htmlify.js` )
const fs = require( 'fs' ).promises

const data = { 
	input: `${__dirname}/INPUT`,
	output: `${__dirname}/OUTPUT-${new Date}.html`,
	archive: `${__dirname}/archive/input-${new Date}.old`
}

// Read links from file
fs.readFile( data.input, 'utf8' )
// Turn string into array
.then( linkstring => linkstring.split( '\n' ) )
// Split url/cat strings into objects
.then( linkarray => linkarray.map( link => { 
	const split = link.split( ' ' )
	return { 
		url: split[0],
		category: split[1] || 'General'
	}
} ) )
// Grab the summary of the links through the SMMRY and Youtube API
.then( links => Promise.all( links.map( link => tldr( link ) ) ) )
// Make html
.then( htmlify )
// Write outcome to file
.then( html => fs.writeFile( data.output, html ) )
// Take inout file and move it to archive
.then( f => fs.rename( data.input, data.archive ) )
// Complain to the console on fail
.catch( console.log.bind( console ) )