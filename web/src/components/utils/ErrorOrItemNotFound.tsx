import { FunctionComponent } from "react";
import styled from "styled-components";
import { PageBlock, PageText, StandardButton } from "../../styles/global";
import { useNavigate } from "react-router-dom";

interface ErrorOrItemNotFoundProps {
    title: string;
    content: string;
    isError?: boolean;
}

const ErrorOrItemNotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ErrorOrItemNotFoundInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 48px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;
`;

const ErrorOrItemNotFoundTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;
`;

const ErrorOrItemNotFound: FunctionComponent<ErrorOrItemNotFoundProps> = ({
    title,
    content,
    isError,
}) => {
    const navigate = useNavigate();

    return (
        <ErrorOrItemNotFoundContainer>
            <ErrorOrItemNotFoundInnerContainer>
                <ErrorOrItemNotFoundTitle>{title}</ErrorOrItemNotFoundTitle>
                <PageText>{content}</PageText>
                {isError && (
                    <PageBlock>
                        <StandardButton
                            type="button"
                            role="button"
                            title="Refresh page"
                            aria-label="Refresh page"
                            onClick={() => {
                                navigate(0);
                            }}
                        >
                            Refresh page
                        </StandardButton>
                    </PageBlock>
                )}
            </ErrorOrItemNotFoundInnerContainer>
        </ErrorOrItemNotFoundContainer>
    );
};

export default ErrorOrItemNotFound;
