# remainderGoods

Чтобы начать работать с сервисами, нужно:

1. Прописать свой .env файл, с данными локальной бд, формата:

```
DB_USER='some user'
DB_HOST="localhost"
DB_NAME="some name db"
DB_PASSWORD="some password db"
DB_PORT=some port
DB_CONNECTION_STRING = postgres://user:password@localhost:port/db name
```

2. Создать и наполнить таблицы:

```
make migrate_latest
make seed_run
```

3. Запустить требуемый сервис

```
make start_service_remainders
// or
make start_service_history
```

4. Производить соответсвующие запросы через postman или curl

Диаграмма сущностей: https://app.diagrams.net/#G1StZrgCmZld911lX6VCdgGpvLqNleBket#%7B%22pageId%22%3A%22wkyGTkeGAAGISU56_LCQ%22%7D
