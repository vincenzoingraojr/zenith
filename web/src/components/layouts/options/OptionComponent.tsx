import { FunctionComponent } from "react";
import styled from "styled-components";
import { OptionBaseIcon, OptionBaseItem, PageText } from "../../../styles/global";
import { COLORS } from "../../../styles/colors";

interface OptionComponentProps {
    title: string;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
    isRed?: boolean;
    icon: JSX.Element;
    text: string;
}

const OptionItem = styled(OptionBaseItem)`
    justify-content: flex-start;
    gap: 16px;
    padding: 12px 16px;
    font-weight: 700;
`;

const OptionItemText = styled(PageText).attrs(
    (props: { isRed?: boolean }) => props
)`
    font-weight: inherit;
    color: ${({ theme, isRed }) => (isRed ? COLORS.red : theme.color)};
`;

const OptionComponent: FunctionComponent<OptionComponentProps> = ({ title, onClick, icon, text, isRed }) => {
    return (
        <OptionItem
            role="menuitem"
            title={title}
            aria-label={title}
            onClick={onClick}
        >
            <OptionBaseIcon>
                {icon}
            </OptionBaseIcon>
            <OptionItemText
                isRed={isRed}
            >
                {text}
            </OptionItemText>
        </OptionItem>
    );
}

export default OptionComponent;