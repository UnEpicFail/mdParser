#!/usr/bin/env node

const parser = require('../lib/parser.js')

if (process.argv.length === 2) {
    console.log(`
        -h for help
    `)
    return;
}


let input = '';
let output = '';

process.argv.forEach(function (val, index) {
    if (val === '-h') {
        console.log(`
                -p <path_to_mark_down.md>
                -o <path_to_resut_output>
            `);
    } else if (val === '-i') {
        if (process.argv[index + 1] !== '-o') {
            input = process.argv[index + 1];
        }
    } else if (val === '-o') {
        if (process.argv[index + 1] !== '-i') {
            output = process.argv[index + 1];
        }
    }
}, this);

if (input.length == 0) {
    console.error('Error: No input')
    return;
}

if (output.length == 0) {
    console.error('Error: No output')
    return;
}

console.log(`
from '` + input + `'
to '` + output + `'
`)

parser.parse(input)