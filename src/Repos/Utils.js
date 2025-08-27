export const groupAndSum = (data, groupFields, sumFields) => {
  const map = new Map();

  data.forEach((item) => {
    // Create a composite key from all group fields
    const key = groupFields.map((field) => item[field]).join("|");

    if (!map.has(key)) {
      // Initialize with grouping fields + zeroed sum fields
      const base = {};
      groupFields.forEach((field) => (base[field] = item[field]));
      sumFields.forEach((field) => (base[field] = 0));
      map.set(key, base);
    }

    // Add current values to sums
    const aggregated = map.get(key);
    sumFields.forEach((field) => {
      aggregated[field] += Number(item[field]) || 0;
    });
  });

  return Array.from(map.values());
};
export const generateUniqueId = () => {
  // Generate a random component
  const randomPart = Math.random().toString(36).substr(2, 5);

  // Get the current timestamp
  const timestampPart = new Date().getTime().toString(36);

  // Combine the random and timestamp parts
  const uniqueId = `${timestampPart}-${randomPart}`;

  return uniqueId;
};
export const generateUniqueOrderNum = () => {
  // Generate a random component
  const randomPart = Math.random(new Date().getTime())
    .toString(10)
    .substring(2, 7);

  // Get the current timestamp
  const timestampPart = new Date().getTime().toString(10).substring(7, 11);

  // Combine the random and timestamp parts
  const uniqueId = `${timestampPart}${randomPart}`;

  return uniqueId;
};
