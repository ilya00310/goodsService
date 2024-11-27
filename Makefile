start_services:
	@npm run start_service_remainder &
	npm run start_service_history &
	wait
migrate_latest:
	npm run migrate:latest
seed_run:
	npm run seed:run
