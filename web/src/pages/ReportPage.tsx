import { useParams } from "react-router-dom";
import ModalLoading from "../components/layouts/modal/ModalLoading";
import styled from "styled-components";
import { NoElementsAlert, PageBlock, PageText, StandardButton, Status } from "../styles/global";
import { useCreateReportMutation, useReportOptionsQuery } from "../generated/graphql";
import ErrorOrItemNotFound from "../components/utils/ErrorOrItemNotFound";
import { useState } from "react";
import Checkmark from "../components/icons/Checkmark";
import { Form, Formik } from "formik";
import { COLORS } from "../styles/colors";
import { BAD_REQUEST_MESSAGE, ERROR_SOMETHING_WENT_WRONG } from "../utils/constants";

const ReportOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 12px;
    padding-bottom: 24px;
`;

const OptionFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const OptionItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    overflow: hidden;
    padding: 16px 24px;
    cursor: pointer;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

const OptionInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 6px;
    max-width: calc(100% - 28px);
`;

const OptionItemText = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    color: ${({ theme }) => theme.color};
`;

const OptionItemDescription = styled(PageText)`
    font-size: 14px;
    color: ${({ theme }) => theme.inputText};
`;

const SelectedOptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SubCategoriesFeed = styled(OptionFeedContainer)`
    padding-left: 36px;
`;

const ReportFormTitle = styled.div`
    display: block;
    font-weight: 800;
    padding-top: 36px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    font-size: 32px;
`;

const ReportButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 24px;
`;

const ReportButton = styled(StandardButton)`
    &:disabled {
        opacity: 0.6;
    }
`;

const CreateReportStatus = styled(Status)`
    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 0px;
`;

function ReportPage() {
    const params = useParams();

    const { data, loading, error } = useReportOptionsQuery({ variables: { type: params.type as string }, fetchPolicy: "cache-and-network" });

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

    const handleCategoryClick = (id: number) => {
        if (selectedCategoryId === id) {
            setSelectedCategoryId(0);
        } else {
            setSelectedCategoryId(id);
            setSelectedSubCategoryId(0);
        }
    };

    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0);

    const handleSubCategoryClick = (id: number) => {
        if (selectedSubCategoryId === id) {
            setSelectedSubCategoryId(0);
        } else {
            setSelectedSubCategoryId(id);
        }
    };

    const [createReport] = useCreateReportMutation();

    return (
        <PageBlock>
            <ReportFormTitle>
                Report this {params.type}
            </ReportFormTitle>
            <ReportOptionsContainer>
                {loading ? (
                    <ModalLoading />
                ) : (
                    <PageBlock>
                        {data && data.reportOptions && !error  ? (
                            <>
                                {data.reportOptions.length === 0 ? (
                                    <NoElementsAlert>
                                        No options available.
                                    </NoElementsAlert>
                                ) : (
                                    <Formik
                                        initialValues={{
                                            contentId: params.contentId,
                                            categoryId: selectedCategoryId,
                                            contentType: params.type,
                                            subCategoryId: selectedSubCategoryId,
                                        }}
                                        onSubmit={async (
                                            _,
                                            { setStatus }
                                        ) => {
                                            const response =
                                                await createReport({
                                                    variables: {
                                                        contentId: params.contentId as string,
                                                        categoryId: selectedCategoryId,
                                                        contentType: params.type as string,
                                                        subCategoryId: selectedCategoryId,
                                                    },
                                                });
        
                                            if (response.data) {
                                                setStatus(
                                                    response.data
                                                        .createReport
                                                        .status
                                                );
        
                                                setSelectedCategoryId(0);
                                                setSelectedSubCategoryId(0);
                                            } else {
                                                setStatus(BAD_REQUEST_MESSAGE);
                                            }
                                        }}
                                    >
                                        {({ status }) => (
                                            <Form>
                                                {status ? (
                                                    <CreateReportStatus>
                                                        {status}
                                                    </CreateReportStatus>
                                                ) : (
                                                    <>
                                                        <OptionFeedContainer>
                                                            {data.reportOptions?.map((option) => (
                                                                <PageBlock key={`option-group-${option.id}`}>
                                                                    <OptionItem
                                                                        key={`option-${option.id}`}
                                                                        onClick={() =>
                                                                            handleCategoryClick(
                                                                                option.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <OptionInfoContainer>
                                                                            <OptionItemText>{option.title}</OptionItemText>
                                                                            {(option.description && option.description.length > 0) && (<OptionItemDescription>{option.description}</OptionItemDescription>)}
                                                                        </OptionInfoContainer>
                                                                        {(selectedCategoryId === option.id) && (
                                                                            <SelectedOptionContainer>
                                                                                <Checkmark color={COLORS.blue} />
                                                                            </SelectedOptionContainer>
                                                                        )}
                                                                    </OptionItem>
                                                                    {selectedCategoryId === option.id && option.subcategories && option.subcategories.length > 0 && (
                                                                        <SubCategoriesFeed>
                                                                            {option.subcategories.map((subOption) => (
                                                                                <OptionItem
                                                                                    key={`option-${subOption.categoryId}_suboption-${subOption.id}`}
                                                                                    onClick={() =>
                                                                                        handleSubCategoryClick(
                                                                                            subOption.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <OptionInfoContainer>
                                                                                        <OptionItemText>{subOption.title}</OptionItemText>
                                                                                        {(subOption.description && subOption.description.length > 0) && (<OptionItemDescription>{subOption.description}</OptionItemDescription>)}
                                                                                    </OptionInfoContainer>
                                                                                    {(selectedSubCategoryId === subOption.id) && (
                                                                                        <SelectedOptionContainer>
                                                                                            <Checkmark color={COLORS.blue} />
                                                                                        </SelectedOptionContainer>
                                                                                    )}
                                                                                </OptionItem>
                                                                            ))}
                                                                        </SubCategoriesFeed>
                                                                    )}
                                                                </PageBlock>
                                                            ))}
                                                        </OptionFeedContainer>
                                                        <ReportButtonContainer>
                                                            <ReportButton
                                                                type="submit"
                                                                title="Create report"
                                                                role="button"
                                                                aria-label="Create report"
                                                                disabled={((selectedCategoryId !== 0 && selectedSubCategoryId !== 0) || (selectedCategoryId !== 0 && data.reportOptions?.find((option) => option.id === selectedCategoryId) && !data.reportOptions.find((option) => option.id === selectedCategoryId)?.subcategories)) ? false : true}
                                                            >
                                                                Create report
                                                            </ReportButton>
                                                        </ReportButtonContainer>
                                                    </>
                                                )}
                                            </Form>
                                        )}
                                    </Formik>
                                )}
                            </>
                        ) : (
                            <ErrorOrItemNotFound
                                isError={true}
                                title={ERROR_SOMETHING_WENT_WRONG.title}
                                content={ERROR_SOMETHING_WENT_WRONG.message}
                            />
                        )}
                    </PageBlock>
                )}
            </ReportOptionsContainer>
        </PageBlock>
    );
}

export default ReportPage;