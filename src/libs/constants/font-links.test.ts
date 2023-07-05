import { fontLinks } from './font-links';

describe('fontLinks', () => {
  test('should contain preconnect link', () => {
    expect(fontLinks).toContainEqual({
      rel: 'preconnect',
      href: 'https://css.gstatic.com/',
      crossOrigin: '',
    });
  });

  test('should contain preload link', () => {
    expect(fontLinks).toContainEqual({
      rel: 'preload',
      as: 'style',
      href: '/css/font.css',
    });
  });

  test('should contain stylesheet link', () => {
    expect(fontLinks).toContainEqual({
      rel: 'stylesheet',
      href: '/css/font.css',
    });
  });
});
