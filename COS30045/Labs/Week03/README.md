# Week 03 - Communicating Data Insights

For this exercise, I used the television data from my KNIME work to build a short explanatory story. I wanted to show one clear finding rather than fill a page with every possible chart.

The question behind the page is: how does screen size relate to the annual energy consumption printed on a television's label?

## Run the website

Open `index.html` in a browser. The page uses plain HTML, CSS and a small amount of JavaScript to draw SVG charts. It does not require D3, a package manager, or an internet connection.

## Audience and message

The audience is a general reader comparing television specifications. I want them to understand that screen size is strongly associated with labelled yearly consumption, while the screen technology label alone does not explain every difference.

The story follows a fixed sequence:

- The distribution of screen sizes in the available Australian registration records
- The median labelled kWh/year for each size range
- A technology comparison within the 60-69 inch range
- A takeaway about comparing size and energy labels

## Files

```text
Week03/
├── index.html
├── assets/
│ ├── styles.css
│ └── charts.js
├── data/
│ ├── summary.js
│ ├── size_summary.csv
│ └── technology_60_69.csv
├── docs/
│ ├── STORYBOARD.md
│ └── AI_DECLARATION.md
├── scripts/
│ └── rebuild.py
├── requirements.txt
└── README.md
```

## Data processing

I reused the dataset at `../Week01/data/tv_2026_02_15.csv` rather than copying it into another folder.

- Keep rows with `Availability Status` equal to `Available`
- Keep rows where `SoldIn` includes Australia
- Convert `screensize` from centimetres to inches using 2.54
- Keep valid positive screen-size and labelled-consumption values
- Group by screen diagonal: below 40, 40-49, 50-59, 60-69, 70-79, 80-89, and 90+ inches
- Count dataset rows and calculate median `Labelled energy consumption (kWh/year)`
- Compare technologies only within the 60-69 inch size band

The supplied CSV has 4,724 records. After filtering, the charts use **4,508 registration rows**. Those rows do not represent units sold, and several can refer to the same product registration.

To regenerate the summary files using the Week 1 dataset:

```bash
python -m pip install -r requirements.txt
python scripts/rebuild.py
```

The script rewrites the CSV summaries and `data/summary.js`, which the page reads directly. The chart drawing code is in `assets/charts.js`.

## Limitations

- Labelled kWh/year is not an individual household's measured consumption or electricity bill
- This is a dataset of registrations, not sales or current retail stock
- A same-size-band technology comparison does not control for every specification, so it should not be interpreted as causal evidence
- This is a self-contained Week 3 page within my coursework repository; a GitHub Classroom exercise repository and Mercury deployment are separate submission steps

## Design notes and AI use

My storyboard and chart decisions are explained in [STORYBOARD.md](docs/STORYBOARD.md). I have also documented the assistance used in [AI_DECLARATION.md](docs/AI_DECLARATION.md).
