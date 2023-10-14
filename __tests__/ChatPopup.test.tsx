import React from "react";
import {render, screen} from "@testing-library/react";
import {ChatPopup} from "@/components/chat/chat-popup";

Element.prototype.scrollTo = jest.fn()
describe("Chat Popup", () => {
    it('render a chat popup component', () => {
        const hideChatPopup = jest.fn()
        render(<ChatPopup hideChatPopup={hideChatPopup}/>);
        const chatPopup = screen.getByTestId('index-chat-popup');
        expect(chatPopup).toBeInTheDocument();
    });
    it('should unmount chat popup component', () => {
    });
});
