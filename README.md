# HtmlToBase64

Extremely simple tool to convert a HTML document to a base64 image

## Usage

```js
const htmlToBase64 = require("htmltobase64")
let width = 1280;
let height = 1080;

let replacements = {
        user: "dwiftejb"
} // replace anything that has {{key}} to value

let selector = "body"; // selects the element to screenshot and save as base64, leave empty to screenshot whole page.

async function main() {
    const base64 = await htmlToBase64("<h1>hello {{user}}</h1>", width, height, replacements, selector);
    console.log(base64);
}

main();
```
