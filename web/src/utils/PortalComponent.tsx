import { FunctionComponent, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
    children: ReactNode;
}

const PortalComponent: FunctionComponent<PortalProps> = ({ children }) => {
    const portalRoot = document.getElementById("root");

    if (!portalRoot) {
        console.error("Portal root element not found.");
        
        return null;
    }

    return ReactDOM.createPortal(children, portalRoot);
};

export default PortalComponent;
