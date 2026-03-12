export function formatNaira(amount: unknown) {
  const value =
    typeof amount === "string"
      ? Number(amount)
      : typeof amount === "number"
        ? amount
        : amount && typeof amount === "object" && "toNumber" in amount
          ? (amount as { toNumber: () => number }).toNumber()
          : Number(amount?.toString?.() ?? 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
