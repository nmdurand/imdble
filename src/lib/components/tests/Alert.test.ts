import '@testing-library/jest-dom'

import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/svelte'
import Alert from '../Alert.svelte'

const { getByTestId, queryByTestId } = screen

test('renders ok', async () => {
    const { component } = render(Alert)
    expect(component.show).toBeDefined();

    expect(queryByTestId('alert')).toBeNull()

    // Show alert component
    component.show('YOLO')
    await waitFor(() => {
        expect(getByTestId('alert')).toBeInTheDocument()
    })
    const alert = queryByTestId('alert')
    expect(alert).toHaveTextContent('YOLO')

    // Component should hide automatically after 2 seconds
    await waitForElementToBeRemoved(() => queryByTestId('alert'), { timeout: 3000 })
})
