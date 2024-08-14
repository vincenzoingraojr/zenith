import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface SeoProps {
    title: string;
    description: string;
}

export const SEO: FunctionComponent<SeoProps> = ({
    title,
    description,
}) => {
    
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
};
