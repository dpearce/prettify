# prettify - actual code problem
accepts a numeric type and returns a truncated, "prettified" string version. 
The prettified version should include one number after the decimal when the truncated number is not an integer. 
It should prettify numbers greater than 6 digits and support millions, billions and trillions.
 
Examples:
    input: 1000000
    output: 1M
 
    input: 2500000.34
    output: 2.5M
 
    input: 532
    output: 532
 
    input: 1123456789
    output: 1.1B
 
 
assumption: accepts a string representation of a numberic value and returns it prettified or leaves it alone
assumption: bad input will simply be left alone and returned
assumption: support negatives
assumption: support thousands and quadtrillions

Problem break down
numbers with 4 to 18 digits to the left of the decimal place will be prettified
a number will be prettified when ...
    - as an absolute value, the result of flooring its logarithm is between 3 and 17 inclusive
a number will be prettified by ...
    - determining a magnitude: by restricting the logarithm down to the nearest multiple of three
    - the magnitude is used to reduce the number and lookup the suffix
    - when the reduced number contains a decimal point, truncation must be applied
        - when decimal point is followed by a zero, the decimal point and decimals are truncated
        - otherwise it's truncated to include one decimal place
    - the suffix is applied to the reduced number
