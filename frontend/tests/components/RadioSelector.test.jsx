import { render, screen, fireEvent } from "@testing-library/react";
import RadioSelector from "../../src/components/RadioSelector";
import { vi } from 'vitest';

describe("RadioSelector", () => {

    // Create a mock function for onChange event
    const mockOnChangeFunction = vi.fn();

    test('Render a radio button with only a value prop', () => {
        render(<RadioSelector 
            value="forearms" />)

        const radioBtn = screen.getByRole('radio');
        expect(radioBtn).toBeInTheDocument();

        expect(screen.getByText("forearms")).toBeInTheDocument();
    });

    test('Render a radio button with all props', () => {
        render(<RadioSelector 
            id="1"
            name="glutes"
            value="glutes"
            onChange="glutes" />)

        const radioBtn = screen.getByRole('radio');
        expect(radioBtn).toBeInTheDocument();

        expect(screen.getByText("glutes")).toBeInTheDocument();

        expect(radioBtn).toHaveAttribute('id', "1")
        expect(radioBtn).toHaveAttribute('value', "glutes")
        expect(radioBtn).toHaveAttribute('name', "glutes")
    });

    test("Check radio button calls onChange function", () => {
        render(<RadioSelector 
            id="1"
            name="neck"
            value="neck"
            onChange={mockOnChangeFunction} />)
        
        const radioBtn = screen.getByRole('radio');
        fireEvent.click(radioBtn)
        
        expect(mockOnChangeFunction).toHaveBeenCalledTimes(1)
    });

    test("Label attribute renders", () => {
        render(<RadioSelector 
            id="1"
            name="quadriceps"
            value="quadriceps"
            onChange={mockOnChangeFunction} />)
        
            expect(screen.getByLabelText('quadriceps')).toBeInTheDocument();
    })
});
