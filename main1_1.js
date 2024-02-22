Date.prototype.daysTo = function (otherDate) {
    const differenceMs = Math.abs(this - otherDate);
    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return daysDifference;
};

const d1 = new Date('2024-02-14');
const d2 = new Date('2024-02-20');

console.log(d1.daysTo(d2)); // Output: 5