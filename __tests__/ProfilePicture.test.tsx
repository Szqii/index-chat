import {render, screen} from "@testing-library/react";
import {ProfilePicture} from "@/components/global/profile-picture";

describe('Profile Picture', () => {
    it('renders a profile picture component', () => {
        render(<ProfilePicture className={''}/>);
        const profilePictureElement = screen.getByTestId('profile-picture');
        expect(profilePictureElement).toBeInTheDocument();
    });
});
