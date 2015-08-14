Prettifier = function () { }

Prettifier.prototype.prettify = function (input) {
	var decimalNumber = this.convertToDecimal(input);

	//drop the decimal places and remove the sign
	var absIntDecimalNumber = decimalNumber.trunc().abs();
	
	//get the logarithm as a integer
	var logarithm = parseInt(absIntDecimalNumber.log().trunc());

	//restrict the logarithm down to the closest multiple of 3 
	var magnitude = logarithm - (logarithm % 3); 
	
	//determine the prefix based on prettification magnitude
	var prefix
	switch (magnitude) {
		case 3:  prefix = "TH"; break;
		case 6:  prefix = "M"; break;
		case 9:  prefix = "B"; break;
		case 12: prefix = "TR"; break;
		case 15: prefix = "Q"; break;
		default: return input;
	}

	//reduce the number by - 10 to the power of magnitude 
	var numReducedAsString = ( decimalNumber.div( new Decimal(10).pow(magnitude) ) ).toString();

	//when the reduced number contains a decimal point we need to truncate it to include either none or just one decimal place
	var truncationOffset = numReducedAsString.indexOf(".");
	if (truncationOffset !== -1 ) {   
		if (numReducedAsString.indexOf(".0") === -1) {
			truncationOffset += 2;  //adjust offset so one decimal place will be included
		}
		numReducedAsString = numReducedAsString.substr(0, truncationOffset);
	}

	//apply the prefix
	return numReducedAsString + prefix;
};

Prettifier.prototype.convertToDecimal = function (input) {
	//Forcing input as a string that represents a numeric value then using it with a Decimal type 
	// - eliminates javascript IEEE 754 64bit number rounding problems
	// - handles way more significant digits than IEEE 754 64bit numbers
	if (typeof input !== "string") {
		throw "argument must be a String that represents a numeric value."
	}

	try {
		return new Decimal(input); 
	} catch (e) { 
		throw "argument cannot be converted to a Decimal."
	}
};