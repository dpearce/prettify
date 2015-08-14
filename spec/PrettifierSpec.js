/*
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
*/



describe("Prettifier", function () {
  var prettifier;

  beforeEach(function() {
    prettifier = new Prettifier();
  });


//Test data
  var providedTestData = [
     { input: "1000000", expectedOutput: "1M"}
    ,{ input: "2500000.34", expectedOutput: "2.5M"}
    ,{ input: "532", expectedOutput: "532"}
    ,{ input: "1123456789", expectedOutput: "1.1B"}
  ];

  var outputHasNoDecimalPlace = [
     { input: "7099", expectedOutput: "7TH"}
    ,{ input: "7.099E3", expectedOutput: "7TH"}
    ,{ input: "88099", expectedOutput: "88TH"}
    ,{ input: "999099", expectedOutput: "999TH"}
    ,{ input: "1099000", expectedOutput: "1M"}
    ,{ input: "22099000", expectedOutput: "22M"}
    ,{ input: "333099000", expectedOutput: "333M"}
    ,{ input: "4099000000", expectedOutput: "4B"}
    ,{ input: "55099000000", expectedOutput: "55B"}
    ,{ input: "666099000000", expectedOutput: "666B"}
    ,{ input: "7099000000000", expectedOutput: "7TR"}
    ,{ input: "88099000000000", expectedOutput: "88TR"}
    ,{ input: "999099000000000", expectedOutput: "999TR"}
    ,{ input: "1099000000000000", expectedOutput: "1Q"}
    ,{ input: "22099000000000000", expectedOutput: "22Q"}
    ,{ input: "333099000000000000", expectedOutput: "333Q"}
    ,{ input: "3.33099E17", expectedOutput: "333Q"}
  ]  

 var outputHasOneDecimalPlace = [
     { input: "7999", expectedOutput: "7.9TH"}
    ,{ input: "7.99E3", expectedOutput: "7.9TH"}
    ,{ input: "88999", expectedOutput: "88.9TH"}
    ,{ input: "999999", expectedOutput: "999.9TH"}
    ,{ input: "1999999", expectedOutput: "1.9M"}
    ,{ input: "22999999", expectedOutput: "22.9M"}
    ,{ input: "333999999", expectedOutput: "333.9M"}
    ,{ input: "4999999999", expectedOutput: "4.9B"}
    ,{ input: "55999999999", expectedOutput: "55.9B"}
    ,{ input: "666999999999", expectedOutput: "666.9B"}
    ,{ input: "7999999999999", expectedOutput: "7.9TR"}
    ,{ input: "88999999999999", expectedOutput: "88.9TR"}
    ,{ input: "999999999999999", expectedOutput: "999.9TR"}
    ,{ input: "1999999999999999", expectedOutput: "1.9Q"}
    ,{ input: "22999999999999999", expectedOutput: "22.9Q"}
    ,{ input: "333999999999999999", expectedOutput: "333.9Q"}
    ,{ input: "3.3399E17", expectedOutput: "333.9Q"}
  ]  

  var nonPrettifiable = [
    { input: "999", expectedOutput: "999"}
    ,{ input: "111.9999", expectedOutput: "111.9999"}
    ,{ input: "9000000000000000000", expectedOutput: "9000000000000000000"}
    ,{ input: "99990000000000000000", expectedOutput: "99990000000000000000"}
    ,{ input: "12345678901000023456.9", expectedOutput: "12345678901000023456.9"}
  ];

  var badInput = [
     { input: "asdfasdfasdf", expectedException: "argument cannot be converted to a Decimal."}   
    ,{ input: "10000000asdfasdfasdf", expectedException: "argument cannot be converted to a Decimal."}   
    ,{ input: 999999999.999999999, expectedException: "argument must be a String that represents a numeric value."} 
    ,{ input: 1234.345, expectedException: "argument must be a String that represents a numeric value."} 
  ]


//Test definitions
  //parameterized test accepts input and expectedOutput and optional flag to appply a negative sign
  var testPrettifier = function (testData, applyNegativeSign) {
    testData.forEach (function (data) {
      var sign = applyNegativeSign === true ? '-' : '';
      var testDescription = "prettifies " + sign + data.input + " into " + sign + data.expectedOutput;
      it (testDescription, function() {
         expect( prettifier.prettify(sign + data.input) ).toEqual(sign + data.expectedOutput);
      }); 

    });
  };

  //parameterized test accepts input and expectedException
  var testPrettifierExpectingExceptions = function (testData) {
    testData.forEach (function (data) {
      var testDescription = "prettifies " + data.input + " into exception: " + data.expectedException;
      it (testDescription, function() {
         expect( function() { prettifier.prettify(data.input) } ).toThrow( data.expectedException );
      }); 
    });
  };


//Test invocations
  describe("providedTestData", function () {
    testPrettifier(providedTestData);
  });
  describe("outputHasNoDecimalPlace", function () {
    testPrettifier(outputHasNoDecimalPlace);
  });
  describe("outputHasOneDecimalPlace", function () {
    testPrettifier(outputHasOneDecimalPlace);
  });
  describe("nonPrettifiable", function () {
    testPrettifier(nonPrettifiable);
  });


  describe("negative providedTestData", function () {
    testPrettifier(providedTestData, true);
  });
  describe("negative outputHasNoDecimalPlace", function () {
    testPrettifier(outputHasNoDecimalPlace, true);
  });
  describe("negative outputHasOneDecimalPlace", function () {
    testPrettifier(outputHasOneDecimalPlace, true);
  });
  describe("negative nonPrettifiable", function () {
    testPrettifier(nonPrettifiable, true);
  });


  describe("badInput", function () {
    testPrettifierExpectingExceptions(badInput);
  });

});
