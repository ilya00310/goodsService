export const seed = async (knex) => {
  const shop_one_exist = await knex('shops')
    .where('name', 'example_shop_one')
    .first();
  const shop_two_exist = await knex('shops')
    .where('name', 'example_shop_two')
    .first();
  const shop_three_exist = await knex('shops')
    .where('name', 'example_shop_three')
    .first();
  if (!shop_one_exist) {
    await knex('shops').insert({
      name: 'example_shop_one'
    })
  }
  if (!shop_two_exist) {
    await knex('shops').insert({
      name: 'example_shop_two'
    })
  }
  if (!shop_three_exist) {
    await knex('shops').insert({
      name: 'example_shop_three'
    })
  }
};
