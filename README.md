# Invoice System

## Description
Invoice system developed with the following technologies:
#### Back end
- NestJS (Node v18.14.0)
- MySQL TypeORM

#### Front end
- ReactJS (Node v18.14.0)
- Redux
- Bootstrap

### Requirements
- Docker

### To run the project on your localhost

- Pull up the docker container
```sh
$ docker-compose up
```

- Run the seed from the browser to generate a default user
```sh
http://localhost:3001/v1/seed
```
- Run the seed from the browser to generate a default user
```sh
http://localhost:3001/v1/seed

# Default User:
- Username: admin
- Password: Admin123

# Back end:
- URL: http://localhost:3001/v1/
- Swagger: http://localhost:3001/v1/docs/

# Front end:
- http://localhost:3000/
