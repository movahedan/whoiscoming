import { render, fireEvent } from '@testing-library/react';
import dayjs from 'dayjs';

import { Calendar } from './Calendar';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Calendar', () => {
  it('should render with default props', () => {
    const { getByTestId } = render(<Calendar dataTestId='Calendar' />);

    expect(getByTestId('Calendar')).toBeInTheDocument();
  });

  it('should render with custom props', () => {
    const testClassName = 'test-class-name';
    const testStyle = { color: 'red' };
    const { getByTestId } = render(
      <Calendar
        dataTestId='Calendar'
        className={testClassName}
        style={testStyle}
      />
    );

    const calendar = getByTestId('Calendar');
    expect(calendar).toBeInTheDocument();
    expect(calendar).toHaveClass(testClassName);
    expect(calendar).toHaveStyle(testStyle);
  });

  it('should call onSelect when a date is selected', () => {
    const mockOnSelect = jest.fn();
    const testDate = '2023-06-01';
    const { getByTitle } = render(
      <Calendar dataTestId='Calendar' onSelect={mockOnSelect} />
    );

    const dayElement = getByTitle(testDate);
    fireEvent.click(dayElement);

    expect(mockOnSelect).toHaveBeenCalledWith(testDate);
  });

  it('should change the current date to today when the Today button is clicked', () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = render(
      <Calendar dataTestId='Calendar' onSelect={mockOnSelect} />
    );

    const currentDate = dayjs();
    const todayButton = getByTestId('calendar-today-button');
    fireEvent.click(todayButton);

    expect(mockOnSelect).toHaveBeenCalledWith(currentDate.format('YYYY-MM-DD'));
  });
});
