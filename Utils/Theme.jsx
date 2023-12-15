const palette = {
  green: "#495E57",
  yellow: "#F4CE14",
  red: "#CD0E61",
  black: "#0B0B0B",
  white: "#F0F2F3",
  grey: "#d9d9d9",
  blue: "#434357"
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    lightBackground: palette.grey,
    primary: palette.green,
    secondary: palette.yellow,
    tertiary: palette.blue,
    danger: palette.red,
    failure: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
    whiteTitle: {
      color: 'white',
      fontSize: 30,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 24,
    },
    headline: {
      fontSize: 20,
      fontWeight: '500'
    },
    description: {
      fontSize: 20,
      fontWeight: '400',
      color: palette.green
    },
    price: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.green
    },
    cta: {
      fontSize: 20,
      fontWeight: "bold",
    },
    smallTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'grey'
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 12,
    },
  },
  radius: {
    s: 8,
    m: 16
  }
};
