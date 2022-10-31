/*
Palindrome Checker
Return true if the given string is a palindrome. Otherwise, return false.
A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) 
and turn everything into the same case (lower or upper case) in order to check for palindromes.
We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.
We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.
*/

function palindrome(str) {
    // remove all non-alphanumeric chars and whitespace (\W would include underscores, has to use different regex)
    let updatedStr = str.replace(/[^0-9a-z]/gi, '').toLowerCase();

    // create array of chars to iterate over 
    let charArr = updatedStr.split("");

    for(let i=0, j=charArr.length-1; i<j; i++, j--) {
        if(charArr[i] != charArr[j]) {
            return false;
        }
    }
    return true; // valid palindrome since we never hit the return false from above
}