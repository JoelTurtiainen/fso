import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    error: '#d73a4a',
    backgroundPrimary: '#d9d9d9',
    backgroundSecondary: '#b8b8b8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    web: 'System',
  }),
  fontWeights: {
    normal: 400,
    bold: 700,
  },
};

export default theme;
