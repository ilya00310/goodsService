export const seed = async (knex) => {
  const product_order_one_exist = await knex('products_orders')
    .where({ order_id: 1, product_id: 1, shop_id: 1 })
    .first();
  const product_order_two_exist = await knex('products_orders')
    .where({ order_id: 2, product_id: 2, shop_id: 2 })
    .first();
  const product_order_three_exist = await knex('products_orders')
    .where({ order_id: 3, product_id: 3, shop_id: 3 })
    .first();

  if (!product_order_one_exist) {
    await knex('products_orders').insert({
      order_id: 1,
      product_id: 1,
      shop_id: 1,
      product_count: 10
    })
  }
  if (!product_order_two_exist) {
    await knex('products_orders').insert({
      order_id: 2,
      product_id: 2,
      shop_id: 2,
      product_count: 20
    })
  }
  if (!product_order_three_exist) {
    await knex('products_orders').insert({
      order_id: 3,
      product_id: 3,
      shop_id: 3,
      product_count: 30
    })
  };
}