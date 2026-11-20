export const formatNumber = (value, decimals = 0) =>
  Number(value).toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export const formatMoney = (value) => `${formatNumber(value)} đ`
export const formatPercent = (value) => `${formatNumber(value, 1)}%`
