import { useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import { ControlContainer, PageText } from "../../styles/global";
import Settings from "../../components/icons/Settings";

function Payments() {
    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Payments | Zenith"
                description="In this page you can create and manage your payments."
            />
            <PageLayout
                children={
                    <PageContentLayout
                        title="Payments"
                        type="main"
                        children={
                            <>
                                <PageText>Payments.</PageText>
                            </>
                        }
                        headerIconsComponent={
                            <ControlContainer
                                role="link"
                                title="Payment settings"
                                aria-label="Payment settings"
                                onClick={() => {
                                    navigate("/settings/payments");
                                }}
                            >
                                <Settings type="options" />
                            </ControlContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default Payments;
