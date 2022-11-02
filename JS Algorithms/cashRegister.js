/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

*/
function checkCashRegister(price, cash, cid) {
    // Array of array for currency values and total from drawer (cid)
    let drawerCurrency = [
        ["HUNDRED", cid[8][1], 100.00],
        ["TWENTY", cid[7][1], 20.00],
        ["TEN", cid[6][1], 10.00],
        ["FIVE", cid[5][1], 5.00],
        ["ONE", cid[4][1], 1.00],
        ["QUARTER", cid[3][1], 0.25],
        ["DIME", cid[2][1], 0.10],
        ["NICKEL", cid[1][1], 0.05],
        ["PENNY", cid[0][1], 0.01]
    ];

    // initialize object properties/values
    let status = "";
    let change = [];

    let changeDue = cash - price;
    let drawerTotal = 0;
    // calculate the drawerTotal
    for (let i=0; i<cid.length; i++) {
        // second item in the nested arrays is the total value of that currency
        drawerTotal += cid[i][1];
    }

    // first case, change is greater than drawer total
    if (changeDue > drawerTotal) {
        status = "INSUFFICIENT_FUNDS";
        change = [];
    }
    // second case, if drawer total is the same as change due, give all of the drawer
    else if (changeDue == drawerTotal) {
        status = "CLOSED";
        change = cid;
    }
    // otherwise, attempt to calculate the change needed
    else {
        // iterate over each currency value (reverse order)
        for (let j=0; (changeDue.toFixed(2)>0) && (j<drawerCurrency.length); j++) {
            let numItems = 0;
            let drawerCurrencyTotal = drawerCurrency[j][1];
            let currencyValue = drawerCurrency[j][2];
            while ((changeDue.toFixed(2) >= currencyValue) && (drawerCurrencyTotal > 0)) {
                numItems++;
                drawerCurrencyTotal -= currencyValue;
                changeDue -= currencyValue;
            }
            if (numItems != 0) { // don't put items into the change array if they have 0 value
                change.push([drawerCurrency[j][0], drawerCurrency[j][2]*numItems]); // push an array eg ["TWENTY", 60] */
            }
        }
        
        if (changeDue > 0) { // complete change was not able to be given
            status = "INSUFFICIENT_FUNDS";
            change = [];
        }
        else {
            status = "OPEN";
        }
    }

    return {"status": status, "change": change}
}
