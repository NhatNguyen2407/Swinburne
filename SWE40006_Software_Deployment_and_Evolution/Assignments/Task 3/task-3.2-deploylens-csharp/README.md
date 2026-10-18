# DeployLens - C# Edition (Task 3.2)

I developed this ASP.NET Core web application to explore how to evaluate release readiness before deployment.

## Requirements

- .NET SDK 10
- A modern browser

## Run locally

```powershell
dotnet restore
dotnet build
dotnet run --urls "http://localhost:5082"
```

Open http://localhost:5082, select **Load example**, then **Analyze release**. The C# Minimal API in `Program.cs` performs the calculation.

## Implementation

- Release profile: name, version, environment and change classification
- Six pre-deployment checks with weighted risk penalties and actionable findings
- Server-side JSON validation and scoring through `POST /api/analyze`
- Health endpoint: `GET /api/health`
- JSON export and up to five recent assessments stored in the local browser

I deployed the app to `SWE40006-Task3-CS` and verified it on Azure, then stopped that Web App as required by Task 3.2. The application does not query Azure or independently verify the checklist answers.
