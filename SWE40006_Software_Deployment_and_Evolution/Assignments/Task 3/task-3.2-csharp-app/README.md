# Task 3.2 - Study Task Planner (C#)

I developed a small ASP.NET Core application to demonstrate application development, local testing, and later deployment to Azure App Service for SWE40006 Task 3.2.

## Features

- Add a study task with Low, Medium or High priority.
- View tasks and the number of incomplete tasks.
- Mark tasks complete or reopen them.
- Delete a task.
- Validate task input on the C# server.

## Stack

- ASP.NET Core on .NET 10
- C# Minimal APIs
- Plain HTML, CSS and JavaScript
- In-memory storage (tasks are lost when the server restarts)

## Run locally

Requirements: .NET 10 SDK.

Open PowerShell in this folder and run:

```powershell
dotnet restore
dotnet build
dotnet run --urls "http://localhost:5082"
```

Open http://localhost:5082 and test adding, completing, reopening and deleting a task.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Add a task |
| PATCH | /api/tasks/{id}/toggle | Change completion status |
| DELETE | /api/tasks/{id} | Delete a task |

Example request body for POST:

```json
{"title":"Prepare the deployment report","priority":"High"}
```

The API rejects empty titles, titles longer than 80 characters and invalid priorities.

## Assignment status

- Source code: prepared.
- Local build and functional tests: awaiting verification on the local machine.
- Azure App Service deployment: pending.
- Azure app deactivation: pending.

I will capture screenshots of actual build, local functionality, Azure deployment and deactivation before writing the final report. No cloud result is claimed until verified.
