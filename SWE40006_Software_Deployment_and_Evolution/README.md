# SWE40006 — Software Deployment and Evolution

Course workspace for lecture notes, tutorial materials, supporting deployment guides, and assignment work.

## Repository layout

```text
SWE40006_Software_Deployment_and_Evolution/
├── Assignments/
│   └── Task 1/
│       ├── README.md
│       └── screenshots/
│           └── README.md
├── Documents/
│   └── README.md
├── Lectures/
│   └── README.md
├── Tutorials/
│   └── README.md
├── HelloWiX/                 # existing Task 1 application source
├── HelloWiX.Installer/       # existing WiX MSI project and dependency
└── HelloWiX.Package/         # existing MSIX packaging project
```

The HelloWiX projects were already present in this directory before this documentation update. The assignment README explains the intended final structure and evidence checklist.

## Course materials

- [Lectures](./Lectures/README.md)
- [Tutorials](./Tutorials/README.md)
- [Supporting documents and walkthroughs](./Documents/README.md)
- [Task 1 — HelloWiX](./Assignments/Task%201/README.md)

## Task 1 status

The repository contains the HelloWiX application, a WiX installer project, and an MSIX packaging project. Screenshots and a final assessment report should be added only after checking that they show the actual build and installation state. Do not treat tutorial example screenshots as proof of a completed installation.

## Repository hygiene

- Keep Visual Studio build output, generated installers, caches, and machine-specific files out of source control.
- Never commit private keys, access tokens, passwords, or other credentials.
- Retain original lecture/tutorial documents and keep their filenames recognizable.
