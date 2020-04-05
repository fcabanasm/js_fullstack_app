DEV_PROJECT = js_fullstack_app
COMPOSE_CONF = docker-compose.yml

mongo:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) up -d mongo
build:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) build
down:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) down
up: 
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) up -d --no-deps
ssh:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) exec mongo bash
pm2-logs:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) exec app pm2 logs 0
clean:
	docker system prune
status:
	docker ps -a
stats:
	docker stats
network:
	docker network ls
volume:
	docker volume ls
inspect:
	docker inspect portal_scraping_app_1
check:
	docker logs portal_scraping_app_1