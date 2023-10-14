import {render, screen} from "@testing-library/react";
import React from "react";
import {TypingDot} from "@/components/chat/typing-dots";

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => {
        return [". . .", jest.fn()]
    }),
}));

describe("Typing Dots", () => {
    it('renders TypingDots)', async () => {
        render(<TypingDot/>);
        const typingDot = screen.getByTestId('typing-dot');
        expect(typingDot).toBeInTheDocument();
    });

    it('checks typing dot text content', async () => {
        render(<TypingDot/>);
        const typingDot = screen.getByTestId('typing-dot');
        expect(typingDot).toHaveTextContent(". . .")
        // screen.debug()
    });
});
