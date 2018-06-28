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

fs.readFile( data.input, 'utf8' )
.then( linkstring => linkstring.split( '\n' ) )
.then( linkarray => linkarray.map( link => { 
	const split = link.split( ' ' )
	return { 
		url: split[0],
		category: split[1] || 'General'
	}
} ) )
.then( links => Promise.all( links.map( link => tldr( link ) ) ) )
.then( htmlify )
.then( html => fs.writeFile( data.output, html ) )
.then( f => fs.rename( data.input, data.archive ) )
.catch( console.log.bind( console ) )