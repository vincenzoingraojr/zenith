import styled from "styled-components";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import {
    LinkOptionBaseItem,
    OptionBaseIcon,
    PageText,
} from "../../styles/global";
import { Link } from "react-router-dom";
import Chevron from "../../components/icons/Chevron";

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SettingsEntry = styled(LinkOptionBaseItem)`
    a {
        justify-content: space-between;
        gap: 12px;
        padding: 16px;
    }
`;

function SettingsPage() {
    return (
        <>
            <Head
                title="Settings | Zenith"
                description="In this page you can manage your account settings."
            />
            <PageLayout
                noNav={true}
                children={
                    <PageContentLayout
                        title="Settings"
                        type="default"
                        children={
                            <SettingsContainer>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/account"
                                        title="Your account"
                                        aria-label="Your account"
                                    >
                                        <PageText>Your account</PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/security_and_account_access"
                                        title="Security and account access"
                                        aria-label="Security and account access"
                                    >
                                        <PageText>
                                            Security and account access
                                        </PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/privacy"
                                        title="Privacy"
                                        aria-label="Privacy"
                                    >
                                        <PageText>Privacy</PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/notifications"
                                        title="Notifications"
                                        aria-label="Notifications"
                                    >
                                        <PageText>Notifications</PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/payments"
                                        title="Payments"
                                        aria-label="Payments"
                                    >
                                        <PageText>Payments</PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/organizations"
                                        title="Organizations on Zenith"
                                        aria-label="Organizations on Zenith"
                                    >
                                        <PageText>
                                            Organizations on Zenith
                                        </PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                                <SettingsEntry>
                                    <Link
                                        to="/settings/about"
                                        title="Additional resources"
                                        aria-label="Additional resources"
                                    >
                                        <PageText>
                                            Additional resources
                                        </PageText>
                                        <OptionBaseIcon>
                                            <Chevron direction="right" />
                                        </OptionBaseIcon>
                                    </Link>
                                </SettingsEntry>
                            </SettingsContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default SettingsPage;
