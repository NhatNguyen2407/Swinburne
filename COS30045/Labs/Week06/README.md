# Week 06 - D3 Interactivity

I built two connected charts from the television dataset: a histogram showing the distribution of labelled annual energy consumption and a scatterplot comparing screen size with that energy figure.

## Exercises

- 6.1 - Histogram using `d3.bin()`, scales and axes
- 6.2 - Screen technology buttons that update the histogram
- 6.3 - Scatterplot of screen size against annual energy consumption
- 6.4 - Hover tooltips with brand, model, technology, star rating and energy
- Extension - Screen size filter; both charts respond to the same controls

## Run locally

From `COS30045/Labs`, run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/Week06/`. The page loads D3 v7 from its official CDN and uses `d3.csv()` to load the Week 1 dataset, so a local server and internet access are needed.

## Data and reproducibility

The supplied Week 6 `Ex6_TVdata_withStar.csv` contains 4,233 cleaned registration records. I compared those records with `../Week01/data/tv_2026_02_15.csv` (4,724 raw rows) and verified that each cleaned record corresponds to a source row in the same order.

Instead of checking a second copy of the CSV into GitHub, `data/selected-rows.txt` stores 260 inclusive source-row ranges matching the Week 6 export. The page reads the original source and those ranges, then converts the original columns into screen size (inches), technology, star rating and annual energy consumption. This reproduces the 4,233 observation values, including the high-energy outlier; some original brand spellings differ from the cleaner export.

The source CSV's row order must stay unchanged. If it changes, I need to regenerate the selected-row ranges from the supplied Week 6 export.

## Checks

- The browser console shows 4,233 rows and the bin counts
- The histogram includes the 2,652 kWh/year outlier
- The screen technology filter offers All, LCD, LED and OLED
- Both visualisations change when a filter is selected
- The scatterplot hover shows the TV model and its values
- All bins use the same 150 kWh/year intervals for comparison

## Files

- `index.html` - page structure
- `css/style.css` - layout and chart styles
- `js/main.js` - data loading, scales, charts and interactions
- `data/selected-rows.txt` - match to the supplied Week 6 export
- `docs/EXERCISE_NOTES.md` - implementation and interpretation notes
- `docs/AI_DECLARATION.md` - record of generative AI assistance

This exercise is practice for the on-campus Week 7 demonstration, not evidence that the demonstration or Mercury deployment has been completed.
