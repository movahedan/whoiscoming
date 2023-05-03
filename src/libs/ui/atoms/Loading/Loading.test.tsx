import { render } from '@testing-library/react';

import { Loading } from './Loading';

describe('Loading component', () => {
  it('should render properly with provided props', () => {
    const props = {
      width: '50px',
      height: '50px',
      style: {
        color: 'red',
      },
      className: 'test-class',
    };
    const { container } = render(<Loading {...props} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '50px');
    expect(svg).toHaveAttribute('height', '50px');
    expect(svg).toHaveAttribute('class', 'test-class');
    expect(svg).toHaveStyle({ color: 'red' });
  });
});
