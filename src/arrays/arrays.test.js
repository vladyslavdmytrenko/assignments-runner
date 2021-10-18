import { complex, filterBy, mapTo, mapToProfile, reduceTo, sort } from './arrays';

describe('filter', () => {
  test('filter less than 5', () => {
    expect(filterBy([1, 3, 5, 7], 5)).toEqual([5, 7]);
  });

  test('filter by name property', () => {
    const inputList = [{ name: 'Test1', surname: 'Test1' }, { surname: 'Test2' }, { age: 10 }, { age: 11, name: 'Test2' }];
    const outputList = [
      { name: 'Test1', surname: 'Test1' },
      { age: 11, name: 'Test2' },
    ];

    expect(filterBy(inputList, 'name')).toEqual(outputList);
  });

  test('filter by age property', () => {
    const inputList = [{ name: 'Test1', surname: 'Test1' }, { surname: 'Test2' }, { name: 'Test3', age: 10 }, { age: 11, name: 'Test2' }];
    const outputList = [{ name: 'Test3', age: 10 }];

    expect(filterBy(inputList, { property: 'age', filterCb: (age) => age <= 10 })).toEqual(outputList);
  });
});

describe('map', () => {
  test('map to list index', () => {
    expect(mapTo([1, 3, 5, 7])).toEqual([0, 1, 2, 3]);
  });

  test('map to property', () => {
    const inputList = [{ name: 'Test1', surname: 'Test1' }, { surname: 'Test2' }, { name: 'Test3', age: 10 }, { age: 11, name: 'Test2' }];
    const outputList = ['Test1', 'Test3', 'Test2'];

    expect(mapTo(inputList, 'name')).toEqual(outputList);
  });

  test('map to profile', () => {
    const inputList = [{ name: 'Test1', surname: 'Test1' }, { surname: 'Test2' }, { name: 'Test3', age: 10 }, { age: 65, name: 'Test2' }, {}];
    const outputList = [
      { name: 'Test1', surname: 'Test1', fullname: 'Test1 Test1', age: null },
      { name: null, surname: 'Test2', fullname: '_ Test2', age: null },
      { name: 'Test3', surname: null, fullname: 'Test3 _', age: 10 },
      { name: 'Test2', surname: null, fullname: 'Test2 _', age: 65 },
      { name: null, surname: null, fullname: null, age: null },
    ];

    const result = mapToProfile(inputList);

    expect(result).toEqual(outputList);

    expect(result[2].isOld).toBe(false);
    expect(result[2].isAnonymous).toBe(false);
    expect(result[3].isOld).toBe(true);
    expect(result[3].isAnonymous).toBe(false);
    expect(result[4].isAnonymous).toBe(true);
  });
});

describe('reduce', () => {
  test('reduce to summary number', () => {
    expect(reduceTo([1, 3, 5, 7])).toBe(16);
  });

  test('reduce to summary by property', () => {
    const inputList = [
      { total: 10, difference: 5 },
      { total: 7, difference: 2 },
      { total: 8, difference: 1 },
    ];

    expect(reduceTo(inputList, 'total')).toBe(25);
  });

  test('reduce to summary by properties', () => {
    const inputList = [
      { total: 10, difference: 5 },
      { total: 7, difference: 2 },
      { total: 8, difference: 1 },
    ];

    expect(reduceTo(inputList, ['total', 'difference'])).toEqual([25, 8]);
  });
});

