import Head from "../../components/Head";
import Magnifier from "../../components/icons/Magnifier";
import Settings from "../../components/icons/Settings";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import Options, { OptionItem, OptionItemIcon, OptionItemText } from "../../components/Options";
import { useOptions } from "../../components/utils/hooks";
import { PageText } from "../../styles/global";

function SearchPage() {
    const { activeOptions, handleOptionsClick } = useOptions();

    return (
        <>
            <Head 
                title="Search | Zenith"
                description="Discover new things on Zenith."
            />
            <PageLayout 
                children={
                    <PageContentLayout
                        title="Search"
                        type="main"
                        customHeaderComponent={<>SearchBar</>}
                        children={
                            <>
                                <PageText>Search on Zenith.</PageText>
                            </>
                        }
                        headerIconsComponent={
                            <Options
                                key={0}
                                title="Search options" 
                                icon={<Settings type="options" />}
                                isOpen={activeOptions === 0}
                                toggleOptions={() =>
                                    handleOptionsClick(0)
                                }
                                children={
                                    <>
                                        <OptionItem>
                                            <OptionItemIcon>
                                                <Magnifier type="options" isActive={false} />
                                            </OptionItemIcon>
                                            <OptionItemText>
                                                Advanced search
                                            </OptionItemText>
                                        </OptionItem>
                                    </>
                                }
                            />
                        }
                    />
                }
            />
        </>
    );
}

export default SearchPage;