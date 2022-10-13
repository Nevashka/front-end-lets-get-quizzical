import { default as Home } from '.';
import { render, screen } from '@testing-library/react';

describe('Home', () => {

    test('it renders the title', () => {
        render(<Home />)
        const heading = screen.getById('head')
        expect(heading.textContent).toContain("Welcome to Let's get Quzzical!");
    });

});
