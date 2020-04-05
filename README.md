# JS FULLSTACK EXAMPLE

Dockerized NodeJs + React + Mongo + Nginx

### Installation

Requires Docker and Docker-Compose to run.

```sh
$ make build
```

and then:

##### For Development:

do:

```sh
$ make mongo
$ cd client && npm start
$ cd server && npm start
```

##### For Production:

do:

```sh
$ make up
```

It will run react client at port 80 and node server at port 5000.
For example: http://localhost

##### Populate Database:

Just go to /api/publications/more. Or wait an hour =)

##### Nginx:

If you want to run node-server with nginx as well, just uncomment nginx block in docker-compose file, and comment ports in server_node block.

##### CI/CD:

to test it, do:

```sh
$ gitlab-runner exec shell test
```

##### Warning:

You should not upload .env files. Make git ignore it.

## License

MIT

**Free for everyone**
