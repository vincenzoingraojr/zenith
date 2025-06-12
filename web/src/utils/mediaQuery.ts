export const mediaQuery = (...queries: string[]) =>
    `@media ${queries.join(", ")}`;
