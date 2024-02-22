function orderByTotal(sales) {
    const orderedSales = [];

    for (const sale of sales) {
        const total = sale.amount * sale.quantity;

        // Create a new object with the original properties plus the Total
        const orderedSale = {
            amount: sale.amount,
            quantity: sale.quantity,
            Total: total
        };

        orderedSales.push(orderedSale);
    }

    // Sort the orderedSales array by the Total property
    orderedSales.sort((a, b) => a.Total - b.Total);

    return orderedSales;
}

const inputSales = [
    { amount: 10000, quantity: 1000000 },
    { amount: 10000, quantity: 5 },
    { amount: 100000, quantity: 8 }
];

const orderedSales = orderByTotal(inputSales);
console.log(orderedSales);