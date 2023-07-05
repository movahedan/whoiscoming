// @ts-check

const toRem = (value) => `${value / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/libs/ui/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    screens: {
      md: toRem(744),
      lg: toRem(1024),
      xl: toRem(1440),
      xxl: toRem(1920),
    },

    colors: {
      white: '#FFFFFF',
    },

    fontFamily: {
      sans: ['Outfit', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },

    spacing: {
      0: toRem(0),
      8: toRem(8),
      12: toRem(12),
      16: toRem(16),
      20: toRem(20),
      24: toRem(24),
      32: toRem(32),
      40: toRem(40),
      48: toRem(48),
      64: toRem(64),
      68: toRem(68),
      72: toRem(72),
      78: toRem(78),
      82: toRem(82),
      100: toRem(100),
      200: toRem(200),
      208: toRem(208),
      419: toRem(419),
      525: toRem(525),
    },

    extend: {
      cursor: {
        none: 'none',
      },
      space: {
        4: toRem(4),
      },
      maxWidth: {
        screen: '100vw',
        400: toRem(400),
        764: toRem(764),
        840: toRem(840),
        880: toRem(880),
        1040: toRem(1040),
      },
      borderWidth: {
        1: toRem(1),
      },
      borderRadius: {
        lg: toRem(10),
      },
      borderColor: {
        transparent: 'transparent',
      },
      fontWeight: {
        900: 900,
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'white',
          },
        },
        h1: {
          css: {
            fontWeight: '800',
            fontSize: toRem(96),
            lineHeight: toRem(121),
            letterSpacing: '-0.032em',
            textTransform: 'capitalize',
          },
        },
        h2: {
          css: {
            fontWeight: '400',
            fontSize: toRem(60),
            lineHeight: toRem(76),
            letterSpacing: '-0.015em',
            textTransform: 'capitalize',
          },
        },
        h3: {
          css: {
            fontWeight: '400',
            fontSize: toRem(48),
            lineHeight: toRem(60),
            letterSpacing: '0.01em',
            textTransform: 'capitalize',
          },
        },
        h4: {
          css: {
            fontWeight: '400',
            fontSize: toRem(34),
            lineHeight: toRem(43),
            letterSpacing: '0.01em',
            textTransform: 'capitalize',
          },
        },
        h5: {
          css: {
            fontWeight: '400',
            fontSize: toRem(24),
            lineHeight: toRem(30),
            letterSpacing: '0.02em',
            textTransform: 'capitalize',
          },
        },
        h6: {
          css: {
            fontWeight: '400',
            fontSize: toRem(20),
            lineHeight: toRem(25),
            letterSpacing: '0.01em',
            textTransform: 'capitalize',
          },
        },
        subtitle1: {
          css: {
            fontWeight: '400',
            fontSize: toRem(18),
            lineHeight: toRem(23),
            letterSpacing: '0.02em',
            textTransform: 'capitalize',
          },
        },
        subtitle2: {
          css: {
            fontWeight: '400',
            fontSize: toRem(17),
            lineHeight: toRem(21),
            letterSpacing: '0.01em',
            textTransform: 'capitalize',
          },
        },
        subtitle3: {
          css: {
            fontWeight: '400',
            fontSize: toRem(16),
            lineHeight: toRem(20),
            letterSpacing: '0.025em',
            textTransform: 'capitalize',
          },
        },
        body1: {
          css: {
            fontWeight: '400',
            fontSize: toRem(16),
            lineHeight: '150%',
            letterSpacing: '0.01em',
          },
        },
        body2: {
          css: {
            fontWeight: '400',
            fontSize: toRem(15),
            lineHeight: '180%',
            letterSpacing: '0.03em',
          },
        },
        caption1: {
          css: {
            fontWeight: '400',
            fontSize: toRem(15),
            lineHeight: '180%',
            letterSpacing: '0.03em',
          },
        },
        caption2: {
          css: {
            fontWeight: '400',
            fontSize: toRem(13),
            lineHeight: toRem(16),
            letterSpacing: '0.025em',
          },
        },
        caption3: {
          css: {
            fontWeight: '400',
            fontSize: toRem(13),
            lineHeight: toRem(16),
          },
        },
        badge: {
          css: {
            fontWeight: '400',
            fontSize: toRem(12),
            lineHeight: toRem(15),
            textTransform: 'capitalize',
          },
        },
        button: {
          css: {
            fontWeight: '600',
            fontSize: toRem(20),
            lineHeight: toRem(25),
            letterSpacing: '0.115em',
            textTransform: 'capitalize',
          },
        },
        button1: {
          css: {
            fontWeight: '400',
            fontSize: toRem(15),
            lineHeight: toRem(19),
            letterSpacing: '0.025em',
            textTransform: 'capitalize',
          },
        },
        button2: {
          css: {
            fontWeight: '400',
            fontSize: toRem(13),
            lineHeight: toRem(16),
            letterSpacing: '0.04em',
            textTransform: 'capitalize',
          },
        },
        overline: {
          css: {
            fontWeight: '400',
            fontSize: toRem(12),
            lineHeight: toRem(15),
            letterSpacing: '0.075em',
            textTransform: 'capitalize',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  variants: {
    extend: {
      margin: ['first', 'last', 'responsive'],
    },
  },
};
