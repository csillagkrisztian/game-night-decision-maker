export function sortResults(results, query) {
  const sorted = [...results];
  sorted.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aName === query) return -1;
    if (bName === query) return 1;
    if (aName.startsWith(query)) return -1;
    if (bName.startsWith(query)) return 1;
    if (aName.includes(query)) return -1;
    if (bName.includes(query)) return 1;

    return 0;
  });
  return sorted;
}
