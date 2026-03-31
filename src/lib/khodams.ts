export interface Khodam {
  id: number;
  name: string;
  description: string;
  type?: string | null;
}

// Deterministic mapping needs to know the total count of pool
export function generateDeterministicKhodamId(name: string, count: number, ids: number[]): number {
  if (count === 0) return 1;
  const normalizedName = name.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalizedName.length; i++) {
    const char = normalizedName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  
  const index = Math.abs(hash) % count;
  return ids[index];
}
