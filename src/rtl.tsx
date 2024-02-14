import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import React from 'react';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Vazir',
    }
});
export const Rtl = (props: any) => {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </CacheProvider>
    )
}