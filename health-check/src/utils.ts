import { timingSafeEqual } from 'crypto';

export function secureCompare(a: string | undefined, b: string | undefined): boolean {
  if (a === undefined || b === undefined) return false;
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return timingSafeEqual(bufferA, bufferB);
}
