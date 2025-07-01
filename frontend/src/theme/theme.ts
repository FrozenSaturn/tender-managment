import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  colors: {
    // Dark theme optimized colors
    dark: [
      "#C1C2C5", // 0
      "#A6A7AB", // 1
      "#909296", // 2
      "#5C5F66", // 3
      "#373A40", // 4
      "#2C2E33", // 5
      "#25262B", // 6
      "#1A1B1E", // 7
      "#141517", // 8
      "#101113", // 9
    ],
    // Our custom colors optimized for dark theme
    primary: [
      "#1B262C", // 0 - darkest
      "#1D2B32", // 1
      "#1F3038", // 2
      "#21363E", // 3
      "#233B44", // 4
      "#25414A", // 5 - our primary
      "#274650", // 6
      "#294C56", // 7
      "#2B515C", // 8
      "#0F4C75", // 9 - our secondary
    ],
    accent: [
      "#BBE1FA", // 0 - lightest
      "#A8D4F4", // 1
      "#95C7EE", // 2
      "#82BAE8", // 3
      "#6FADE2", // 4
      "#5CA0DC", // 5
      "#3282B8", // 6 - our accent
      "#2975AB", // 7
      "#16689E", // 8
      "#035791", // 9 - darkest
    ],
  },
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  white: "#BBE1FA", // Our pale color as white
  black: "#1B262C", // Our primary as black

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
          backgroundColor: theme.colors.dark[7],
          borderColor: theme.colors.dark[5],
        },
      }),
    },
    Paper: {
      styles: (theme: any) => ({
        root: {
          backgroundColor: theme.colors.dark[7],
        },
      }),
    },
  },
});
