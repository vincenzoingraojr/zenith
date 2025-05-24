import { useSearchParams } from "react-router-dom";
import Head from "../../components/Head";
import Magnifier from "../../components/icons/Magnifier";
import Settings from "../../components/icons/Settings";
import SearchBar from "../../components/layouts/items/search/SearchBar";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import Options, { OptionItem, OptionItemText } from "../../components/Options";
import { useOptions } from "../../components/utils/hooks";
import { OptionBaseIcon, PageText } from "../../styles/global";
import More from "../../components/icons/More";

function SearchPage() {
    const { activeOptions, handleOptionsClick } = useOptions();
    const [_, setSearchParams] = useSearchParams();

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
                        customHeaderComponent={
                            <SearchBar placeholder="Search" onkeyDown={(e: any) => {
                                if (e.key === "Enter") {
                                    setSearchParams({ q: e.target.value });
                                }
                            }} />
                        }
                        children={
                            <>
                                <PageText>Search on Zenith.</PageText>
                            </>
                        }
                        headerIconsComponent={
                            <Options
                                key={0}
                                title="Search options" 
                                icon={<More />}
                                isOpen={activeOptions === 0}
                                toggleOptions={() =>
                                    handleOptionsClick(0)
                                }
                                children={
                                    <>
                                        <OptionItem>
                                            <OptionBaseIcon>
                                                <Magnifier type="options" isActive={false} />
                                            </OptionBaseIcon>
                                            <OptionItemText>
                                                Advanced search
                                            </OptionItemText>
                                        </OptionItem>
                                        <OptionItem>
                                            <OptionBaseIcon>
                                                <Settings type="options" isActive={false} />
                                            </OptionBaseIcon>
                                            <OptionItemText>
                                                Search settings
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