# SWE40006 — Software Deployment and Evolution

Course workspace for lecture notes, tutorial materials, supporting deployment guides, and assignment work.

## Directory structure

```text
SWE40006_Software_Deployment_and_Evolution/
├── Assignments/
│   └── Task 1/
│       ├── README.md
│       ├── HelloWiX/
│       │   ├── HelloWiX/
│       │   ├── HelloWiX.Installer/
│       │   └── HelloWiX.Package/
│       └── screenshots/
├── Documents/
│   └── README.md
├── Lectures/
│   └── README.md
└── Tutorials/
    └── README.md
```

## Course materials

- [Lectures](./Lectures/README.md) — lecture slides and related weekly material.
- [Tutorials](./Tutorials/README.md) — tutorial instructions and practical exercises.
- [Supporting documents](./Documents/README.md) — deployment walkthroughs and reference guides.
- [Task 1 — HelloWiX](./Assignments/Task%201/README.md) — assignment overview, project structure, and evidence checklist.

## Task 1 — HelloWiX

The Task 1 project area groups the existing application and packaging projects:

- **HelloWiX** — Windows Forms application.
- **HelloWiX.Installer** — WiX-based MSI installer project and its related dependency.
- **HelloWiX.Package** — MSIX packaging project and assets.

Refer to the Task 1 README for current project details and required verification steps.

## Evidence and status

Only add screenshots or reports that reflect work actually performed. Tutorial/example screenshots are reference material and must not be presented as proof of your own build or installation. Record build, packaging, and installation outcomes only after verifying them.

## Repository hygiene

- Do not commit private keys, passwords, access tokens, or other secrets.
- Keep generated build output, caches, and machine-specific files out of version control.
- Preserve recognizable filenames for course resources and observe applicable copyright and academic-integrity requirements.
