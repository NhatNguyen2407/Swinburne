# Week 01 — Introduction to Data Processing with KNIME

## Overview

This lab folder contains the Week 01 KNIME workflow, source data, dataset documentation, and exported brand-count data.

## Folder contents

```text
Week01/
├── data/
│   ├── BrandCount.csv
│   └── tv_2026_02_15.csv
├── documentation/
│   └── televisionsmay2015(1).docx
└── workflow/
    └── COS30045_Lab01.knwf
```

## Workflow outline

The exercise explores a television dataset through data import, column selection, text cleaning, row filtering, brand-level aggregation, sorting, and visualisation. The exported `BrandCount.csv` stores a summary table produced for downstream use.

## Running the workflow

1. Open KNIME Analytics Platform.
2. Import `workflow/COS30045_Lab01.knwf`.
3. Inspect the input node's file path and ensure it points to `data/tv_2026_02_15.csv` in your local copy.
4. Execute the workflow and check the resulting tables and charts.

KNIME file references may depend on the original workflow configuration. If the CSV Reader cannot locate the dataset, update the path in KNIME and test the workflow. Do not assume the workflow is portable until it has been run from the cloned/downloaded folder.

## Data notes

- The source CSV is the input dataset; `BrandCount.csv` is a derived summary.
- Interpret counts in the context of the workflow's filters.
- Use the accompanying data dictionary to understand column definitions.
- Validate any reported values against the actual KNIME output.

## Relationship to Demo 01

A copy of the Week 01 workflow and associated data also exists in [Assignments/Demo_01](../../Assignments/Demo_01/README.md), where the assessment-specific documentation is maintained.
