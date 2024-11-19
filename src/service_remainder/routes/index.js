import fastify from 'fastify';
import * as handler from '../controllers/goods_controller.js'
import * as schemas from '../schemas/schemas.js';

const app = fastify();

// прописывает запросы и экспортируем, чтобы зарегистрировать
export const routes = async (fastify, options) => {
    //создать товар. В большинстве запросов ожидается та же схема валидации, только с добавлеие запроса 200.
    app.post('/products', schemas.scheme_create_product, handler.create_product)

    //создать остаток
    app.post('/products_shop/add', schemas.scheme_remainder, handler.create_remainder)

    //изменить остаток, информация о изменении хранится в query string, action либо increas, либо decrease 
    app.patch('/products_shop', schemas.scheme_changed_remainder, handler.changed_remainder)

    //получить товары по фильтрам
    app.get('/products', schemas.scheme_filter_product, handler.products_filter)

    // Получить остаток по обычным фильтрам plu и shop_id
    app.get('/products_shop', schemas.scheme_filter_remainders, handler.remainder_filters)

    // Получить остаток кол-ва на полке/в заказе 
    app.get('/products_shop/count', schemas.scheme_filter_remainders_count, handler.remainder_filters_count)

}
