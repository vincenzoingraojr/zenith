import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { PageBlock, PageContent, PageText, PageTitle } from "../styles/global";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import Magnifier from "../components/icons/magnifier";
import Close from "../components/icons/close";
import Arrow from "../components/icons/arrow";
import Header from "../components/header";

const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SearchBoxHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    background-color: #D6CDCD;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    input[type="text"] {
        color: #000000;
    }

    input[type="text"]::placeholder {
        color: #000000;
        opacity: 1;
    }
`;

const CloseButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 9999px;
    background-color: #386BD9;
    cursor: pointer;
`;

const SearchBoxContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const SearchResult = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 12px;
    border-bottom: 2px solid #000000;
`;

const SearchResultIcon = styled.div`
    display: block;
    transform: rotate(180deg);
    transform-origin: center;
`;

const SearchResultText = styled.div`
    display: block;
    color: #000000;
`;

const SearchPage = () => {
    const { allMdx } = useStaticQuery(
        graphql`
            query {
                allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
                    nodes {
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            date(formatString: "MMMM DD, YYYY")
                            title
                            description
                        }
                    }
                }
            }
        `
    );

    const [value, setValue] = React.useState("");

    const emptyQuery = "";

    const [state, setState] = React.useState({
        filteredData: [],
        query: emptyQuery,
    });

    function handleInputChange(e) {
        const query = e.target.value;
        const posts = allMdx.nodes || [];

        const filteredData = posts.filter((post) => {
            return (
                post.frontmatter.description
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                post.frontmatter.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        });

        setState({
            filteredData,
            query,
        });
    }

    const { filteredData, query } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const posts = hasSearchResults ? filteredData : [];
    const noResults = query !== emptyQuery && posts.length === 0;

    return (
        <>
            <Header />
            <Layout>
                <Seo title="Search for a blog post" />
                <PageContent>
                    <PageTitle>Search</PageTitle>
                    <SearchBox>
                        <SearchBoxHeader>
                            <Magnifier color={"#000000"} />
                            <SearchInputContainer>
                                <input
                                    type="text"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    aria-required
                                    placeholder="Search for a blog post"
                                    aria-label="Search for a blog post"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        handleInputChange(e);
                                    }}
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
                                        setState({
                                            filteredData: [],
                                            query: emptyQuery,
                                        });
                                    }}
                                >
                                    <Close type="small" color={"#000000"} />
                                </CloseButtonContainer>
                            )}
                        </SearchBoxHeader>
                        <SearchBoxContent>
                            {noResults ? (
                                <PageText>No results for "{query}".</PageText>
                            ) : null}
                            {posts.map((post) => {
                                return (
                                    <PageBlock key={post.fields.slug}>
                                        <SearchResult
                                            to={post.fields.slug}
                                            title={post.frontmatter.title}
                                            aria-label={post.frontmatter.title}
                                        >
                                            <SearchResultText>
                                                {post.frontmatter.title}
                                            </SearchResultText>
                                            <SearchResultIcon>
                                                <Arrow color={"#000000"} />
                                            </SearchResultIcon>
                                        </SearchResult>
                                    </PageBlock>
                                );
                            })}
                        </SearchBoxContent>
                    </SearchBox>
                </PageContent>
            </Layout>
        </>
    );
};

export default SearchPage;
