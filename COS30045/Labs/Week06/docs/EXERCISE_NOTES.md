# Week 06 - Exercise Notes

## 6.1 - Histogram

I used `d3.csv()` to load TV registrations, converted the fields to numbers and used `d3.bin()` to group annual labelled energy consumption into 150 kWh/year intervals. The horizontal scale measures energy and the vertical scale shows the number of records in each bin. The full dataset has 4,233 rows.

## 6.2 - Filters

The technology buttons filter the in-memory records before the bins are calculated again. I kept the bin boundaries fixed so changes in bar heights represent changes in frequency rather than changes in the x-axis. The y-axis updates to suit the selected group, and the screen size dropdown offers an additional filter.

## 6.3 - Scatterplot

I used screen size in inches on the horizontal axis and annual labelled energy consumption on the vertical axis. Each circle represents one registration record. The colours separate LCD, LED and OLED, while transparency makes dense areas easier to read.

## 6.4 - Tooltips

I added D3 mouse events to the scatterplot points. The tooltip shows brand, model, technology, screen size, star rating and labelled annual kWh. The tooltip follows the pointer, and disappears when the pointer leaves the point.

## Questions to discuss during the demonstration

- `d3.csv()` reads the source file and supplies the rows used by both charts
- `d3.bin()` returns arrays of observations in each energy interval
- `scaleLinear()` maps data values to pixel positions; axes display those scales
- D3 `.data().join()` creates or updates SVG circles and histogram rectangles
- The buttons change filter state; `updateCharts()` redraws both visualisations
- A taller histogram bar means more records in that energy interval
- The charts show energy label figures for registrations, not measured household consumption or unit sales

The 2,652 kWh/year observation is unusual but present in the original data. I did not hide it, because removing it without explanation would change the distribution.
