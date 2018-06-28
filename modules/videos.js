const YT = require( 'simple-youtube-api' )
const youtube = new YT( process.env.ytkey )

const grabinfo = url => youtube.getVideoByID( url.match( /(v=)(.*)(\&)*/ )[2] )

module.exports = grabinfo