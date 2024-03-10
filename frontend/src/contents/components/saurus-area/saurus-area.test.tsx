import { expect, test, describe } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { SaurusArea } from './saurus-area'



describe('SaurusArea', () => {
  test('渡した要素が描画される', () => {
    render(<SaurusArea>Sample</SaurusArea>)

    expect(screen.getByTestId("SaurusArea").textContent).toBe("Sample")
  })
})
