import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)
    // Initially, we should see the loading state from the Todo component
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should have the correct background color', () => {
    const { container } = render(<App />)
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('bg-white')
  })

  it('should be centered on the screen', () => {
    const { container } = render(<App />)
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('flex')
    expect(mainDiv).toHaveClass('items-center')
    expect(mainDiv).toHaveClass('justify-center')
  })
}) 