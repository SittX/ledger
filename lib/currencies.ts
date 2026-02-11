export type Currency = {
    code: string;
    symbol: string;
    name: string;
    shortName?: string;
};

export const currencies: Currency[] = [
    { code: "USD", symbol: "$", name: "United States Dollar", shortName: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro", shortName: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound", shortName: "Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen", shortName: "Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", shortName: "AUD" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar", shortName: "CAD" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc", shortName: "CHF" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan", shortName: "CNY" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", shortName: "HKD" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar", shortName: "SGD" },
    { code: "MMK", symbol: "Ks", name: "Burmese Kyat", shortName: "Kyat" },
    { code: "INR", symbol: "₹", name: "Indian Rupee", shortName: "INR" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real", shortName: "BRL" },
    { code: "ZAR", symbol: "R", name: "South African Rand", shortName: "Rand" },
    { code: "SEK", symbol: "kr", name: "Swedish Krona", shortName: "SEK" },
    { code: "NOK", symbol: "kr", name: "Norwegian Krone", shortName: "NOK" },
    { code: "DKK", symbol: "kr", name: "Danish Krone", shortName: "DKK" },
    { code: "MXN", symbol: "$", name: "Mexican Peso", shortName: "MXN" },
    { code: "ARS", symbol: "$", name: "Argentine Peso", shortName: "ARS" },
    { code: "KRW", symbol: "₩", name: "South Korean Won", shortName: "KRW" },
];

export function getCurrency(code?: string) {
    if (!code) return undefined;
    return currencies.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function searchCurrencies(term: string) {
    const q = term.trim().toLowerCase();
    if (!q) return currencies;
    return currencies.filter(
        (c) =>
            c.code.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q) ||
            (c.shortName || "").toLowerCase().includes(q)
    );
}
