# Task 4 Report — evidence and submission notes

Student: Nguyen Huyen Minh Nhat  
Student ID: 105550225  
Unit: SWE40006 — Software Deployment and Evolution  
Semester: Fall 2026  
Due date: Confirm against Canvas instructions  
Submission date: Enter the actual submission date

## Level attempted
Level 4.4 (High Distinction), subject to completing and evidencing the outstanding verification items listed below.

## Environment
Windows 11 Home, 64-bit, Docker Desktop with WSL 2. Docker CLI reported version 29.8.2 (build 7fc2dff).

## Task 4.1
The Docker `hello-world` container ran successfully.

## Task 4.2 — Python HTTP application
A Python standard-library HTTP server returns `Hello from my Python Docker app!` on port 8000. Its image was built as `python-hello-app:1.0` and run with host port 8000 published. The local response was verified with curl.

Docker Hub image: https://hub.docker.com/r/nhatnguyen2407/swe40006_task04  
Tag: `nhatnguyen2407/swe40006_task04:1.0`  
Recorded digest: `sha256:f04eda66fbf6def85364370a61b439fbc3a35edb72443a70f6711046f048b941`

A same-machine pull was reported successful. A pull from a separate physical Docker device still needs independent evidence.

## Task 4.3 — Web application
The Python Task Manager web app supports adding tasks, toggling completion and deleting tasks. It was built as `task-manager:1.0`, run with host port 8001 mapped to container port 8000, and tested in a browser. The local endpoint was `http://localhost:8001`.

**Important:** localhost is not a public internet endpoint. Add a public runtime URL/IP only after deploying and testing the app from outside the local machine.

## Task 4.4 — Non-web CLI application
The interactive Python CLI Task Manager supports listing, adding, toggling and deleting tasks. It was built as `task-manager-cli:1.0` and run interactively. For persistence, mount a named Docker volume at `/app`; include evidence that a task survives restarting/re-attaching with the same volume before claiming persistence conclusively.

## Errors and lessons
An initial Docker setup error was captured in the screenshots. Before final submission, transcribe the exact error message and add the real corrective steps used; do not infer an error message that is not recorded. The host/container port mapping is also important: Task 4.3 uses host port 8001 forwarded to container port 8000.

## Submission checklist
- [ ] Insert the actual submission date and confirm the due date from Canvas.
- [ ] Add labelled screenshots and paste relevant console output into the final Word report.
- [ ] Record exact initial Docker error and its resolution.
- [ ] Verify a pull/run from a separate physical Docker device.
- [ ] Verify volume persistence across restart/re-attachment.
- [ ] Add a public runtime endpoint only if deployment is completed and externally tested.
- [ ] Ensure no passwords, tokens, private keys or other credentials are published.

## Source
The Task 4 source code and Dockerfiles are in the parent Task 04 folder. The Word report is a separate submission deliverable.
