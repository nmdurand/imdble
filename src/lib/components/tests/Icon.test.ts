import '@testing-library/jest-dom'

import { render, fireEvent, screen } from '@testing-library/svelte'

import Icon from '../Icon.svelte'
import Xmark from '../../icons/xmark.svg'

test('renders ok', () => {
    const onClick = jest.fn()
    render(Icon, { src: Xmark, alt: 'YOLO', onClick: onClick })

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()

    expect(image).toHaveProperty('alt', 'YOLO')
    expect(image).toHaveProperty('src', 'http://localhost/xmark.svg')

    fireEvent(image, new MouseEvent('click', { bubbles: true }))
    expect(onClick).toHaveBeenCalledTimes(1)
})
