import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import LogoCircle from './LogoCircle';

describe('LogoCircle', () => {
  afterEach(() => cleanup());

  it('renders logo image', () => {
    render(<LogoCircle />);
    const image = screen.getByRole('img', { name: /logo/i });
    expect(image).toBeInTheDocument();
  });
});