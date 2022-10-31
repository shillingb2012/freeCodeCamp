/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. 
In a shift cipher the meanings of the letters are shifted by some set amount.
A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.
Write a function which takes a ROT13 encoded string as input and returns a decoded string.
All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {
    // create a lookup array (index 0-25)
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    let newStrArr = [];

    // split str into arr of chars
    let strArr = str.split("");
    for (let char in strArr) {
        // check if current char is an indexOf letters (return index OR if not found returns -1 (else statement))
        let tempIndex = letters.indexOf(strArr[char]);
        if (tempIndex >= 0) {
            tempIndex += 13; //shift the index 13 chars
            if (tempIndex > letters.length-1) {
                tempIndex -= letters.length; // account for shift where index is beyond index 25 to reset at beginning of index
            }
            newStrArr.push(letters[tempIndex]);
        }
        else {
            newStrArr.push(strArr[char]);
        }
    }
    
    return newStrArr.join(""); // join the arr of char to return a string
  }