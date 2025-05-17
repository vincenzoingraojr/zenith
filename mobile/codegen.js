module.exports = {
    schema: "http://localhost:4000/graphql",
    documents: ["../shared/graphql/**/*.graphql"],
    overwrite: true,
    generates: {
        "./src/generated/graphql.tsx": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
                apolloReactHooksImportFrom: "@apollo/client",
            },
        },
    },
};
