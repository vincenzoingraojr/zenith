export const processBirthDate = (date: Date) => {
    let today = new Date().getTime();
    let birthDate = new Date(date).getTime();

    let difference = today - birthDate;
    let yearsDifference = difference / (1000 * 3600 * 24 * 365);

    return yearsDifference;
};

export const processDays = (date: Date) => {
    let today = new Date().getTime();
    let deactivationDate = new Date(date).getTime();

    let difference = today - deactivationDate;

    let daysDifference = difference / (1000 * 3600 * 24);

    return daysDifference;
}