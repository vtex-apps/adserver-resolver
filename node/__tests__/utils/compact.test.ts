import compact from '../../utils/compact'

describe('#compact', () => {
  const object = {
    a: 1,
    b: null,
    c: undefined,
  }

  it('should remove the null and undefined values from an object', () => {
    const result = compact(object)

    expect(result).toMatchObject({ a: 1 })
  })
})
