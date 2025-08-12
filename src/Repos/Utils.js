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
