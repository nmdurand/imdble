import '@testing-library/jest-dom'

import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte'
import Alert from '../Alert.svelte'

const { getByTestId, queryByTestId } = screen

test("doesn't show when simply rendered", async () => {
    render(Alert)
    expect(queryByTestId('alert')).toBeNull()
})

test("shows & hides automatically when show method invoked", async () => {
    const { component } = render(Alert)
    expect(queryByTestId('alert')).toBeNull()

    expect(component.show).toBeDefined();

    // Invoke show method
    component.show('YOLO')
    await waitFor(() => {
        expect(getByTestId('alert')).toBeInTheDocument()
    })
    const alert = queryByTestId('alert')
    expect(alert).toHaveTextContent('YOLO')

    // Component should hide automatically after 2 seconds
    await waitForElementToBeRemoved(() => queryByTestId('alert'), { timeout: 3000 })
})
