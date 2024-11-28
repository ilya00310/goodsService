
export const seed = async (knex) => {
  const product_one_exist = await knex('products')
    .where('name', 'example_product_one')
    .first();
  const product_two_exist = await knex('products')
    .where('name', 'example_product_two')
    .first();
  const product_three_exist = await knex('products')
    .where('name', 'example_product_three')
    .first();
  if (!product_one_exist) {
    await knex('products').insert({
      plu: 1,
      name: 'example_product_one'
    })
  }
  if (!product_two_exist) {
    await knex('products').insert({
      plu: 2,
      name: 'example_product_two'
    })
  }
  if (!product_three_exist) {
    await knex('products').insert({
      plu: 3,
      name: 'example_product_three'
    })
  }
};
