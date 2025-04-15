import styled from "styled-components";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { devices } from "../../../styles/devices";
import { ControlContainer } from "../../../styles/global";
import Close from "../../icons/Close";
import Logo from "../../icons/Logo";
import { LayoutProps } from "../common";
import Back from "../../icons/Back";

interface ModalProps extends LayoutProps {
    headerText?: string;
    hasLogo?: boolean;
    isBack?: boolean;
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
    background-color: ${({ theme }) => theme.opaqueGrey};
`;

const ModalOuterContainer = styled.div`
    display: flex;
    justify-content: center;
    z-index: 99999;
    overflow: auto;
    background-color: ${({ theme }) => theme.background};
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0px;

    @media ${devices.tablet} and (min-height: 480px) {
        border-radius: 16px;
        width: 472px;
        height: auto;
        max-height: 65vh;
    }

    @media ${devices.laptopM} {
        border-radius: 16px;
        width: 580px;
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
    background-color: ${({ theme }) => theme.background};
    width: 100%;
    height: 100%;

    @media ${devices.mobileL} {
        width: 360px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} and (max-height: 480px) {
        width: 472px;
    }

    @media ${devices.tablet} and (min-height: 480px) {
        width: 100%;
    }

    @media ${devices.laptopM} {
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
    background-color: ${({ theme }) => theme.background};
`;

const ModalTitle = styled.div`
    display: block;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
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

const Modal: FunctionComponent<ModalProps> = ({ children, headerText, isBack = false, hasLogo = false }) => {
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
                            {isBack ? (
                                <Back />
                            ) : (
                                <Close type="normal" />
                            )}
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
                    <ModalContent>{children}</ModalContent>
                </ModalContainer>
            </ModalOuterContainer>
        </ModalWrapper>
    );
};

export default Modal;
