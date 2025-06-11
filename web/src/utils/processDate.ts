export const processDate = (
    date: string,
    capitalize: boolean,
    short: boolean
) => {
    let today = new Date().getTime();
    let givenDate = parseInt(date);

    let difference = today - givenDate;
    let daysDifference = difference / (1000 * 3600 * 24);

    if (daysDifference >= 1 && daysDifference <= 365) {
        if (short) {
            return `${daysDifference.toFixed(0)}d`;
        } else {
            return `${daysDifference.toFixed(0)} ${
                parseInt(daysDifference.toFixed(0)) > 1 ? "days" : "day"
            } ago`;
        }
    } else if (daysDifference > 365) {
        if (short) {
            return `${(daysDifference / 365).toFixed(0)}y`;
        } else {
            return `${(daysDifference / 365).toFixed(0)} ${
                parseInt((daysDifference / 365).toFixed(0)) > 1
                    ? "years"
                    : "year"
            } ago`;
        }
    } else {
        if (daysDifference * 24 < 1) {
            if (daysDifference * 24 * 60 < 1) {
                if (short) {
                    return "Now";
                } else if (capitalize) {
                    return "Just now";
                } else {
                    return "just now";
                }
            } else {
                if (short) {
                    return `${(daysDifference * 24 * 60).toFixed(0)}m`;
                } else {
                    return `${(daysDifference * 24 * 60).toFixed(0)} ${
                        parseInt((daysDifference * 24 * 60).toFixed(0)) > 1
                            ? "minutes"
                            : "minute"
                    } ago`;
                }
            }
        } else {
            if (short) {
                return `${(daysDifference * 24).toFixed(0)}h`;
            } else {
                return `${(daysDifference * 24).toFixed(0)} ${
                    parseInt((daysDifference * 24).toFixed(0)) > 1
                        ? "hours"
                        : "hour"
                } ago`;
            }
        }
    }
};

export const getDateToLocaleString = (timestamp: string) => {
    return new Date(parseInt(timestamp)).toLocaleString(
        "en-us",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}