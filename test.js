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
  adjust,
  fromPairs,
  range,
  repeat,
  times,
  deduplicate,
  reverse,
  insertAll,
  mergeAll,
  xprod
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

// 1
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

// 2
test('fromPairs creates an object from a list of key-value pairs', () => {
  const outputs = [
    [['a', 1], ['b', 2], ['c', 3]],
    [['a', 1], ['c', 2], ['c', 3]],
    [['hello', 'world'], ['JS', 'rocks'], ['so does', 'Elm']]
  ].map(fromPairs);

  expect(outputs).toEqual([
    {
      a: 1,
      b: 2,
      c: 3
    },
    {
      a: 1,
      c: 3
    },
    {
      hello: 'world',
      JS: 'rocks',
      'so does': 'Elm'
    }
  ]);
});

// 3
test('range returns a list of numbers from a given range', () => {
  const outputs = [range(1, 3), range(1, 5), range(10, 15), range(100, 105)];

  expect(outputs).toEqual([
    [1, 2, 3],
    [1, 2, 3, 4, 5],
    [10, 11, 12, 13, 14, 15],
    [100, 101, 102, 103, 104, 105]
  ]);
});

// 4
test('repeat returns a list of a given value N times', () => {
  const outputs = [
    repeat('JavaScript', 3),
    repeat({ favoriteLanguage: 'JavaScript' }, 2),
    repeat(['JavaScript', 'Reduce'], 4)
  ];

  expect(outputs).toEqual([
    ['JavaScript', 'JavaScript', 'JavaScript'],
    [{ favoriteLanguage: 'JavaScript' }, { favoriteLanguage: 'JavaScript' }],
    [
      ['JavaScript', 'Reduce'],
      ['JavaScript', 'Reduce'],
      ['JavaScript', 'Reduce'],
      ['JavaScript', 'Reduce']
    ]
  ]);
});

// 5
test('times calls a given function N times', () => {
  const outputs = [times((x) => x * 2, 3), times(() => 'Sandwich', 2)];

  expect(outputs).toEqual([[0, 2, 4], ['Sandwich', 'Sandwich']]);
});

// 6
test('deduplicate will deduplicate items of a list', () => {
  const outputs = [
    [1, 1, 2, 3],
    ['Hello', 'Hello', 'World'],
    [true, false, true, false, true],
    [undefined, null, null, new Date('01/01/2000'), new Date('01/01/2000')],
    [[1], [1], { hello: 'world' }, { hello: 'world' }]
  ].map(deduplicate);

  expect(outputs).toEqual([
    [1, 2, 3],
    ['Hello', 'World'],
    [true, false],
    [undefined, null, new Date('01/01/2000')],
    [[1], { hello: 'world' }]
  ]);
});

// 7
test('reverse will reverse an array WITHOUT mutating it', () => {
  const inputs = [
    [1, 2, 3],
    ['hello', 'world'],
    [{ name: 'Will' }, { name: 'Jaime' }]
  ];

  const inputsDeepCopy = JSON.parse(JSON.stringify(inputs));

  // This DOES NOT mutate the input array
  const outputs = inputs.map(reverse);

  // Make sure original inputs aren't mutated by the reversal
  expect(inputs).toEqual(inputsDeepCopy);

  // Regular assertion
  expect(outputs).toEqual([
    [3, 2, 1],
    ['world', 'hello'],
    [{ name: 'Jaime' }, { name: 'Will' }]
  ]);
});

// 8
describe('insertAll', () => {
  it('inserts a sub-list into a list at the given index', () => {
    const output = insertAll(1, [2, 3, 4], [1, 5]);

    expect(output).toEqual([1, 2, 3, 4, 5]);
  });

  it('appends to the end of the list if index is too large', () => {
    const output = insertAll(10, [2, 3, 4], [1, 5]);

    expect(output).toEqual([1, 5, 2, 3, 4]);
  });
});

// 9
test('mergeAll merges a list of objects into one', () => {
  const output = mergeAll([
    { js: 'reduce' },
    { elm: 'fold' },
    { java: 'collect' },
    { js: 'reduce' }
  ]);

  expect(output).toEqual({
    js: 'reduce',
    elm: 'fold',
    java: 'collect'
  });
});

// 10
test('xprod, given a list, returns a new list of all possible pairs', () => {
  const outputs = [
    xprod(['Hello', 'World'], ['JavaScript', 'Reduce']),
    xprod([1, 2, 3], [4, 5])
  ];

  expect(outputs).toEqual([
    [
      ['Hello', 'JavaScript'],
      ['Hello', 'Reduce'],
      ['World', 'JavaScript'],
      ['World', 'Reduce']
    ],
    [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  ]);
});
