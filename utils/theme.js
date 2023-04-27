import { extendTheme } from "@chakra-ui/react";

// Extending the theme to include custom colors, fonts, etc
const colors = {
    // Primary Color
    primary_1: "#2342B0",
    // Shades Color
    shades_1: "#8A9AD1",
    shades_2: "#CCD3ED",
    shades_3: "#93A4E2",
    shades_4: "#637ACD",
    shades_5: "#263F99",
    shades_6: "#7A7474",
    shades_7: "#959595",
    // Secondary Color
    secondary_1: "#F3F3F3",
    // Accent Colors
    accent_1: "#ECECEC",
    accent_2: "#333333",
    accent_3: "#E2CC08",
};

export const theme = extendTheme({
    colors,
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'inter', sans-serif`,
    },
});
