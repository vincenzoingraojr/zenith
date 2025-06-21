import { ApolloError } from "@apollo/client";
import { FunctionComponent, useEffect, useRef } from "react";
import {
    EndContainer,
    FeedLoading,
    NoElementsAlert,
    PageBlock,
} from "../../styles/global";
import LoadingComponent from "./LoadingComponent";
import ErrorOrItemNotFound from "./ErrorOrItemNotFound";
import { ERROR_SOMETHING_WENT_WRONG } from "../../utils/constants";

interface FeedComponentProps {
    feedContent: JSX.Element;
    loading: boolean;
    error: ApolloError | undefined;
    loadMore: () => void;
    noElementsText: string;
    isFeedEmpty: boolean;
}

const FeedComponent: FunctionComponent<FeedComponentProps> = ({
    feedContent,
    loading,
    error,
    loadMore,
    noElementsText,
    isFeedEmpty,
}) => {
    const endContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const current = endContainerRef.current;

        if (!current) return;

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading) {
                loadMore();
            }
        }, options);

        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [loadMore, endContainerRef, loading]);

    return (
        <>
            {isFeedEmpty ? (
                <NoElementsAlert>{noElementsText}</NoElementsAlert>
            ) : (
                <>
                    {feedContent}
                    {loading || error ? (
                        <>
                            {error ? (
                                <ErrorOrItemNotFound
                                    isError={true}
                                    title={ERROR_SOMETHING_WENT_WRONG.title}
                                    content={ERROR_SOMETHING_WENT_WRONG.message}
                                />
                            ) : (
                                <FeedLoading>
                                    <LoadingComponent />
                                </FeedLoading>
                            )}
                        </>
                    ) : (
                        <PageBlock ref={endContainerRef}>
                            <EndContainer>⋅</EndContainer>
                        </PageBlock>
                    )}
                </>
            )}
        </>
    );
};

export default FeedComponent;
