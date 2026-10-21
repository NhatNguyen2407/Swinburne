# COS30045 - Data Visualisation

Practical work, assessment tracking and project notes for COS30045 at Swinburne University of Technology.

## Labs

- [Week 01](Labs/Week01/) - KNIME data processing and initial visualisations (also covers Week 2 tasks)
- [Week 03](Labs/Week03/) - television data story and supporting analysis
- [Week 04](Labs/Week04/) - SVG house, DOM manipulation and D3 bar chart
- [Week 05](Labs/Week05/) - bar, line/scatter and donut charts
- [Week 06](Labs/Week06/) - interactive histogram and scatterplot with filters and tooltips

## Assessments

- [Demonstration 1](Assignments/Demo_01/) - KNIME exercise materials
- [Visualisation Critique](Assignments/Critique/) - report stored separately in the provided course archive
- [Demonstration 2](Assignments/Demo_02/) - Week 7 preparation and outstanding submission steps
- [Data Visualisation Project](Project/) - future project work

## Running the D3 labs

Start a server from `COS30045/Labs`:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/Week04/`, `/Week05/` or `/Week06/`. The pages load D3 from its official CDN.

## Notes

The TV dataset contains energy-rating registration records, not product sales. Charts and conclusions should be interpreted in that context.

GitHub contains the exercise source code, but course submission also requires the relevant GitHub Classroom repositories, Mercury-hosted links and separate GenAI declaration documents where specified. I track those requirements in the assessment folders.
