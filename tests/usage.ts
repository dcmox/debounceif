import { debounce, debounceIf, DebounceIf } from '../debounceIf'

debounce(() => {
    console.log('Debounced after 1s!')
}, 1000)

let isLoading: boolean = true

setTimeout(() => isLoading = false, 5000)

// Example using function
let dots = ''
debounceIf(() => {
    console.log('Debounced after condition is met!')
}, 500, () => {
    dots += '.'
    if (dots.length > 3) {
        dots = '.'
    }
    console.log('Loading' + dots)
    return !isLoading
})

// Example with class instantiation
const debounceInst = new DebounceIf(() => {
    console.log('Debounced from DebouncedIf() instance after 2s!')
}, 2000)

debounceInst.debounce()

/*  With debounceIf condition:

    const debounceInstance = new DebounceIf(() => {
        console.log('Debounced from DebouncedIf() instance!')
    }, 500, () => {
        return true
    })

    debounceInstance.debounceIf()
*/
