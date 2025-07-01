import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  colors: {
    // Modern dark theme colors
    dark: [
      "#C1C2C5", // 0 - lightest text
      "#A6A7AB", // 1
      "#909296", // 2
      "#5C5F66", // 3
      "#373A40", // 4
      "#2C2E33", // 5
      "#25262B", // 6
      "#1A1B1E", // 7
      "#141517", // 8
      "#101113", // 9 - darkest black
    ],
    // Deep blue-black gradient
    primary: [
      "#1E1E1E", // 0 - darkest
      "#1A1A2E", // 1
      "#16213E", // 2
      "#0F3460", // 3
      "#0A2647", // 4
      "#144272", // 5 - primary
      "#205295", // 6
      "#2C74B3", // 7
      "#3B82F6", // 8
      "#4B91F1", // 9 - lightest
    ],
    // Electric blue accents
    accent: [
      "#E0F2FE", // 0 - lightest
      "#BAE6FD", // 1
      "#7DD3FC", // 2
      "#38BDF8", // 3
      "#0EA5E9", // 4
      "#0284C7", // 5
      "#0369A1", // 6 - main accent
      "#075985", // 7
      "#0C4A6E", // 8
      "#082F49", // 9 - darkest
    ],
  },
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  white: "#E0F2FE", // Light blue as white
  black: "#1A1A2E", // Deep blue-black

  // Dark theme specific components
  components: {
    Button: {
      defaultProps: {
        variant: "filled",
      },
      styles: {
        root: {
          "&:hover": {
            transform: "translateY(-2px)",
            transition: "transform 200ms ease",
          },
        },
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
      },
      styles: (theme: any) => ({
        root: {
          backgroundColor: theme.colors.primary[1],
          borderColor: theme.colors.primary[3],
        },
      }),
    },
    Paper: {
      styles: (theme: any) => ({
        root: {
          backgroundColor: theme.colors.primary[1],
        },
      }),
    },
  },
});
