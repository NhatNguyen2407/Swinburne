# Week 04 - SVG and D3

I worked through the Week 4 exercises by separating the SVG drawing from the D3 examples. The last page is a bar chart built from the television brand counts supplied with the Week 4 KNIME workflow.

## Open the exercises

Start a local web server in this folder, then open `index.html`. In VS Code I can use the Live Server extension. Alternatively, from the Week04 folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` and use the navigation to switch between exercises. Exercises 4.2-4.7 load D3 v7 from its official CDN and therefore require an internet connection. The bar chart uses `d3.csv()`, so opening the HTML directly as a `file://` page may block the CSV request.

## Exercise pages

- [Exercise 4.1 - SVG house](house.html): House and garden built from SVG shapes, grouped windows, transforms, and an annotated coordinate diagram
- [Exercise 4.2 - DOM manipulation](dom.html): Use D3 to style an element, append a paragraph, and add an SVG rectangle
- [Exercises 4.3-4.7 - D3 bar chart](index.html): Read a CSV, convert counts to numbers, sort the data, bind records to SVG elements, apply scales, and add labels

The finished bar chart also has a Top 10 / All 25 toggle so I can inspect the data at two levels of detail.

## Files

```text
Week04/
├── index.html
├── house.html
├── dom.html
├── assets/
│   ├── style.css
│   └── house-annotated.svg
├── data/
│   └── tvBrandCount.csv
├── js/
│   ├── chart.js
│   └── dom.js
├── docs/
│   ├── EXERCISE_NOTES.md
│   └── AI_DECLARATION.md
└── README.md
```

## Dataset and scope

I used `tvBrandCount.csv` from the **2026 TV Data.knwf** file included in the Week 4 lab materials. The KNIME workflow filters for available registrations sold in Australia, groups records by brand, and keeps brands with at least 20 records. The resulting file has 25 brands and 4,240 rows across the displayed groups.

These counts describe rows in the data, not the number of units sold or brand market share. I kept the CSV in this folder so the bar chart can be reproduced without running KNIME again.

## Checking the exercises

- Check that the SVG house displays its shapes and two windows in matching styles
- Read the annotated coordinate figure and inspect the `#windows` group in DevTools
- Confirm that Exercise 4.2 inserts a paragraph and rectangle after D3 loads
- Confirm that the chart sorts brands by count and shows brand labels and numeric values
- Switch between All 25 and Top 10 to check that D3 rebinds the data correctly

The annotated SVG figure is included as a coordinate reference, **not a literal browser screenshot**. The browser/DevTools screenshots mentioned in Exercise 4.1 are not part of this repository snapshot. They should be captured from the actual browser if required for marking.

## Academic integrity

My exercise notes are in [EXERCISE_NOTES.md](docs/EXERCISE_NOTES.md). I recorded the AI assistance used in [AI_DECLARATION.md](docs/AI_DECLARATION.md). The published exercise briefs remain the source of truth for assessment requirements.
