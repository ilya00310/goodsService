# remainderGoods

Чтобы начать работать с сервисами, нужно:

1. Прописать свой .env файл, с данными локальной бд, формата:

```
PORT= 'some port'
DB_USER='some user'
DB_HOST="localhost"
DB_NAME="some name db"
DB_PASSWORD="some password db"
DB_PORT=some port
DB_CONNECTION_STRING = postgres://user:password@localhost:port/db name
DB_DIALECT="postgres"

PORT_HISTORY= 'some port'
DB_USER_HISTORY='postgres'
DB_NAME_HISTORY="some name db"
DB_PASSWORD_HISTORY="some password db"
DB_CONNECTION_STRING_HISTORY = postgres://user:password@localhost:port/db name
```

2. Создать и наполнить таблицы:

```
make migrate_seed_services
```

3. Запустить сервисы

```
make start_services
```

4. Производить соответсвующие запросы через postman или curl

Диаграмма сущностей: https://app.diagrams.net/#G1StZrgCmZld911lX6VCdgGpvLqNleBket#%7B%22pageId%22%3A%22wkyGTkeGAAGISU56_LCQ%22%7D
