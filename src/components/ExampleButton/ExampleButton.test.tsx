import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ExampleButton } from './ExampleButton';

describe('ExampleButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with the provided label', () => {
    render(<ExampleButton label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeDefined();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ExampleButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('example-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant styles by default', () => {
    render(<ExampleButton label="Primary Button" />);
    const button = screen.getByTestId('example-button');
    expect(button.className).toContain('bg-blue-500');
  });

  it('applies secondary variant styles when specified', () => {
    render(<ExampleButton label="Secondary Button" variant="secondary" />);
    const button = screen.getByTestId('example-button');
    expect(button.className).toContain('bg-gray-200');
  });

  it('disables the button when disabled prop is true', () => {
    render(<ExampleButton label="Disabled Button" disabled />);
    const button = screen.getByTestId('example-button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = vi.fn();
    render(<ExampleButton label="Disabled Button" onClick={handleClick} disabled />);
    
    fireEvent.click(screen.getByTestId('example-button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
