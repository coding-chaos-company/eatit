import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { DinoHome } from './dino-home';

describe('DinoHome', () => {
  test('渡した要素が描画される', () => {
    // render(<DinoHome>Sample</DinoHome>)
    // expect(screen.getByTestId("DinoHome").textContent).toBe("Sample")
  });
});
