import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/svelte'
import ComboBox from '../ComboBox.svelte'

const { queryByTestId } = screen

test("renders correctly", async () => {
    render(ComboBox)
    expect(queryByTestId('combobox')).toBeInTheDocument()
})
