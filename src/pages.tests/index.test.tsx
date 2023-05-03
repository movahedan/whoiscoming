import { render } from '@testing-library/react';
import React from 'react';

import { homepageContent } from '@whoiscoming-ui/contents/home-page';

import Home from '../pages/index';

describe('Home component', () => {
  it('renders main title', () => {
    const { getByText } = render(<Home />);
    const title = getByText(homepageContent.title);

    expect(title).toBeInTheDocument();
  });
});
