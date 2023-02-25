export default {
	check,
	lookup,
};

var elements;

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
}

// function check(inputWord) {
// 	// TODO: determine if `inputWord` can be spelled
// 	// with periodic table symbols; return array with
// 	// them if so (empty array otherwise)
// 	if (inputWord.length > 0 ) {
// 		for (let element of elements) {
// 			let symbol = element.symbol.toLowerCase();
// 			if (symbol.length <= inputWord.length) {
// 				// did the symbol match the first
// 				// one or two characters in 'inputWord'
// 				if (inputWord.slice(0, symbol.length) === symbol) {
// 					// still have characters left?
// 					if (inputWord.length > symbol.length) {
// 						// now recurse!
// 						// get all the rest of the characters and 
// 						// keep checking the rest o characters
// 						let res = check(inputWord.slice(symbol.length));
// 						// matched successfully
// 						if (res.length > 0) {
// 							return [ symbol, ...res ];
// 						}
// 					}
// 					else {
// 						return [ symbol ];
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return [];
// }

function check(inputWord) {
	if (inputWord.length > 0) {
		// check every element for a symbol matching the next
		// 1-2 characters of the input word
		for (let element of elements) {
			let symbol = element.symbol.toLowerCase();
			if (symbol.length <= inputWord.length) {
				if (inputWord.slice(0,symbol.length) == symbol) {
					// more characters in the input word to try
					// to match to symbols?
					if (inputWord.length > symbol.length) {
						// recurse to check the remainder of the
						// input word
						let res = check(inputWord.slice(symbol.length));

						// was the check successful?
						if (res.length > 0) {
							return [ symbol, ...res ];
						}
					}
					else {
						return [ symbol ];
					}
				}
			}
		}
	}

	return [];
}

function lookup(elementSymbol) {
	// TODO: return the element entry based on specified
	// symbol (case-insensitive)
	for (let element of elements) {
		if (element.symbol.toLowerCase() === elementSymbol) {
			return element
		}
	}
	return {};
}
