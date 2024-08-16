import * as React from "react";
import {
    PageBlock,
    PageContent,
    PageText,
    PageTitle,
    Button,
} from "../styles/global";
import Layout from "../components/layout";
import Seo from "../components/seo";
import styled from "styled-components";
import Header from "../components/header";

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    form {
        display: block;
    }
`;

const ContactButton = styled(Button)`
    background-color: #386BD9;
    color: #FFFFFF;
`;

const InputField = styled.div`
    display: block;
    flex-direction: column;
    background-color: #D6CDCD;
    padding-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 8px;
    border-radius: 6px;

    input::placeholder,
    textarea::placeholder {
        opacity: 1;
        color: #000000;
    }
`;

const InputFieldLabel = styled.label`
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 8px;
    cursor: pointer;
    vertical-align: text-top;
`;

const ContactPage = () => {
    return (
        <>
            <Header />
            <Layout>
                <Seo
                    title="Contact us"
                    description="In this page you will find all the methods to contact us."
                />
                <PageContent>
                    <PageTitle>Contact us</PageTitle>
                    <PageText>
                        If you need to contact us,
                        please fill out the form below or email us at{" "}
                        <a
                            href="mailto:info@zenith.to"
                            title="Our email address"
                            aria-label="Our email address"
                        >
                            info@zenith.to
                        </a>
                        .
                    </PageText>
                    <PageBlock>
                        <form
                            name="contact-form"
                            method="POST"
                            data-netlify="true"
                            action="/response/"
                        >
                            <FormContent>
                                <input
                                    type="hidden"
                                    name="form-name"
                                    value="contact-form"
                                />
                                <InputField>
                                    <InputFieldLabel htmlFor="name">
                                        Full name
                                    </InputFieldLabel>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <InputFieldLabel htmlFor="email">
                                        Email
                                    </InputFieldLabel>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <InputFieldLabel htmlFor="subject">
                                        Subject
                                    </InputFieldLabel>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Write the message subject"
                                        required
                                    />
                                </InputField>
                                <InputField>
                                    <InputFieldLabel htmlFor="message">
                                        Message
                                    </InputFieldLabel>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Write the message"
                                        rows={3}
                                    ></textarea>
                                </InputField>
                                <PageBlock>
                                    <ContactButton type="submit">
                                        Send
                                    </ContactButton>
                                </PageBlock>
                            </FormContent>
                        </form>
                    </PageBlock>
                </PageContent>
            </Layout>
        </>
    );
};

export default ContactPage;

