import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import SharkTitle from './SharkTitle';

describe('SharkTitle', () => {
  afterEach(() => cleanup());

  it('renders the shark title text', () => {
    render(<SharkTitle title="Make a Shark!" />);
    const headings = screen.getAllByText(/make a shark!/i);
    expect(headings.length).toBeGreaterThan(0);
  });
});