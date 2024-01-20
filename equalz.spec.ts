import { _equalz, equalz } from "./equalz.js";

test("literal", () => {
  expect(equalz(5, 5)).toBe(true);
});

test("same reference", () => {
  const o = {};

  expect(equalz(o, o)).toBe(true);
});

test("non standard", () => {
  const a = Buffer.from("");
  const b = Buffer.from("");

  expect(equalz(a, b)).toBe(true);
  expect(_equalz(a, b)).toBe(true);

  const c = Buffer.from("hello");
  const d = Buffer.from("world");

  expect(equalz(c, d)).toBe(false);
  expect(_equalz(c, d)).toBe(false);
});

test("different standards", () => {
  const a = new String();
  const b = new Date();

  expect(equalz(a, b)).toBe(false);
  expect(_equalz(a, b)).toBe(false);
});

test("array", () => {
  const a = [1, 2, 3];
  const b = [1, 2, 3];

  expect(equalz(a, b)).toBe(true);
  expect(_equalz(a, b)).toBe(true);

  const c = [1, 2, 3];
  const d = [1, 1, 1];

  expect(equalz(c, d)).toBe(false);
  expect(_equalz(c, d)).toBe(false);
});

test("object", () => {
  const a = {};
  const b = {};

  expect(equalz(a, b)).toBe(true);
  expect(_equalz(a, b)).toBe(true);

  const c = { a: 1 };
  const d = { a: 1 };
  expect(equalz(c, d)).toBe(true);
  expect(_equalz(c, d)).toBe(true);

  const e = { a: 1 };
  const f = { a: 1, b: 2 };
  expect(equalz(e, f)).toBe(false);
  expect(_equalz(e, f)).toBe(false);
});

test("dates", () => {
  const c = new Date(0);
  const d = new Date(9);
  expect(equalz(c, d)).toBe(false);
  expect(_equalz(c, d)).toBe(false);

  const e = new Date(0);
  const f = new Date(0);
  expect(equalz(e, f)).toBe(true);
  expect(_equalz(e, f)).toBe(true);
});

test("deep object", () => {
  const c = { a: 1, d: { c: 5 } };
  const d = { a: 1, d: { c: 5 } };
  expect(equalz(c, d)).toBe(true);
  expect(_equalz(c, d)).toBe(true);

  const e = { a: 1, d: { c: 5 } };
  const f = { a: 1, d: { c: 6 } };
  expect(_equalz(e, f)).toBe(false);
  expect(_equalz(e, f)).toBe(false);

  const g = { a: 1, d: { c: new Date(0) } };
  const h = { a: 1, d: { c: new Date(1) } };
  expect(equalz(g, h)).toBe(false);
  expect(_equalz(g, h)).toBe(false);
});
