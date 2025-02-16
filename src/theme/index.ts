import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: "Outfit, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  fontSizes: {
    xs: "1rem",
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "1.8rem",
  },
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
  },
  shadows: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
  },
  headings: {
    fontFamily: "Outfit, sans-serif",
    sizes: {
      h1: { fontSize: "2.1rem", fontWeight: "700", lineHeight: "2.6rem" },
      h2: { fontSize: "1.9rem", fontWeight: "500", lineHeight: "2.4rem" },
      h3: { fontSize: "1.75rem", fontWeight: "500", lineHeight: "2.2rem" },
      h4: { fontSize: "1.5rem", fontWeight: "500", lineHeight: "2rem" },
      h5: { fontSize: "1.2rem", fontWeight: "500", lineHeight: "1.8rem" },
    },
  },
  components: {
    TextInput: {
      vars: (theme: MantineThemeOverride) => ({
        root: {
          borderRadius: "2rem",
        },
      }),
    },
    PasswordInput: {
      vars: (theme: MantineThemeOverride) => ({
        root: {
          borderRadius: "2rem",
        },
      }),
    },
    Select: {
      vars: (theme: MantineThemeOverride) => ({
        root: {
          borderRadius: "2rem",
        },
      }),
    },
    BackgroundImage: {
      vars: {
        root: {
          img: {
            filter: "blur(12px)",
          },
        },
      },
    },
    Header: {
      vars: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
  colors: {
    primary: [
      "#CCE0FF",
      "#BAD0F3",
      "#9BACD9",
      "#5E77BC",
      "#4963AE",
      "#2F4070",
      "#232F53",
      "#1B2541",
      "#001A41",
      "#000000",
    ],
    secondary: [
      "#DCDDEC",
      "#D2D4E7",
      "#C6C8E1",
      "#ACAFD3",
      "#7F83B8",
      "#646AAD",
      "#4C518F",
      "#393D6B",
      "#0C1f56",
      "#06102B",
    ],
    success: [
      "#ECFDF5",
      "#D1FAE5",
      "#A7F3D0",
      "#6EE7B7",
      "#34D399",
      "#10B981",
      "#059669",
      "#047857",
      "#065F46",
      "#064E3B",
    ],
    warning: [
      "#FFFBEB",
      "#FEF3C7",
      "#FDE68A",
      "#FCD34D",
      "#FBBF24",
      "#F59E0B",
      "#D97706",
      "#B45309",
      "#92400E",
      "#78350F",
    ],
    error: [
      "#FEF2F2",
      "#FEE2E2",
      "#FECACA",
      "#FCA5A5",
      "#F87171",
      "#EF4444",
      "#DC2626",
      "#B91C1C",
      "#991B1B",
      "#7F1D1D",
    ],
    neutral: [
      "#FBFBFC",
      "#EEEFF2",
      "#DADBE2",
      "#CBD5E1",
      "#8D90A7",
      "#6F728F",
      "#454966",
      "#383A4B",
      "#313038",
      "#21222C",
    ],
    shades: [
      "#FFFFFF",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
    ],
  },
};
