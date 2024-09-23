import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS_TRACKING_ID!);
};

export const logPageView = (path: string) => {
    ReactGA.send({ hitType: "pageview", page: path });
};
