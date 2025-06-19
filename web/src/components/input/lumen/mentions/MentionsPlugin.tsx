import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    LexicalTypeaheadMenuPlugin,
    QueryMatch,
    TypeaheadOption,
    useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { TextNode } from "lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { $createMentionNode } from "./MentionNode";
import { User, useUsersToMentionQuery } from "../../../../generated/graphql";
import VerificationBadge from "../../../utils/VerificationBadge";
import AffiliationIcon from "../../../utils/AffiliationIcon";
import ProfilePicture from "../../../utils/ProfilePicture";

const MentionsMenuContainer = styled.div`
    display: block;
    background: ${({ theme }) => theme.background};
    width: 100%;
`;

const MentionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 200px;
    overflow-y: auto;
`;

const MentionItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    outline: none;
    cursor: pointer;
    padding: 12px;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);

    &.selected {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const MentionUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

const MentionNameContainer = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: clip;
    gap: 8px;
`;

const MentionName = styled.div`
    display: block;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
`;

const MentionUsername = styled.div`
    display: block;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    font-weight: 400;
    color: ${({ theme }) => theme.inputText};
`;

const PUNCTUATION =
    "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";
const NAME = "\\b[A-Z][^\\s" + PUNCTUATION + "]";

const DocumentMentionsRegex = {
    NAME,
    PUNCTUATION,
};

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ["@"].join("");

const VALID_CHARS = "[^" + TRIGGERS + PUNC + "\\s]";

const VALID_JOINS = "(?:" + "\\.[ |$]|" + " |" + "[" + PUNC + "]|" + ")";

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
    "(^|\\s|\\()(" +
        "[" +
        TRIGGERS +
        "]" +
        "((?:" +
        VALID_CHARS +
        VALID_JOINS +
        "){0," +
        LENGTH_LIMIT +
        "})" +
        ")$"
);

const ALIAS_LENGTH_LIMIT = 50;

const AtSignMentionsRegexAliasRegex = new RegExp(
    "(^|\\s|\\()(" +
        "[" +
        TRIGGERS +
        "]" +
        "((?:" +
        VALID_CHARS +
        "){0," +
        ALIAS_LENGTH_LIMIT +
        "})" +
        ")$"
);

const SUGGESTION_LIST_LENGTH_LIMIT = 5;

function checkForAtSignMentions(
    text: string,
    minMatchLength: number
): QueryMatch | null {
    let match = AtSignMentionsRegex.exec(text);

    if (match === null) {
        match = AtSignMentionsRegexAliasRegex.exec(text);
    }
    if (match !== null) {
        const maybeLeadingWhitespace = match[1];

        const matchingString = match[3];
        if (matchingString.length >= minMatchLength) {
            return {
                leadOffset: match.index + maybeLeadingWhitespace.length,
                matchingString,
                replaceableString: match[2],
            };
        }
    }
    return null;
}

function getPossibleQueryMatch(text: string): QueryMatch | null {
    const match = checkForAtSignMentions(text, 1);
    return match;
}

class MentionTypeaheadOption extends TypeaheadOption {
    id: number;
    name: string;
    username: string;
    avatar: string;
    type: string;
    verified: boolean;

    constructor(
        id: number,
        name: string,
        username: string,
        avatar: string,
        type: string,
        verified: boolean
    ) {
        super(username);
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatar = avatar;
        this.type = type;
        this.verified = verified;
    }
}

function MentionsTypeaheadMenuItem({
    index,
    isSelected,
    onClick,
    onMouseEnter,
    option,
}: {
    index: number;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    option: MentionTypeaheadOption;
}) {
    let className = "item";
    if (isSelected) {
        className += " selected";
    }

    return (
        <MentionItem
            key={option.key}
            tabIndex={-1}
            className={className}
            ref={option.setRefElement}
            role="option"
            aria-selected={isSelected}
            id={"typeahead-item-" + index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
        >
            <ProfilePicture
                loading={false}
                pictureUrl={option.avatar}
                type={option.type}
                size={32}
                title={option.name}
            />
            <MentionUserInfo>
                <MentionNameContainer>
                    <MentionName>{option.name}</MentionName>
                    {option.verified && (
                        <VerificationBadge type={option.type} size={18} />
                    )}
                    <AffiliationIcon
                        userId={option.id}
                        size={18}
                        noAction={true}
                    />
                </MentionNameContainer>
                <MentionUsername>@{option.username}</MentionUsername>
            </MentionUserInfo>
        </MentionItem>
    );
}

type UserMention = {
    id: number;
    name: string;
    username: string;
    avatar: string;
    type: string;
    verified: boolean;
};

export default function MentionsPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    const [queryString, setQueryString] = useState<string>("");

    const [mentionData, setMentionData] = useState<UserMention[]>([]);

    const { data } = useUsersToMentionQuery({
        variables: { query: queryString, limit: 5 },
        fetchPolicy: "cache-and-network",
    });

    useEffect(() => {
        if (data && data.usersToMention) {
            const rawUsers = data.usersToMention;
            const users: UserMention[] = [];

            rawUsers.map((user: User) =>
                users.push({
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    avatar: user.profile.profilePicture,
                    type: user.type,
                    verified: user.verification.verified === "VERIFIED",
                })
            );

            setMentionData(users);
        }

        return () => {
            setMentionData([]);
        };
    }, [data]);

    const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
        minLength: 0,
    });

    const options = useMemo(
        () =>
            mentionData
                .map(({ id, name, username, avatar, type, verified }) => {
                    return new MentionTypeaheadOption(
                        id,
                        name,
                        username,
                        avatar,
                        type,
                        verified
                    );
                })
                .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
        [mentionData]
    );

    const onSelectOption = useCallback(
        (
            selectedOption: MentionTypeaheadOption,
            nodeToReplace: TextNode | null,
            closeMenu: () => void
        ) => {
            editor.update(() => {
                const mentionNode = $createMentionNode(
                    "@" + selectedOption.username
                );
                if (nodeToReplace) {
                    nodeToReplace.replace(mentionNode);
                }
                mentionNode.select();
                closeMenu();
            });
        },
        [editor]
    );

    const checkForMentionMatch = useCallback(
        (text: string) => {
            const mentionMatch = getPossibleQueryMatch(text);
            const slashMatch = checkForSlashTriggerMatch(text, editor);
            return !slashMatch && mentionMatch ? mentionMatch : null;
        },
        [checkForSlashTriggerMatch, editor]
    );

    return (
        <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
            onQueryChange={(matchingString) =>
                setQueryString(matchingString ?? "")
            }
            onSelectOption={onSelectOption}
            triggerFn={checkForMentionMatch}
            options={options}
            menuRenderFn={(
                _,
                { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
            ) =>
                mentionData.length > 0 ? (
                    <MentionsMenuContainer>
                        <MentionsContainer>
                            {options.map((option, i: number) => (
                                <MentionsTypeaheadMenuItem
                                    index={i}
                                    isSelected={selectedIndex === i}
                                    onClick={() => {
                                        setHighlightedIndex(i);
                                        selectOptionAndCleanUp(option);
                                    }}
                                    onMouseEnter={() => {
                                        setHighlightedIndex(i);
                                    }}
                                    key={option.key}
                                    option={option}
                                />
                            ))}
                        </MentionsContainer>
                    </MentionsMenuContainer>
                ) : null
            }
        />
    );
}
