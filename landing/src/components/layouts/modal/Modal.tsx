import styled from "styled-components";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { devices } from "../../../styles/devices";
import { ControlContainer } from "../../../styles/global";
import Close from "../../icons/Close";
import Logo from "../../icons/Logo";

interface ModalProps {
    modalContent: JSX.Element;
    headerText?: string;
    hasLogo?: boolean;
}

const ModalWrapper = styled.div`
    position: fixed;
    display: grid;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    background-color: transparent;
    justify-content: center;
    z-index: 9999;
`;

const ModalOverlay = styled.div`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(62, 54, 54, 0.6);
`;

const ModalOuterContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 99999;
    overflow: auto;
    background-color: #141313;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0px;

    @media ${devices.tablet} and (min-height: 480px) {
        border-radius: 16px;
        width: 480px;
        height: auto;
        max-height: 65vh;
    }

    @media ${devices.laptopL} {
        border-radius: 16px;
        width: 540px;
        height: auto;
        max-height: 65vh;
    }
`;

const ModalContainer = styled.div`
    display: grid;
    position: relative;
    grid-template-rows: 60px auto;
    grid-template-columns: 100%;
    z-index: 99999;
    background-color: #141313;
    width: 100%;
    height: 100%;

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) and (max-height: 480px) {
        width: 440px;
    }

    @media ${devices.tablet} and (max-height: 480px) {
        width: 480px;
    }

    @media ${devices.tablet} and (min-height: 480px) {
        width: 100%;
    }

    @media ${devices.laptopL} {
        width: 100%;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    padding-left: 12px;
    padding-right: 12px;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    min-height: 60px;
    gap: 12px;
    width: 100%;
    z-index: 99999;
    overflow: hidden;
    background-color: #141313;
`;

const ModalTitle = styled.div`
    display: block;
    font-weight: 700;
    color: #FFFFFF;
    font-size: inherit;
    width: calc(100% - 48px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ModalLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 48px);
    padding-right: 48px;
`;

const ModalContent = styled.div`
    display: block;
    width: 100%;
`;

const Modal: FunctionComponent<ModalProps> = ({ modalContent, headerText, hasLogo }) => {
    const navigate = useNavigate();

    document.body.classList.add("not-scrolling");

    return (
        <ModalWrapper>
            <ModalOverlay
                role="link"
                aria-label="Exit"
                onClick={() => {
                    if (window.history.length > 2) {
                        navigate(-1);
                    } else {
                        navigate("/");
                    }
                }}
            ></ModalOverlay>
            <ModalOuterContainer>
                <ModalContainer>
                    <ModalHeader>
                        <ControlContainer
                            role="button"
                            title="Close modal"
                            aria-label="Close modal"
                            onClick={() => {
                                if (window.history.length > 2) {
                                    navigate(-1);
                                } else {
                                    navigate("/");
                                }
                            }}
                        >
                            <Close />
                        </ControlContainer>
                        {hasLogo ? (
                            <ModalLogo>
                                <Link to="/" title="Zenith" aria-label="Zenith">
                                    <Logo type="inline" />
                                </Link>
                            </ModalLogo>
                        ) : (
                            <ModalTitle>{headerText}</ModalTitle>
                        )}
                    </ModalHeader>
                    <ModalContent>{modalContent}</ModalContent>
                </ModalContainer>
            </ModalOuterContainer>
        </ModalWrapper>
    );
};

export default Modal;
