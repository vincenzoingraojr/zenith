import { FunctionComponent } from "react";
import profilePicture from "../../images/profile-picture.png";
import styled from "styled-components";
import { USER_TYPES } from "../../utils/constants";

interface ProfilePictureProps {
    type: string;
    loading: boolean;
    pictureUrl: string;
    title: string;
    size: number;
}

const ProfilePictureContainer = styled.div.attrs(
    (props: { size: number; type: string }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    border-radius: ${(props) =>
        props.type === USER_TYPES.ORGANIZATION
            ? `${props.size / 8}px`
            : "9999px"};

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
    }
`;

const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
    type,
    loading,
    pictureUrl,
    title,
    size,
}) => {
    return (
        <ProfilePictureContainer type={type} size={size}>
            <img
                src={
                    loading || pictureUrl.length === 0
                        ? profilePicture
                        : pictureUrl
                }
                title={title}
                alt={title}
            />
        </ProfilePictureContainer>
    );
};

export default ProfilePicture;
