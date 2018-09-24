const YT = require( 'simple-youtube-api' )
const youtube = new YT( process.env.ytkey )

const grabinfo = url => url ? youtube.getVideoByID( url.match( /(v=)(.*)(\&)*/ )[2] ) : console.log( 'Url evaluated to undefined', url )

module.exports = grabinfo