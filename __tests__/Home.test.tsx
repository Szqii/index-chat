import {render, screen} from "@testing-library/react";

import Home from "@/app/page";

describe("Home", () => {
    it('renders a index chat component', () => {
        render(<Home/>);
        const indexChat = screen.getByTestId('index-chat-button');
        expect(indexChat).toBeInTheDocument();
    });
});
