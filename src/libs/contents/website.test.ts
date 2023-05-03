import { homepageContent } from './home-page';
import {
  websiteDomain,
  websiteBaseUrl,
  siteName,
  siteDescription,
} from './website';

describe('Constants', () => {
  test('websiteDomain should be "whoiscoming.dev"', () => {
    expect(websiteDomain).toBe('whoiscoming.dev');
  });

  test('websiteBaseUrl should be "https://www.whoiscoming.dev"', () => {
    expect(websiteBaseUrl).toBe('https://www.whoiscoming.dev');
  });

  test('siteName should be "WhoIsComing"', () => {
    expect(siteName).toBe('whoiscoming');
  });

  test('siteDescription should match homepageContent.slogan', () => {
    expect(siteDescription).toBe(homepageContent.title);
  });
});
