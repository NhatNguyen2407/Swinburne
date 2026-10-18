# Week 05 - D3 Multi-chart Webpage

For Week 5, I put three charts on one page. Each chart has its own JavaScript file, so I can work on the exercise independently without mixing all the drawing code together.

## Exercises

- Exercise 5.1 - Vertical bar chart of the average labelled annual energy use of 55-inch TVs, grouped by screen technology
- Exercise 5.2 - Scatter points and a connecting line for Australian wholesale electricity spot prices from 1998 to 2024
- Exercise 5.3 - Donut chart of small, medium and large TV screen-size groups

The page uses D3 v7 to load the CSV files and draw scalable SVG charts.

## Run locally

Start a web server from the Week05 folder:

```bash
python -m http.server 8000
```

Open http://localhost:8000 in a browser. D3 is loaded from its CDN, so the browser needs internet access. Opening index.html directly with a file URL can block CSV loading.

## Folder structure

```text
Week05/
├── index.html
├── css/
│ └── style.css
├── data/
│ ├── ARE_Spot_Prices.csv
│ ├── tv_55inch_energy.csv
│ └── tv_screen_sizes.csv
├── js/
│ ├── bar-chart.js
│ ├── line-chart.js
│ └── donut-chart.js
├── scripts/
│ └── prepare_tv_data.py
├── docs/
│ ├── EXERCISE_NOTES.md
│ └── AI_DECLARATION.md
└── README.md
```

## Data

I reused the television dataset at ../Week01/data/tv_2026_02_15.csv. The two TV summary files contain only available registration records listed for Australia, with valid positive screen size and labelled energy consumption.

- For Exercise 5.1, I converted screen diagonal from centimetres to inches, rounded to the nearest inch, kept the 55-inch group, and calculated the mean labelled annual kWh by screen technology
- For Exercise 5.3, I counted screens under 42 inches as Small, from 42 to under 65 inches as Medium, and 65 inches or more as Large
- For Exercise 5.2, I kept the supplied ARE_Spot_Prices.csv file and used its Year and Average Price (notTas-Snowy) columns

I can regenerate the two television summary files from the Week01 dataset with:

```bash
python scripts/prepare_tv_data.py
```

That script uses only the Python standard library.

## Checking my charts

- The bar chart uses a band scale for technology and a linear scale for annual energy, with labelled axes and values
- The time-series chart uses linear scales for both year and price, circles for the observations, and a D3 line generator for the connecting path
- The donut chart uses a categorical colour scale, a pie layout and an arc generator, with a labelled legend
- All three SVGs use viewBox values and remain readable when the browser width changes

## Limits

- Television registration counts do not measure sales or market share
- Labelled kWh/year is not the electricity use measured in a household
- The spot-price series is the average in the supplied dataset, excluding Tasmania and Snowy; these wholesale prices are not residential tariffs
- The comparisons in the TV chart are descriptive, not causal

The decisions for each exercise are in [EXERCISE_NOTES.md](docs/EXERCISE_NOTES.md), and my AI use is recorded in [AI_DECLARATION.md](docs/AI_DECLARATION.md).
