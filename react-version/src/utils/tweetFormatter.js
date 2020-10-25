export const getUsername = name => {
    const str = "@" + name.replace(" ", "");
    return str.substring(0, str.length-1);
};

export const getTimestamp = epoch => {
    const now = new Date();

    const secondsSince = Math.floor((now - epoch) / 1000);
    if(secondsSince < 60)
        return secondsSince + "s";

    const minutesSince = Math.floor(secondsSince / 60);
    if(minutesSince < 60)
        return minutesSince + "m";

    const hoursSince = Math.floor(minutesSince / 60);
    if(hoursSince < 24)
        return hoursSince + "h";

    const daysSince = Math.floor(hoursSince / 24);
    if(daysSince < 365)
        return daysSince + "d";

    const yearsSince = Math.floor(daysSince / 365);
    return yearsSince + "y";
}