# SWE40006 - Deployment Portfolio Task 3

I completed Task 3.1 (Pass), Task 3.2 (Credit) and Task 3.3 (High Distinction attempt) using Azure App Service and VS Code.

## Applications

- `task-3.1-existing-app/` - Microsoft Azure Samples' existing ASP.NET Core app (upstream Git submodule). I used this application for the initial cloud deployment rather than presenting it as my own work.
- `task-3.2-deploylens-csharp/` - DeployLens built with ASP.NET Core Minimal APIs on .NET 10. I deployed it, verified the web interface and API, and then stopped the Azure Web App.
- `task-3.3-deploylens-php/` - A PHP 8.4 implementation of DeployLens with independent server-side validation and scoring, deployed to Azure App Service on Linux.

## Azure resources

- Resource group: `rg-swe40006-task3`
- Sample: [SWE40006-Task3-Sample](https://swe40006-task3-sample-djhgdyhjgjc0gaht.southeastasia-01.azurewebsites.net) - Windows, .NET 10, Free F1
- C#: [SWE40006-Task3-CS](https://swe40006-task3-cs-byhndyefgwdja0hw.southeastasia-01.azurewebsites.net) - Windows, .NET 10, Free F1; intentionally stopped after verification
- PHP: [SWE40006-Task3-PHP](https://swe40006-task3-php-fdfdbvfucxhrdpeb.southeastasia-01.azurewebsites.net) - Linux, PHP 8.4, Free F1

The two .NET Web Apps share a Windows App Service Plan. The PHP Web App uses a separate Linux plan.

## Run locally

Clone this repository with its upstream sample submodule:

```powershell
git clone --recurse-submodules https://github.com/NhatNguyen2407/Swinburne.git
```

Run the C# application:

```powershell
cd "SWE40006_Software_Deployment_and_Evolution/Assignments/Task 3/task-3.2-deploylens-csharp"
dotnet restore
dotnet run --urls http://localhost:5082
```

Run the PHP application in a separate terminal:

```powershell
cd "SWE40006_Software_Deployment_and_Evolution/Assignments/Task 3/task-3.3-deploylens-php"
php -S localhost:5084
```

## Evidence

- `evidence/assessments/` includes the actual assessment JSON exports from C# and PHP. Both record READY, score 86/100 and risk 14/100 for the sample release.
- The two applications use a shared UI design, but their backend analysis logic is independent.
- The C# Web App was deliberately deactivated. Its URL therefore returns Azure's stopped-app response.
- The editable Word report and PDF copy are already included in `report/`. The assessment JSON exports are included in `evidence/assessments/`. The report can be reviewed alongside the application source.

DeployLens evaluates user-entered checklist values. Its score is intended for demonstration and does not establish that a real production release has passed security or infrastructure checks.

## Attribution

Task 3.1 uses [Microsoft Azure Samples' dotnetcore-docs-hello-world](https://github.com/Azure-Samples/dotnetcore-docs-hello-world), distributed under its upstream license. The original project is referenced through a Git submodule.
