export function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

    return formattedDate;
}