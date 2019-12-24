"use strict";
exports.__esModule = true;
var debounceIf_1 = require("../debounceIf");
debounceIf_1.debounce(function () {
    console.log('Debounced after 1s!');
}, 1000);
var isLoading = true;
setTimeout(function () { return isLoading = false; }, 5000);
// Example using function
var dots = '';
debounceIf_1.debounceIf(function () {
    console.log('Debounced after condition is met!');
}, 500, function () {
    dots += '.';
    if (dots.length > 3) {
        dots = '.';
    }
    console.log('Loading' + dots);
    return !isLoading;
});
// Example with class instantiation
var debounceInst = new debounceIf_1.DebounceIf(function () {
    console.log('Debounced from DebouncedIf() instance after 2s!');
}, 2000);
debounceInst.debounce();
/*  With debounceIf condition:

    const debounceInstance = new DebounceIf(() => {
        console.log('Debounced from DebouncedIf() instance!')
    }, 500, () => {
        return true
    })

    debounceInstance.debounceIf()
*/
