import { fireEvent, render, screen} from "@testing-library/react";
import {AssistantMessage} from "@/components/chat/assistant-message";

Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
        readText: jest.fn(() => {
            return "Hello"
        })
    }
});

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(() => {
        return [true, jest.fn()]
    }),
}));

describe('Assistant Message', () => {
    it('render a assistant message component', () => {
        render(<AssistantMessage message="Hello" isLast={false}/>);
        const assistantMessage = screen.getByTestId('assistant-message');
        expect(assistantMessage).toBeInTheDocument();
    });
    it('should copy the message', () => {
        render(<AssistantMessage message="Hello" isLast={true}/>);
        const copyMessageButton = screen.getByTestId('copy-message-button');
        expect(copyMessageButton).toBeInTheDocument();
        fireEvent.click(copyMessageButton);
        const clipboardText = navigator.clipboard.readText();
        expect(clipboardText).toBe('Hello');
    });
    it('render copied component', () => {
        render(<AssistantMessage message="Hello" isLast={true}/>);
        const clipboardCheck = screen.getByTestId('clipboard-check');
        expect(clipboardCheck).toBeInTheDocument();
    });
    it('check ai typing status', () => {
        render(<AssistantMessage message="Hello" isLast={true} isTyping={true}/>);
        const typingDot = screen.getByTestId('typing-dot');
        expect(typingDot).toBeInTheDocument();
    });
});
