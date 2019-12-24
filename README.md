# debounceif

DebounceIf a condition is met.

## Sample Usage 

### TypeScript

```typescript 
debounce(() => {
    console.log('Debounced after 1s!')
}, 1000)

let isLoading = true
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
```

### HTML

```html
<input type="text" id="debounce" />
<div id="suggestions"></div>

<script>var exports = {};</script>
<script src="debounceIf.js"></script>
<script>
const words = ['world','wide','web']
document.getElementById('debounce').onkeypress = (event) => {
    exports.debounce(() => {
        const search = event.target.value
        const suggestions = words.filter((word) => word.startsWith(search.toLowerCase())).sort().join('<br />')
        document.getElementById('suggestions').innerHTML = suggestions
    }, 500)
}
</script>
```

See tests/debounceIf.html to learn more about how to incorporate this into your project via HTML and JS or tests/usage.ts for an example on how to debounceIf with NodeJS and Typescript.

## Available Scripts 

In the project directory, you can run:

### `npm run build`

Builds debounceIf.ts and tests/usage.ts into JS files for usage. usage.ts is a demo of the script being used in Typescript while tests/debounceIf.html provides a demonstration of usage within the browser.

### `npm run test-usage`

Runs the sample usage.js file which should output a log in your console.

## Learn More

You can learn more about [the developer here](https://www.linkedin.com/in/daniel-moxon/).
