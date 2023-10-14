import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {IndexChat} from "@/components/chat";

jest.mock("../src/components/chat/chat-popup", () => ({
    ChatPopup: () => {
        return <div data-testid="index-chat-popup"/>;
    },
}));

describe("Index Chat", () => {
    it('checks IndexChat button click)', async () => {
        render(<IndexChat/>);
        const indexChatButton = screen.getByTestId('index-chat-button');

        expect(indexChatButton).toBeInTheDocument();
        fireEvent.click(indexChatButton);

        await waitFor(() => {
            expect(screen.getByTestId('index-chat-popup')).toBeInTheDocument();
        })
    });
});
