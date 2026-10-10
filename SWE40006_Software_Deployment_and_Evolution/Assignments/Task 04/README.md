# SWE40006 — Deployment Portfolio Task 4

This folder contains the source code and Dockerfiles for the Task 4 deployment activities.

## Structure

- `app.py`, `Dockerfile`: Task 4.2 minimal Python HTTP server.
- `task43-web-app/`: Task 4.3 Python Task Manager web application.
- `task44-cli-app/`: Task 4.4 terminal-based Task Manager.
- `report/`: report deliverables and evidence index.

## Task 4.2 — Python HTTP server

Build and run locally:

```powershell
docker build -t python-hello-app:1.0 .
docker run -d --name python-hello -p 8000:8000 python-hello-app:1.0
curl.exe http://localhost:8000
```

Expected response: `Hello from my Python Docker app!`

Docker Hub image: https://hub.docker.com/r/nhatnguyen2407/swe40006_task04

## Task 4.3 — Web Task Manager

```powershell
cd task43-web-app
docker build -t task-manager:1.0 .
docker run -d --name task-manager -p 8001:8000 task-manager:1.0
```

Open http://localhost:8001. The application supports adding tasks, toggling completion and deleting tasks. The app stores tasks in `/app/tasks.json`; use a Docker volume if persistence across container recreation is required.

## Task 4.4 — CLI Task Manager

```powershell
cd task44-cli-app
docker build -t task-manager-cli:1.0 .
docker run -it --name task-manager-cli task-manager-cli:1.0
```

The interactive CLI supports listing, adding, toggling and deleting tasks. For persistent data, create a volume and mount it at `/app`:

```powershell
docker volume create task-manager-data
docker run -it --name task-manager-cli --mount source=task-manager-data,target=/app task-manager-cli:1.0
```

## Verification notes

The documented local endpoint `localhost:8001` is only available on the Docker host. A publicly reachable application endpoint and a pull test from a separate physical Docker device must be recorded only after those checks are actually completed. Do not treat this repository or the Docker Hub account page as proof of a public running application endpoint.
