import { Spreax } from 'spreax/dist/spreax.esm';
import parse from "./parser";

const app = new Spreax({
    el: document.querySelector('#app'),
    state: {
        eq: '',
        error: false,
        d: ''
    }
})

app.$ctx.$on('eq', ({ value }) => {
    try {
        const { slope, x, y } = parse(value),
            d = slope === Infinity ? `M ${150 + x} 0 l 0 300` :
                slope === 0 ? `M 0 ${150 - y} l 300 0` :
                    `M ${150 + x} ${150 - y} l ${150 - x} ${-slope * 150 - y} l -300 ${slope * 300}`;
        app.d = d
        app.error = false
    } catch ({ message }) {
        app.error = message
    }
})