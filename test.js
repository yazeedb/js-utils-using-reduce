const {
  pipe,
  compose,
  zip,
  intersperse,
  insert,
  flatten,
  flatMap,
  includes,
  compact,
  arrayIntoObject,
  adjust
} = require('./functions');

test('pipe combines functions from left-to-right', () => {
  const mathSequence = pipe(
    (x) => x * 2,
    (x) => x - 1,
    (x) => x * 3
  );

  const outputs = [1, 2, 3].map(mathSequence);

  expect(outputs).toEqual([3, 9, 15]);
});

test('compose combines functions from right-to-left', () => {
  const mathSequence = compose(
    (x) => x * 2,
    (x) => x - 1,
    (x) => x * 3
  );

  const outputs = [1, 2, 3].map(mathSequence);

  expect(outputs).toEqual([4, 10, 16]);
});

test("zip pairs items from two lists, using the shorter list's length", () => {
  const outputs = [
    zip([1, 3], [2, 4]),
    zip([1, 3, 5], [2, 4]),
    zip([1, 3], [2, 4, 5]),
    zip(['Decode', 'secret'], ['this', 'message!'])
  ];

  expect(outputs).toEqual([
    [[1, 2], [3, 4]],
    [[1, 2], [3, 4]],
    [[1, 2], [3, 4]],
    [['Decode', 'this'], ['secret', 'message!']]
  ]);
});

test('intersperse injects a separator between each element of a list', () => {
  const outputs = [
    intersperse('Batman', [1, 2, 3, 4, 5, 6]),
    intersperse('Batman', [])
  ];

  expect(outputs).toEqual([
    [1, 'Batman', 2, 'Batman', 3, 'Batman', 4, 'Batman', 5, 'Batman', 6],
    []
  ]);
});

test('insert injects an element at the given index, injecting at the end if the index is too large', () => {
  const outputs = [
    insert(0, 'Batman', [1, 2, 3]),
    insert(1, 'Batman', [1, 2, 3]),
    insert(2, ['Batman'], [1, 2, 3]),
    insert(10, ['Batman'], [1, 2, 3])
  ];

  expect(outputs).toEqual([
    ['Batman', 1, 2, 3],
    [1, 'Batman', 2, 3],
    [1, 2, ['Batman'], 3],
    [1, 2, 3, ['Batman']]
  ]);
});

test('flatten will flatten an array by one level', () => {
  const outputs = [
    [[1, 2], [3, 4]],
    [[1, 2], [[3, 4]]],
    [[[1, 2]], [3, 4]],
    [[[1, 2], [3, 4]]]
  ].map(flatten);

  expect(outputs).toEqual([
    [1, 2, 3, 4],
    [1, 2, [3, 4]],
    [[1, 2], 3, 4],
    [[1, 2], [3, 4]]
  ]);
});

test('flatMap maps each element, then flattens the result', () => {
  const outputs = [
    flatMap((n) => [n * 2], [1, 2, 3, 4]),
    flatMap((n) => [n, n], [1, 2, 3, 4]),
    flatMap((s) => s.split(' '), ['flatMap', 'should be', 'mapFlat'])
  ];

  expect(outputs).toEqual([
    [2, 4, 6, 8],
    [1, 1, 2, 2, 3, 3, 4, 4],
    ['flatMap', 'should', 'be', 'mapFlat']
  ]);
});

test('includes tells if a list has a certain element', () => {
  const outputs = [
    includes(3, [1, 2, 3]),
    includes(3, [1, 2]),
    includes(0, [])
  ];

  expect(outputs).toEqual([true, false, false]);
});

test('compact removes falsey values from a list', () => {
  const output = compact([0, null, 1, undefined, 2, '', 3, false, 4, NaN]);

  expect(output).toEqual([1, 2, 3, 4]);
});

test('arrayIntoObject converts an array into an object, using the given key', () => {
  const users = [
    { username: 'JX01', status: 'offline' },
    { username: 'yazeedBee', status: 'online' }
  ];

  const outputs = [
    arrayIntoObject('username', users),
    arrayIntoObject('status', users)
  ];

  expect(outputs).toEqual([
    {
      JX01: {
        username: 'JX01',
        status: 'offline'
      },
      yazeedBee: { username: 'yazeedBee', status: 'online' }
    },
    {
      offline: {
        username: 'JX01',
        status: 'offline'
      },
      online: { username: 'yazeedBee', status: 'online' }
    }
  ]);
});

describe('adjust', () => {
  const double = (x) => x * 2;

  it('applies a function to the value at the provided index', () => {
    const output = adjust(1, double, [1, 2, 3]);

    expect(output).toEqual([1, 4, 3]);
  });

  it('returns the original array if provided index is out of bounds', () => {
    const output = adjust(4, double, [1, 2, 3]);

    expect(output).toEqual([1, 2, 3]);
  });
});
