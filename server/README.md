# My Node.js App with Docker

## Description

This project is a simple Node.js server, configured to run inside a Docker container.

## Requirements

- Docker
- Docker Compose

## Deployment Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Dreven777/homework_hw.git
cd homework_hw/server
```

To build the Docker image and run the container, execute the following command:
```bash
docker-compose up --build
```

To stop the container and free up resources, use the following command:
```bash
docker-compose down
```

Logs:
```bash
docker-compose logs app
docker-compose logs mongo
```
