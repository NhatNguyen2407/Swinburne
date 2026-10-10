# Task 1 — HelloWiX

This folder contains the Task 1 source projects and assignment documentation.

## Project structure

```text
Task 1/
├── README.md
├── screenshots/
│   └── README.md
└── HelloWiX/
    ├── HelloWiX/                 # Windows Forms application
    ├── HelloWiX.Installer/       # WiX MSI project and HelloWiX.Core dependency
    └── HelloWiX.Package/         # MSIX packaging project
```

## Build and deployment workflow

1. Open the solution in `HelloWiX/HelloWiX.Installer/HelloWiX.Installer.slnx` using a compatible Visual Studio installation.
2. Build the HelloWiX application and the WiX installer project.
3. Test the generated MSI on the target Windows environment.
4. Verify that the installed application launches and its dependency is present.
5. Build and test the MSIX package if required by the task brief.
6. Record actual results, errors, root causes, fixes, and verification in the assessment report.

Confirm SDK and WiX versions against the actual environment before building. Generated binaries and installers are intentionally excluded from source control.

## Evidence checklist

- [ ] Application running before packaging.
- [ ] Application build succeeds.
- [ ] WiX/MSI build succeeds.
- [ ] Generated installer is visible.
- [ ] Installation completes.
- [ ] Installed application launches successfully.
- [ ] MSIX/Store evidence is included if required.
- [ ] Report explains deployment decisions and troubleshooting.

Put genuine screenshots in [`screenshots/`](./screenshots/). Do not use tutorial screenshots as proof of your own installation. The source materials include reference screenshot archives; keep those in the tutorial materials area and clearly label them as reference material.

## Current status

The source projects have been grouped under this Task 1 folder. This README does not claim that installation screenshots, a final assessment report, or built MSI/MSIX artifacts have been added.
