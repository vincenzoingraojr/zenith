export const processBirthDate = (date: Date) => {
    let today = new Date().getTime();
    let birthDate = new Date(date).getTime();

    let difference = today - birthDate;
    let yearsDifference = difference / (1000 * 3600 * 24 * 365);

    return yearsDifference;
};