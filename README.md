# remainderGoods

Чтобы начать работать с сервисами, нужно:

1. Прописать свой .env файл на основе .env.example

2. Создать и наполнить таблицы:

```
make migrate_seed_services
```

3. Запустить сервисы

```
make start_services
```

4. Производить соответсвующие запросы через postman или curl

Диаграмма сущностей: https://drive.google.com/file/d/1StZrgCmZld911lX6VCdgGpvLqNleBket/view
