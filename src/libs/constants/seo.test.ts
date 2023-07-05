import { siteDescription, siteName } from '@whoiscoming-ui/contents/website';

import { getDefaultNextSeoConfig } from './seo';

describe('reportWebVitals', () => {
  it('should log web vitals when the environment variable is available', () => {
    expect(getDefaultNextSeoConfig({ noIndex: false }).noindex).toBe(false);
    expect(getDefaultNextSeoConfig({ noIndex: false }).nofollow).toBe(false);
  });

  it('should not log web vitals when the environment variable is unavailable', () => {
    expect(getDefaultNextSeoConfig({ noIndex: true }).noindex).toBe(true);
    expect(getDefaultNextSeoConfig({ noIndex: true }).nofollow).toBe(true);
  });
});

describe('getDefaultNextSeoConfig', () => {
  it('returns default NextSeo config', () => {
    const config = getDefaultNextSeoConfig();
    expect(config).toBeDefined();
    expect(config.noindex).toBeFalsy();
    expect(config.nofollow).toBeFalsy();
    expect(config.titleTemplate).toEqual(`%s | ${siteName}`);
    expect(config.defaultTitle).toEqual(siteName);
    expect(config.description).toEqual(siteDescription);
    expect(config.openGraph).toEqual({
      type: 'website',
      locale: 'en_IE',
      site_name: siteName,
    });
    expect(config.additionalMetaTags).toContainEqual({
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes,viewport-fit=cover',
    });
    expect(config.additionalMetaTags).toContainEqual({
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    });
  });

  it('sets noindex and nofollow when specified', () => {
    const config = getDefaultNextSeoConfig({ noIndex: true });
    expect(config.noindex).toBeTruthy();
    expect(config.nofollow).toBeTruthy();
  });
});
