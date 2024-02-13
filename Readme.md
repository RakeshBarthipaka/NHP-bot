# Cglense Chatbot

Cglense Chatbot is a chatbot application built on [Vite.js](https://vitejs.dev/) and Node.js. This repository contains the Docker configuration for running the chatbot in a Docker container.

## Docker Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started)

### Build and Run Docker Container

```bash
docker build -t cglense-chatbot .
docker run -p 8544:8544 -d cglense-chatbot

Visit http://localhost:8544 to access the Cglense Chatbot.


