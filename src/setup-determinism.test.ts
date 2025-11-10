import { describe, expect, it } from "vitest";

// Replicate the LCG used in test/setup.ts to derive expected values
function* expectedRandoms(count: number) {
  let seed = 0.123456789;
  for (let i = 0; i < count; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    yield seed / 233280;
  }
}

describe("test setup determinism", () => {
  it("freezes Date and provides monotonic Date.now()", () => {
    const fixed = new Date("2025-01-01T00:00:00.000Z").getTime();
    // new Date() is frozen to fixed instant - testing constructor behavior specifically
    // biome-ignore lint/complexity/useDateNow: testing new Date() freeze behavior vs Date.now() monotonic behavior
    expect(new Date().getTime()).toBe(fixed);
    // Date.now starts at fixed and increases monotonically per call
    const n1 = Date.now();
    const n2 = Date.now();
    const n3 = Date.now();
    expect(n1).toBe(fixed);
    expect(n2).toBe(fixed + 1);
    expect(n3).toBe(fixed + 2);
  });

  it("provides deterministic Math.random() sequence per test", () => {
    const expected = Array.from(expectedRandoms(5));
    const actual = Array.from({ length: 5 }, () => Math.random());
    // Compare with tolerance for floating point operations
    expected.forEach((e, i) => {
      expect(actual[i]).toBeCloseTo(e, 6);
    });
  });
});
