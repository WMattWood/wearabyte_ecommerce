import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    max-width: 2000px;
    margin: 0;
        padding: 0;
        border: 0;
        position: relative;
        left: 13%;
}

`

export default GlobalStyle;