/**
 * Generates a deterministic integer based on a string hash.
 * Useful for stable mock values (e.g. rank, package) without violating React purity.
 */
export const getDeterministicRank = (name = '', max = 50) => {
  if (!name) return 1;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % max) + 1;
};