describe('sort', () => {
  test('sort from less to greater', () => {
    expect(sort([3, -1, 7, 5])).toEqual([-1, 3, 5, 7]);
  });

  test('sort by age', () => {
    const inputList = [{ age: 4 }, { age: 2 }, { age: 11 }, { age: 10 }];
    const outputList = [{ age: 2 }, { age: 4 }, { age: 10 }, { age: 11 }];

    expect(sort(inputList, 'age')).toEqual(outputList);
  });

  test('sort by age and total', () => {
    const inputList = [
      { age: 4, total: 10 },
      { age: 2, total: 15 },
      { age: 11, total: 70 },
      { age: 10, total: 7 },
      { age: 4, total: 7 },
      { age: 11, total: 7 },
    ];
    const outputList = [
      { age: 2, total: 7 },
      { age: 4, total: 7 },
      { age: 4, total: 7 },
      { age: 10, total: 10 },
      { age: 11, total: 15 },
      { age: 11, total: 70 },
    ];

    expect(sort(inputList, ['age', 'total'])).toEqual(outputList);
  });

  test('sort by total and age', () => {
    // Default sorting - ASC
    const inputList = [
      { age: 4, total: 10 },
      { age: 2, total: 15 },
      { age: 11, total: 70 },
      { age: 10, total: 7 },
      { age: 4, total: 7 },
      { age: 11, total: 7 },
    ];
    // Age asc; Total asc
    const outputList1 = [
      { age: 2, total: 7 },
      { age: 4, total: 7 },
      { age: 4, total: 7 },
      { age: 10, total: 10 },
      { age: 11, total: 15 },
      { age: 11, total: 70 },
    ];
    // Age desc; Total asc
    const outputList2 = [
      { age: 11, total: 7 },
      { age: 11, total: 7 },
      { age: 10, total: 7 },
      { age: 4, total: 10 },
      { age: 4, total: 15 },
      { age: 2, total: 70 },
    ];
    // Age asc; Total desc 
    const outputList3 = [
      { age: 2, total: 70 },
      { age: 4, total: 15 },
      { age: 4, total: 10 },
      { age: 10, total: 7 },
      { age: 11, total: 7 },
      { age: 11, total: 7 },
    ];
    // Age desc; Total desc
    const outputList4 = [
      { age: 11, total: 70 },
      { age: 11, total: 15 },
      { age: 10, total: 10 },
      { age: 4, total: 7 },
      { age: 4, total: 7 },
      { age: 2, total: 7 },
    ];

    // Age asc; Total asc 
    expect(sort(inputList, ['total', 'age'])).toEqual(outputList1);
    expect(sort(inputList, [{ field: 'total', order: 'asc' }, 'age'])).toEqual(outputList1);
    expect(sort(inputList, ['total', { field: 'age', order: 'asc' }])).toEqual(outputList1);
    expect(sort(inputList, [{ field: 'age', order: 'asc' }, { field: 'total', order: 'asc' }])).toEqual(outputList1);

    // Age desc; Total asc
    expect(sort(inputList, ['total', { field: 'age', order: 'desc' }])).toEqual(outputList2);
    expect(sort(inputList, [{ field: 'total', order: 'asc' }, { field: 'age', order: 'desc' }])).toEqual(outputList2);

    // Age asc; Total desc
    expect(sort(inputList, ['age', { field: 'total', order: 'desc' }])).toEqual(outputList3);
    expect(sort(inputList, [{ field: 'age', order: 'asc' }, { field: 'total', order: 'desc' }])).toEqual(outputList3);

    // Age desc; Total desc
    expect(sort(inputList, [{ field: 'age', order: 'desc' }, { field: 'total', order: 'desc' }])).toEqual(outputList4);
  });
});

describe('complex', () => {
  test('complex filtering and mapping', () => {
    const inputList = [
      { age: 4, total: 10 },
      { age: 2, total: 15 },
      { age: 11, total: 70 },
      { age: 10, total: 7 },
      { age: 4, total: 7 },
      { age: 11, total: 7 },
    ];
    const outputList = [70, 7, 7];

    expect(
      complex(inputList, [
        {
          operation: 'filter',
          property: 'age',
          callback: (value) => value > 4,
        },
        {
          operation: 'map',
          property: 'total',
        },
      ])
    ).toEqual(outputList);
  });

  test('complex filtering and reducing', () => {
    const inputList = [
      { age: 4, total: 10 },
      { age: 2, total: 15 },
      { age: 11, total: 70 },
      { age: 10, total: 7 },
      { age: 4, total: 7 },
      { age: 11, total: 7 },
    ];

    expect(
      complex(inputList, [
        {
          operation: 'filter',
          property: 'total',
          callback: (value) => value < 10,
        },
        {
          operation: 'reduce',
          property: 'total',
        },
      ])
    ).toEqual(21);
  });

  test('complex filtering, mapping and sorting', () => {
    const inputList = [
      { age: 4, total: 10 },
      { age: 2, total: 15 },
      { age: 11, total: 70 },
      { age: 10, total: 7 },
      { age: 4, total: 7 },
      { age: 11, total: 7 },
    ];
    const outputList = [70, 10, 7, 7, 7];

    expect(
      complex(inputList, [
        {
          operation: 'filter',
          property: 'age',
          callback: (value) => value >= 4,
        },
        {
          operation: 'map',
          property: 'total',
        },
        {
          operation: 'sort',
          order: 'desc',
        },
      ])
    ).toEqual(outputList);
  });
});
