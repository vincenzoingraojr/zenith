import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/style.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_SERVER_ORIGIN}/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
);
