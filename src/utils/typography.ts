import Typography from 'typography';
import Theme from 'typography-theme-sutro';

Theme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: '#4A4A4A',
      textDecoration: 'underline',
    },
    'h1 a, h2 a, h3 a': {
      textDecoration: 'none',
    },
  };
};

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
