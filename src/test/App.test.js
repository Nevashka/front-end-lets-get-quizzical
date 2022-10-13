import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from '../App.js';

describe('App', () => {
    beforeEach(() => {
        render(<App />)
    })

    test('test for header',  () => {
        const header = screen.getByRole('header')
        expect(header).toBeTruthy()
    })
})