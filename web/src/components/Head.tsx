import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface HeadProps {
    title: string;
    description?: string;
    image?: string;
}

const Head: FunctionComponent<HeadProps> = ({ title, description, image }) => {
    const defaultDescription = "The everything app. Find out what's happening in the world in real time, chat and make video calls with whoever you want. Send and receive money.";
    const defaultImage = "https://img.zncdn.net/brand/logo.png";

    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={description ? description : defaultDescription} />
            <meta property="og:description" content={description ? description : defaultDescription} />
            <meta property="og:image" content={image ? image : defaultImage} />
        </Helmet>
    );
};

export default Head;