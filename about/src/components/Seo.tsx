import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface SeoProps {
    title: string;
    description: string;
    image?: string;
}

export const SEO: FunctionComponent<SeoProps> = ({
    title,
    description,
    image,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:image"
                content={
                    image
                        ? image
                        : "https://img.zncdn.net/brand/logo-alt.png"
                }
            />
        </Helmet>
    );
};
