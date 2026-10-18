# DeployLens - PHP Edition (Task 3.3)

I implemented the same release assessment workflow in PHP 8.4, with its own backend logic in `index.php`.

## Requirements

- PHP 8.4
- A modern browser

## Run locally

```powershell
php -l index.php
php -S localhost:5084
```

Open http://localhost:5084, select **Load example**, then **Analyze release**.

## Implementation

- PHP processes the JSON payload, validates the six checklist values and calculates the score.
- Health endpoint: `GET /?api=health`
- Analysis endpoint: `POST /?api=analyze`
- The interface supports findings, JSON export and browser-only history.

I deployed the source directory directly to `SWE40006-Task3-PHP` on Azure App Service with the PHP 8.4 Linux runtime. The evaluation is based on user input, not a real cloud security scan.
