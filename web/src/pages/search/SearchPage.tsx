import { useSearchParams } from "react-router-dom";
import Head from "../../components/Head";
import Magnifier from "../../components/icons/Magnifier";
import Settings from "../../components/icons/Settings";
import SearchBar from "../../components/layouts/items/search/SearchBar";
import PageLayout from "../../components/layouts/PageLayout";
import PageContentLayout from "../../components/layouts/sublayouts/PageContentLayout";
import Options from "../../components/layouts/options/Options";
import { useOptions } from "../../components/utils/hooks";
import { PageText } from "../../styles/global";
import More from "../../components/icons/More";
import OptionComponent from "../../components/layouts/options/OptionComponent";

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
                            <SearchBar
                                placeholder="Search"
                                onkeyDown={(e: any) => {
                                    if (e.key === "Enter") {
                                        setSearchParams({ q: e.target.value });
                                    }
                                }}
                            />
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
                                toggleOptions={() => handleOptionsClick(0)}
                                children={
                                    <>
                                        <OptionComponent
                                            title="Advanced search"
                                            onClick={() => {}}
                                            icon={
                                                <Magnifier
                                                    type="options"
                                                    isActive={false}
                                                />
                                            }
                                            text="Advanced search"
                                        />
                                        <OptionComponent
                                            title="Search settings"
                                            onClick={() => {}}
                                            icon={
                                                <Settings
                                                    type="options"
                                                    isActive={false}
                                                />
                                            }
                                            text="Search settings"
                                        />
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
