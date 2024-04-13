export const formatAccountId = (
  accountId: string,
  length = 12,
  leadingLength: number | undefined = undefined
): string => {
  if (accountId.length < 10) return accountId;
  return (
    accountId.substring(0, leadingLength ? leadingLength : length) +
    "..." +
    accountId.substring(accountId.length - length, accountId.length)
  );
};


export const hexToNumber = (hexString: string) => {
  // Remove '0x' prefix if present
  hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
  
  // Convert hexadecimal string to decimal number
  const decimalNumber = parseInt(hexString, 16);
  
  return decimalNumber;
}