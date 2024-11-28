export const seed = async (knex) => {
  const order_one_exist = await knex('orders')
    .where('order_address', 'example_address_one')
    .first();
  const order_two_exist = await knex('orders')
    .where('order_address', 'example_address_two')
    .first();
  const order_three_exist = await knex('orders')
    .where('order_address', 'example_address_three')
    .first();
  if (!order_one_exist) {
    await knex('orders').insert({
      order_address: 'example_address_one'
    })
  }
  if (!order_two_exist) {
    await knex('orders').insert({
      order_address: 'example_address_two'
    })
  }
  if (!order_three_exist) {
    await knex('orders').insert({
      order_address: 'example_address_three'
    })
  }
}
