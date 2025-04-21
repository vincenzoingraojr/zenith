import { FunctionComponent } from "react";
import lumen from "@zenith-to/lumen-js";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { PageText } from "../../styles/global";

interface TextContainerRenderProps {
    content: string;
}

const microOptions = {
    usernameUrlBase: "/",
    usernameIncludeSymbol: true,
    hashtagUrlBase: "/search?q=%23",
    target: "_blank",
};

function handleClick(e: any) {
    e.stopPropagation();
}

const TextContainerRender: FunctionComponent<TextContainerRenderProps> = ({
    content,
}) => {
    const parts = content.split("\n");

    const options = {
        replace: (domNode: any) => {
            if (domNode.name === "a" && domNode.attribs.class) {
                if (domNode.attribs.class.includes("username")) {
                    return (
                        <Link
                            to={domNode.attribs.href}
                            className={domNode.attribs.class}
                            data-screen-name={
                                domNode.attribs["data-screen-name"]
                            }
                            rel={domNode.attribs.rel}
                            onClick={handleClick}
                        >
                            {domNode.children[0].data}
                        </Link>
                    );
                } else if (domNode.attribs.class.includes("hashtag")) {
                    return (
                        <Link
                            to={domNode.attribs.href}
                            title={domNode.attribs.title}
                            className={domNode.attribs.class}
                            rel={domNode.attribs.rel}
                            onClick={handleClick}
                        >
                            {domNode.children[0].data}
                        </Link>
                    );
                } else {
                    return (
                        <a
                            href={domNode.attribs.href}
                            className={domNode.attribs.class}
                            rel={domNode.attribs.rel}
                            target={domNode.attribs.target}
                            onClick={handleClick}
                        >
                            {domNode.children[0].data}
                        </a>
                    );
                }
            }
            return;
        },
    };

    return (
        <>
            {parts.map((part, index) => (
                <PageText key={index}>
                    {parse(
                        lumen.autoLink(lumen.htmlEscape(part), microOptions),
                        options
                    )}
                </PageText>
            ))}
        </>
    );
};

export default TextContainerRender;