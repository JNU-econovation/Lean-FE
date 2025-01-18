export const formatTimeDifference = (timestamp) => {
    if (!timestamp) {
        return '유효하지 않은 날짜';
    }
    const now = new Date();
    const targetTime = new Date(timestamp);

    if (targetTime > now) {
        return '만료되었습니다';
    }

    const difference = now - targetTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let result = '';
    if (days > 0) result += `${days}D`;
    if (hours > 0 || days === 0) result += ` ${hours}H`;

    return result;
}
