DEV_PROJECT = js_fullstack_app
COMPOSE_CONF = docker-compose.yml

mongo:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) up mongo
build:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) build
down:
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) down
up: 
	docker-compose --project-name=$(DEV_PROJECT) -f $(COMPOSE_CONF) up -d --no-deps
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