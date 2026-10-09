# Demo 01 — Data Processing and Visualisation

**Unit:** COS30045 — Data Processing and Visualisation  
**Platform:** KNIME Analytics Platform

## Overview

This folder stores the files currently associated with Demo 01, including a KNIME workflow, the television dataset, an exported brand-count table, supporting course material, and an AI-use declaration.

The work focuses on preparing data and exploring television-product information through filtering, cleaning, aggregation, and visualisation.

## Files

| File | Purpose |
|---|---|
| `COS30045_Lab01.knwf` | KNIME workflow file |
| `tv_2026_02_15.csv` | Television dataset used by the workflow |
| `BrandCount.csv` | Exported brand-count summary |
| `televisionsmay2015(1).docx` | Dataset reference / data dictionary |
| `COS30045 W1 Class.pdf` | Supporting class material |
| `AI_Use.docx` | AI-use declaration |

## Workflow outline

The Week 1 workflow follows a typical data-preparation sequence:

1. **Read the data** from the CSV source.
2. **Select relevant columns** for the analysis.
3. **Clean and standardise text** values where needed.
4. **Filter rows** according to availability and Australian-market criteria.
5. **Group and count records** by brand.
6. **Sort and visualise** the aggregated results.
7. **Export the summary table** for later use.

This is a high-level outline of the process; the exact node configuration and final results should be checked in the `.knwf` workflow and its executed outputs.

## Reopen the workflow

1. Download or clone the repository.
2. Open KNIME Analytics Platform.
3. Import `COS30045_Lab01.knwf`.
4. Check the CSV Reader and any file-path-dependent nodes.
5. If necessary, update the input path to the copy of `tv_2026_02_15.csv` on your computer.
6. Execute the workflow and inspect the output table and charts.

## Data and interpretation notes

- The exported `BrandCount.csv` should be treated as an output of the workflow, not as a substitute for the source dataset.
- Confirm all counts and chart interpretations against the workflow's actual output before reporting them.
- A brand count describes the number of records in the filtered dataset; it does not by itself establish sales, popularity, or market share.
- Check the dataset documentation for field definitions and limitations.

## Academic integrity

The accompanying AI-use declaration should accurately describe any AI assistance used during the work. Follow the unit's current submission requirements and ensure that all submitted analysis reflects your own understanding.
