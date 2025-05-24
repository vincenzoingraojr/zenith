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
import profilePicture from "../../../../images/profile-picture.png";
import { useFindUserQuery, User, useUsersToMessageQuery } from "../../../../generated/graphql";
import { useFindVerification } from "../../../../utils/userQueries";
import VerificationBadge from "../../../utils/VerificationBadge";

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

const MentionImageContainer = styled.div`
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 16px;

    img {
        display: block;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        object-fit: cover;
        object-position: center;
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

const mentionsCache = new Map();

const usersLookupService = {
    search(
        string: string,
        mentionData: any,
        callback: (results: Array<any>) => void
    ): void {
        setTimeout(() => {
            const results = mentionData.filter(
                (mention: any) => (
                    mention.name.toLowerCase().includes(string.toLowerCase()),
                    mention.username
                        .toLowerCase()
                        .includes(string.toLowerCase())
                )
            );
            callback(results);
        }, 500);
    },
};

function useMentionLookupService(
    mentionString: string | null,
    mentionData: any
) {
    const [results, setResults] = useState<Array<any>>([]);

    useEffect(() => {
        const cachedResults = mentionsCache.get(mentionString);

        if (mentionString == null) {
            setResults([]);
            return;
        }

        if (cachedResults === null) {
            return;
        } else if (cachedResults !== undefined) {
            setResults(cachedResults);
            return;
        }

        mentionsCache.set(mentionString, null);
        usersLookupService.search(mentionString, mentionData, (newResults) => {
            mentionsCache.set(mentionString, newResults);
            setResults(newResults);
        });
    }, [mentionString, mentionData]);

    return results;
}

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
    name: string;
    username: string;
    avatar: string;

    constructor(name: string, username: string, avatar: string) {
        super(username);
        this.name = name;
        this.username = username;
        this.avatar = avatar;
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

    const { data } = useFindUserQuery({ variables: { username: option.username }, fetchPolicy: "cache-first" });

    const { userVerified, verifiedSince } = useFindVerification(data?.findUser?.id as number, data?.findUser?.type as string);

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
            <MentionImageContainer>
                <img
                    src={
                        option.avatar && option.avatar.length > 0
                            ? option.avatar
                            : profilePicture
                    }
                    alt={option.name}
                />
            </MentionImageContainer>
            <MentionUserInfo>
                <MentionNameContainer>
                    <MentionName>{option.name}</MentionName>
                        {userVerified && (
                            <VerificationBadge
                                type={data?.findUser?.type as string}
                                verifiedSince={verifiedSince}
                                size={18}
                            />
                        )}
                </MentionNameContainer>
                <MentionUsername>@{option.username}</MentionUsername>
            </MentionUserInfo>
        </MentionItem>
    );
}

type UserMention = {
    id: number;
    name: string;
    link: string;
    username: string;
    avatar: string;
}

export default function MentionsPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    const [queryString, setQueryString] = useState<string | null>(null);

    const [mentionData, setMentionData] = useState<UserMention[]>([]);
    
    const { data } = useUsersToMessageQuery({ fetchPolicy: "cache-and-network" });

    useEffect(() => {
        if (data && data.usersToMessage) {
            const rawUsers = data.usersToMessage;
            const users: UserMention[] = [];

            rawUsers.map((user: User) => (
                users.push({
                    id: user.id,
                    name: user.name,
                    link: "/" + user.username,
                    username: user.username,
                    avatar: user.profile.profilePicture,
                })
            ));

            setMentionData(users);
        }
    }, [data]);

    const results = useMentionLookupService(queryString, mentionData);

    const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
        minLength: 0,
    });

    const options = useMemo(
        () =>
            results
                .map(({ name, username, avatar }) => {
                    return new MentionTypeaheadOption(name, username, avatar);
                })
                .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
        [results]
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
            onQueryChange={setQueryString}
            onSelectOption={onSelectOption}
            triggerFn={checkForMentionMatch}
            options={options}
            menuRenderFn={(
                _,
                { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
            ) =>
                results.length > 0
                    ? (
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
                    )
                    : null
            }
        />
    );
}