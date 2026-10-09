# Demo 01 — Data Processing and Visualisation

**Unit:** COS30045 — Data Processing and Visualisation  
**Platform:** KNIME Analytics Platform

## Overview

This folder contains the files currently associated with Demo 01. The workflow and supporting files are kept in their existing locations because the KNIME workflow may refer to local or relative file paths.

The Week 1 exercise covers data import, cleaning, filtering, aggregation, and visualisation using television-product data.

## Files in this folder

| File | Role |
|---|---|
| [`COS30045_Lab01.knwf`](COS30045_Lab01.knwf) | KNIME workflow |
| [`tv_2026_02_15.csv`](tv_2026_02_15.csv) | Source television dataset |
| [`BrandCount.csv`](BrandCount.csv) | Exported brand-count summary |
| [`televisionsmay2015(1).docx`](televisionsmay2015%281%29.docx) | Dataset documentation / data dictionary |
| [`COS30045 W1 Class.pdf`](COS30045%20W1%20Class.pdf) | Supporting class material |
| [`AI_Use.docx`](AI_Use.docx) | AI-use declaration |

## Workflow process

The Week 1 workflow is intended to follow this sequence:

1. **Read the source data** from the CSV file.
2. **Select relevant columns** for the analysis.
3. **Clean and standardise text** values where required.
4. **Filter records** using the availability and Australian-market criteria configured in the workflow.
5. **Group records by brand** and calculate record counts.
6. **Sort and visualise** the aggregated data.
7. **Export the summary** to `BrandCount.csv`.

Use the actual node configuration and executed output in KNIME as the authoritative source for the exact implementation and results.

## Reopen and run the workflow

1. Clone or download the repository.
2. Open KNIME Analytics Platform.
3. Import `COS30045_Lab01.knwf`.
4. Inspect the CSV Reader and any file-system-related settings.
5. Confirm that the source path resolves to `tv_2026_02_15.csv` in your local copy.
6. Execute the workflow and inspect the output table and visualisations.

**Do not move or rename the workflow or its data files without checking the node configuration.** If KNIME cannot find a source file on another computer, update the relevant path in KNIME and test the workflow again.

## Interpreting the output

- `BrandCount.csv` is an exported summary, while `tv_2026_02_15.csv` is the source dataset.
- A count represents records that remain after the workflow's configured filters. It does not automatically represent sales volume, popularity, or market share.
- Check the workflow output before quoting counts or making claims about the distribution of brands.
- Refer to the data dictionary for the meaning and limitations of each field.

## Academic integrity

The accompanying AI-use declaration should accurately describe the assistance used. Follow the current assessment instructions, and ensure that you can explain the workflow decisions and output during the demonstration.
