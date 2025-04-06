// function to format numbers 
const formatNumber = (num) => {
    if (num < 1000) {
        return num.toString(); // Return as-is for numbers less than 1000
    } else if (num >= 1000 && num < 1_000_000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // Convert to 'k' format
    } else if (num >= 1_000_000 && num < 1_000_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Convert to 'M' format
    } else if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Convert to 'B' format
    }

}

export default formatNumber;