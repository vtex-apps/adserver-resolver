import { getSkus } from './newtail'

test('skus are correctly extracted', () => {
  const query = 'sku.id:1389706097;1389704398;1389699847;'

  expect(getSkus(query)).toEqual(['1389706097', '1389704398', '1389699847'])
})
