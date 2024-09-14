import { renderLink } from "../components/utils/LinkifyRender";

export const linkifyOptions = {
    target: "_blank",
    render: renderLink,
    defaultProtocol: "https",
};
