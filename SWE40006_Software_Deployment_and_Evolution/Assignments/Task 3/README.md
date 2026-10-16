# Task 3 - Azure App Service Deployment

Individual deployment portfolio for SWE40006 Software Deployment and Evolution.

- Due: 19 October 2026, 23:59
- Target: Task 3.3 (High Distinction), including all lower-level tasks
- Submission: a PDF or Word deployment report through Canvas
- Status: local environment prepared; Azure deployment not started

## Task requirements

- Task 3.1: deploy an existing web application to Azure.
- Task 3.2: develop and deploy a C# application, then deactivate it.
- Task 3.3: install PHP, develop a web application, and deploy it to Azure.

## Local development environment

- Windows with Visual Studio and VS Code
- .NET SDK 10.0.401
- PHP 8.4.26 (CLI, x64, NTS)
- Git

These are locally installed tools, not proof of deployment.

## Task 3.1 - Existing application

I am using Microsoft's existing .NET 10 sample application instead of presenting a sample as my own C# development.

- Original source: https://github.com/Azure-Samples/dotnetcore-docs-hello-world
- Author: Microsoft Azure Samples contributors
- License: MIT (see the upstream repository)
- Deployment target: Azure App Service (.NET 10)

To run the original sample locally in a separate working directory:

```powershell
cd $HOME
git clone https://github.com/Azure-Samples/dotnetcore-docs-hello-world.git task3-existing-app
cd task3-existing-app
dotnet restore
dotnet build
dotnet run --urls http://localhost:5081
```

Open http://localhost:5081 in a browser. This check must be verified on the local machine; no local build or run outcome has been confirmed in this repository.

## Task 3.2 - C# application

- Planned: a small ASP.NET Core study task planner with server-side input validation.
- Local build and testing: pending.
- Azure deployment and deactivation: pending.

## Task 3.3 - PHP application

- Planned: a small PHP expense-splitting calculator with server-side validation.
- Local testing: pending.
- Azure deployment: pending.

## Evidence checklist

- Screenshots of the existing application running locally and deployed on Azure
- C# source, build output, local test and live deployment
- Evidence of C# App Service deactivation (Stopped state)
- PHP installation, original web app, local test and live deployment
- Azure deployment logs and any actual errors, with causes, fixes and verification
- Public URLs and source references for lecturer verification

## Report

The report will include student and unit details, declared task level, deployment descriptions, labelled screenshots, observed errors and resolutions, and public verification URLs.

- Only verified outcomes will be reported as completed.
- No account secrets, tokens or generated build output will be committed.
- Screenshots and report content must be collected from the actual development and deployment steps.
