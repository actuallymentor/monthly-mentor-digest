const tldr = require( 'smmry' )
const title = require( `${__dirname}/modules/title.js` )

title( 'https://www.skillcollector.com/post/i-didnt-eat-for-105-hours-science-benefits/' )
.then( console.log.bind( console ) )
.catch( console.log.bind( console ) )