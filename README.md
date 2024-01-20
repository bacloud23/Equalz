# Equalz

Simple and fast equality checker for Node environments.

_It is work in progress, use with your own risks._

## Examples:

### literal

```js
expect(equalz(5, 5)).toBe(true);
```

### same reference

```js
const o = {};
expect(equalz(o, o)).toBe(true);
```

### non standard

```js
const a = Buffer.from("");
const b = Buffer.from("");
expect(equalz(a, b)).toBe(true);

const c = Buffer.from("hello");
const d = Buffer.from("world");
expect(equalz(c, d)).toBe(false);
```

### different standards

```js
const a = new String();
const b = new Date();
expect(equalz(a, b)).toBe(false);
```

### array

```js
const a = [1, 2, 3];
const b = [1, 2, 3];
expect(equalz(a, b)).toBe(true);

const c = [1, 2, 3];
const d = [1, 1, 1];
expect(equalz(c, d)).toBe(false);
```

### object

```js
const a = {};
const b = {};
expect(equalz(a, b)).toBe(true);

const c = { a: 1 };
const d = { a: 1 };
expect(equalz(c, d)).toBe(true);

const e = { a: 1 };
const f = { a: 1, b: 2 };
expect(equalz(e, f)).toBe(false);
```

### dates

```js
const c = new Date(0);
const d = new Date(9);
expect(equalz(c, d)).toBe(false);

const e = new Date(0);
const f = new Date(0);
expect(equalz(e, f)).toBe(true);
```

### deep object

```js
const c = { a: 1, d: { c: 5 } };
const d = { a: 1, d: { c: 5 } };
expect(equalz(c, d)).toBe(true);

const e = { a: 1, d: { c: 5 } };
const f = { a: 1, d: { c: 6 } };
expect(equalz(e, f)).toBe(false);

const g = { a: 1, d: { c: new Date(0) } };
const h = { a: 1, d: { c: new Date(1) } };
expect(equalz(g, h)).toBe(false);
```

### Benchmarks

I've run the same benchmarks thanks to [fast-equals](https://github.com/planttheidea/fast-equals). It is much more simpler (dumber and more dumb), and a little bit slower; Still it is among the fastests.

[Benchmarks](./BENCHMARKS.txt)

## Author

yanna92yar [{at}] gmail {[dot]} com

## License

MIT
