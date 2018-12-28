export default function Event() {

	'use strict';

	// Used to store registered topics
	var topics = [];
	var globalIndex = 0;

	/**
	 * Check name and if the function exists
	 */
	function validate( name, trigger ) {
		if( typeof name !== 'string'  ) {
			throw( 'Function name need to be a string' );
		}
		return true;
	}

	/**
	 * Subscribing topic on object topics
	 */
	function sub( name, fn ) {
		if( validate( name ) && ( fn && fn.call ) ) {
			const index = `a${globalIndex++}`;
			( topics[ name ] = topics[ name ] || {} )[ index ] = fn;
			return () => {
				delete topics[ name ][ index ];
			}
		}
	}

	/**
	 * Publishing the registered topics
	 */
	function pub( name ) {
		var	tpc = topics[ name ] || {},
			keys = Object.keys(tpc),
			len = keys.length,
			i=0;

		if( validate( name ) ) {
			for( ; i < len ; i+=1 ) {
				tpc[ keys[i] ] && tpc[ keys[i] ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			}
		}
	}

	/**
	 * Removing the registered function
	 */
	function unsub( name ) {
		if( validate( name ) ) {
			delete topics[ name ];
		}
	}

	return {
		on: sub,
		emit: pub,
		off: unsub,
	}
}