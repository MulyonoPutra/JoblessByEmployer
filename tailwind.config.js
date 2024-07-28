/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,ts}', './node_modules/preline/preline.js'],
    theme: {
        extend: {
            colors: {
                orange: colors.orange,
                disabled: '#707578',
                scarlet: {
                    DEFAULT: '#460C68',
                    50: '#fbf5ff',
                    100: '#f4e9fe',
                    200: '#ecd7fd',
                    300: '#ddb7fb',
                    400: '#c889f7',
                    500: '#b35cf0',
                    600: '#9f3be2',
                    700: '#882ac6',
                    800: '#7327a2',
                    900: '#5e2182',
                    950: '#460C68',
                },
                seance: {
                    50: '#fef3ff',
                    100: '#fce7ff',
                    200: '#faceff',
                    300: '#f8a7ff',
                    400: '#f572ff',
                    500: '#ea3df8',
                    600: '#d11ddc',
                    700: '#b114b7',
                    800: '#921395',
                    900: '#7f167f',
                    950: '#520051',
                },
                violet: {
                    50: '#fdf2fb',
                    100: '#fce7f8',
                    200: '#fad0f2',
                    300: '#f8a9e6',
                    400: '#f274d3',
                    500: '#ea4abe',
                    600: '#d9299f',
                    700: '#cb1c8d',
                    800: '#9b196b',
                    900: '#82195b',
                    950: '#4f0834',
                },
            },
        },
    },
    plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
};

// Resource: https://colorhunt.co/palette/f56eb3cb1c8d7f167f460c68
