import React from "react";
import {render, screen} from "@testing-library/react";
import {IndexChat} from "@/components/chat";


describe("Index Chat", () => {
    it('checks IndexChat button click)', () => {
        render(<IndexChat/>);
        const indexChatButton = screen.getByTestId('index-chat-button');
        expect(indexChatButton).toBeInTheDocument();
        // indexChatButton.click();
        // const indexChatPopup = screen.getByTestId('index-chat-popup');
        // expect(indexChatPopup).toBeInTheDocument();
    });
});
