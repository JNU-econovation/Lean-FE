export const formatDDay = (timestamp) => {
    if (!timestamp) {
        return '유효하지 않은 날짜';
    }
    const now = new Date();
    const targetTime = new Date(timestamp);

    const difference = targetTime - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let result = '';
    if (days > 0) result += `${days}D`;
    if (hours > 0 || days === 0) result += ` ${hours}H`;

    return result;
}

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export const formatOverDate = (timestamp) => {
    const now = new Date();
    const targetTime = new Date(timestamp);

    const difference = now - targetTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let result = '';
    if (days > 0) result += `${days}D`;
    if (hours > 0 || days === 0) result += ` ${hours}H`;

    return result;
}