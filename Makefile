migrate_seed_services:
	npx knex migrate:latest --env development
	knex seed:run --env development
	npx knex migrate:latest --env history
	knex seed:run --env history
start_services:
	@npm run start_service_remainder &
	npm run start_service_history &
	wait
migrate_latest:
	npm run migrate:latest
seed_run:
	npm run seed:run