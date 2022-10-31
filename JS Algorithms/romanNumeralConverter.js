/* 
Convert the given number into a roman numeral.
Roman numerals	Arabic numerals
    M	1000
    CM	900
    D	500
    CD	400
    C	100
    XC	90
    L	50
    XL	40
    X	10
    IX	9
    V	5
    IV	4
    I	1
All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {
    // create a lookup table for integers to map to roman numerals
    const ints = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    
    let numeral = "";
    for (let i=0; num>0; i++) {
        while (num >= ints[i]) { //use while loop to keep concat numeral until num is less than numeral
            numeral += roman[i]; //add numeral to string
            num -= ints[i]; // decrease num 
        }
    }
    return numeral;
}

   