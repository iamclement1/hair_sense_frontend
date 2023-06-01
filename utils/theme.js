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
    shades_8: "#e9ecf7",
    shades_9: "#D1D9F2",
    shades_10: "rgba(149, 149, 149, 0.12)",
    // Secondary Color
    secondary_1: "#F3F3F3",
    secondary_2: "#CFF8E1",
    accent_1: "#ECECEC",
    accent_2: "#333333",
    accent_3: "#E2CC08",
    accent_4: "#F3D3D3",
    accent_5: "#F7F9FF",
    accent_6: "#656565",
    accent_7: "rgba(169, 169, 169, 0.73)",
    accent_8: "rgba(201, 201, 201, 0.5)",
    accent_9: "#1B1C1E",
    accent_10: "rgba(51, 51, 51, 0.2)",
    // Dark Shades
    dark_1: "rgba(0, 0, 0, 0.3)",
    dark_2: "#ACB5BD",
    dark_3: "#222222",
    dark_4: "rgba(51, 51, 51, 0.3)",
    // Green
    green: "#25934B",
};

export const theme = extendTheme({
    colors,
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'inter', sans-serif`,
    },
});
