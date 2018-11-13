// Input: Array { url: String, title: String, tldr: String }
// Output: String

// Termplate for <li>'s
const listtemplate = page => { 
	const domain = page.url.match( /(\/\/www\.|\/\/)(.*?)(\.)/ )[2]

	// If tldr failed, simplify
	if( !page.tldr ) return `\n<li>
		<b>TITLE</b> - MENTOR_NOTES_HERE - (<a href="${page.url}">link on <span style="text-transform: capitalize">${ domain }</span></a>)<br><br>
	 </li>\n`

	if( page.type.toLowerCase() == 'shopping' ) return `\n<li>
		<b>[ Product ] ${ page.title }</b> - MENTOR_NOTES_HERE
		 - ${ page.tldr && `<i><u>auto-summary</u>: ${ page.tldr }</i>` } 
		 (<a href="${page.url}">link on <span style="text-transform: capitalize">${ domain }</span></a>)<br><br>
	 </li>\n`

	if( page.type.toLowerCase() == 'video' ) return `\n<li>
		<b>[ ${ page.type } ${ page.readtime || page.duration } ] ${ page.title }</b> - MENTOR_NOTES_HERE
		 (<a href="${page.url}">link on <span style="text-transform: capitalize">${ domain }</span></a>)<br><br>
	 </li>\n`


	return `\n<li>
				<b>[ ${ page.type } ${ page.readtime || page.duration } ] ${ page.title }</b> - MENTOR_NOTES_HERE
				 - <i><u>auto-summary</u>: ${ page.tldr }</i>
				 (<a href="${page.url}">link on <span style="text-transform: capitalize">${ domain }</span></a>)<br><br>
			 </li>\n`
}

// Template for html pasted into mail
const mailtemplate = categories => { 
	let html = ''
	for( cat in categories ) { 
		html += `<b>${cat}</b>
				<ul>${ categories[ cat ] }</ul>
				<br>
				<br>
				`
	}
	return html
 }

// Going from the constructed data to html
const structure = pages => { 

	// Make an array of unique categories
	const categories = {  }
	for (let i = pages.length - 1; i >= 0; i--) {
		if ( !categories.hasOwnProperty( pages[i].category ) ) categories[ pages[i].category] = []
		categories[ pages[i].category ].push( pages[i] )
	}

	// Loop over all categories
	for ( cat in categories ) { 
		// Grab the current cat, make html of the link objects and join them with newlines
		categories[ cat ] = categories[ cat ].map( link => listtemplate( link ) ).join( '\n' )
	}

	// Build the final bit
	return mailtemplate( categories )
}

module.exports = structure