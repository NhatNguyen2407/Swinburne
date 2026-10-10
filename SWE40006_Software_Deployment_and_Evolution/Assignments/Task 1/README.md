# Task 1 — HelloWiX

This assignment demonstrates packaging and deploying a Windows desktop application. The existing source projects are currently stored at the course-directory root:

- `HelloWiX/` — Windows Forms application.
- `HelloWiX.Installer/` — WiX Toolset project for creating an MSI installer, including the `HelloWiX.Core` dependency.
- `HelloWiX.Package/` — Windows Application Packaging Project for MSIX packaging.

## What to include in the final submission

- [ ] Source projects and project/solution configuration.
- [ ] A successful application build.
- [ ] A successful WiX/MSI build, with the generated MSI tested on the target machine.
- [ ] Evidence that the installed application launches and behaves as expected.
- [ ] MSIX/package and Microsoft Store evidence, if required by the assessment brief.
- [ ] A report describing the deployment workflow, errors encountered, root causes, fixes, and verification.
- [ ] A clear README with prerequisites and repeatable build/test instructions.

## Screenshots

Put screenshots captured from the actual assignment workflow in [`screenshots/`](./screenshots/). Recommended evidence includes:

1. Application running before packaging.
2. Successful build output for the application and installer.
3. The generated MSI/package file and its version.
4. Installer completion.
5. The application launched from its installed location.
6. Any required MSIX or Store submission status.

Use concise, ordered filenames such as `01-app-running.png`, `02-installer-build.png`, and `03-installed-app.png`. Add a short caption for each image in the report.

**Evidence integrity:** do not fabricate screenshots or use tutorial examples as proof of your own installation. The source archive contains a tutorial screenshot bundle, but those images must be reviewed and kept labelled as tutorial/reference material unless you verify that they are genuine evidence for this assignment.

## Build environment

The current project README identifies Visual Studio 2026 Community, .NET 8 Windows Forms, .NET Standard 2.1, and WiX Toolset 4.0.5. Confirm these versions against the actual installed environment before final submission.

## Current limitation

This README is documentation scaffolding. It does not assert that a final MSI/MSIX artifact, installation screenshots, or the assessment report are present in this folder.
