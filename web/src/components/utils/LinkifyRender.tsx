import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface RenderLinkProps {
    attributes: any;
    content: any;
}

export const renderLink: FunctionComponent<RenderLinkProps> = ({
    attributes,
    content,
}) => {
    const { href, ...props } = attributes;
    return (
        <Link to={href} {...props}>
            {content}
        </Link>
    );
};