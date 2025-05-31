import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Todo from './Todo'

describe('Todo Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('should show loading state initially', () => {
    render(<Todo />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render todos when API call is successful', async () => {
    const mockTodos = {
      todos: [
        {
          id: 1,
          title: 'Test Todo',
          description: 'Test Description',
          completed: false
        }
      ]
    }

    // Mock the fetch call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos)
      })
    )

    render(<Todo />)

    // Wait for the todos to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })
  })

  it('should show error message when API call fails', async () => {
    // Mock the fetch call to fail
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    )

    render(<Todo />)

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument()
    })
  })

  it('should render completed status correctly', async () => {
    const mockTodos = {
      todos: [
        {
          id: 1,
          title: 'Completed Todo',
          description: 'This is completed',
          completed: true
        }
      ]
    }

    // Mock the fetch call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos)
      })
    )

    render(<Todo />)

    // Wait for the todos to be rendered
    await waitFor(() => {
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })
  })

  it('should handle network errors', async () => {
    // Mock the fetch call to throw network error
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    )

    render(<Todo />)

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })
}) 