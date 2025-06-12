import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../../../styles/colors";
import Magnifier from "../../../icons/Magnifier";
import { useSearchParams } from "react-router-dom";
import Close from "../../../icons/Close";

interface SearchBarProps {
    placeholder: string;
    onkeyDown?: (e: any) => void;
}

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

const SearchBoxHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 40px;
    background-color: ${({ theme }) => theme.inputBackground};
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 24px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    width: auto;
`;

const CloseButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${COLORS.blue};
    cursor: pointer;
`;

const SearchBar: FunctionComponent<SearchBarProps> = ({
    placeholder,
    onkeyDown,
}) => {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("q") || "");

    return (
        <SearchBox>
            <SearchBoxHeader>
                <Magnifier type="small" isActive={false} />
                <SearchInputContainer>
                    <input
                        type="search"
                        autoCapitalize="none"
                        spellCheck="false"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-required
                        id="search-input"
                        name="search-input"
                        placeholder={placeholder}
                        aria-label={placeholder}
                        value={value}
                        onChange={(e: any) => {
                            setValue(e.target.value);
                        }}
                        onKeyDown={onkeyDown}
                    />
                </SearchInputContainer>
                {value && (
                    <CloseButtonContainer
                        role="button"
                        tabIndex={0}
                        title="Clear search input"
                        aria-label="Clear search input"
                        onMouseDown={() => {
                            setValue("");
                        }}
                    >
                        <Close type="small" />
                    </CloseButtonContainer>
                )}
            </SearchBoxHeader>
        </SearchBox>
    );
};

export default SearchBar;
