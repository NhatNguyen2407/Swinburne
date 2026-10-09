# COS30045 — Data Processing and Visualisation

Coursework repository for **COS30045 Data Processing and Visualisation** at Swinburne University of Technology.

This directory separates practical lab work, assessment materials, and project development.

## Repository map

| Directory | Purpose |
|---|---|
| [Labs](Labs/) | Weekly practical exercises, source data, documentation, and KNIME workflows |
| [Assignments](Assignments/) | Assessment artefacts and supporting documentation |
| [Project](Project/) | Project planning and development materials |

### Current materials

- [Week 01 lab](Labs/Week01/) — introductory data processing using KNIME
- [Demo 01 assessment folder](Assignments/Demo_01/) — workflow, source dataset, exported brand-count data, and supporting documents
- [Project overview](Project/README.md) — project components and development structure

## Tools

- **KNIME Analytics Platform** for data import, cleaning, transformation, aggregation, and visualisation
- **CSV** for tabular data and exported results
- **GitHub** for version control and documentation

## Reopening a KNIME workflow

1. Clone or download the repository.
2. Open KNIME Analytics Platform and import the relevant `.knwf` workflow.
3. Inspect the CSV Reader and other file-dependent nodes.
4. Confirm that each input path resolves to the intended dataset in your local copy.
5. Execute the workflow and check the output tables and visualisations.

**Important:** KNIME workflows can store file references that depend on the original folder layout or machine. Keep related data files in their current locations unless you also update and test the workflow paths.

## Data and academic integrity

Course materials and datasets are included to support learning. Check the course requirements and applicable data licences before redistributing them. Analytical claims should be based on the outputs produced by the workflow, and generative AI use should be declared accurately according to the unit's instructions.

## Maintenance

Documentation is updated as labs, assessments, and the project progress. Folder contents may therefore change during the teaching period.
