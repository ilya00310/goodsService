export const seed = async (knex) => {
  const product_shop_one_exist = await knex('products_shops')
    .where({ shop_id: 1, product_id: 1 })
    .first();
  const product_shop_two_exist = await knex('products_shops')
    .where({ shop_id: 2, product_id: 2 })
    .first();
  const product_shop_three_exist = await knex('products_shops')
    .where({ shop_id: 3, product_id: 3 })
    .first();

  if (!product_shop_one_exist) {
    await knex('products_shops').insert({
      shop_id: 1,
      product_id: 1,
      product_count: 10
    })
  }
  if (!product_shop_two_exist) {
    await knex('products_shops').insert({
      shop_id: 2,
      product_id: 2,
      product_count: 20
    })
  }
  if (!product_shop_three_exist) {
    await knex('products_shops').insert({
      shop_id: 3,
      product_id: 3,
      product_count: 30
    })
  };
}