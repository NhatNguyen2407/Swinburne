# Week 04 - Exercise Notes

## 4.1 - SVG house

I drew the house using rectangles, a polygon, circles, ellipses, lines, a polyline, paths, and text. The two windows sit inside the same `g` element, and I gave the child groups different `translate(x y)` values. Their shared fill and stroke are set on the parent group.

The source uses a `viewBox` of `0 0 960 520`. SVG coordinates increase towards the right and downwards. I added an annotated SVG so I can check the specific coordinates used by the drawing.

I can inspect the window group in the browser, and the page prints the current `outerHTML` for reference. That markup display is not a screenshot of DevTools.

## 4.2 - Selecting and appending

In `dom.html`, D3 selects a heading and changes its colour, then appends a paragraph to a container. It also appends a rectangle to an existing blank SVG and sets the rectangle's position, dimensions and colour. The new nodes appear in the DOM after the JavaScript runs.

## 4.3 - Creating the chart container

I put the chart inside `.responsive-svg-container`. The D3 script creates the SVG and gives it a `viewBox` based on the rows being displayed, so I don't need to manually write a rectangle for each brand.

## 4.4 - Loading and preparing the data

I used `d3.csv()` with a row conversion function. `+d.count` turns CSV strings into numbers. I filter invalid rows, sort by descending count, and check the row count, minimum, maximum and extent in the console.

## 4.5 - Data binding

I use `.data(selected, d => d.brand).join(...)` to create or update one group per brand. Each group holds a rectangle and its two text labels. This keeps the category and value together.

## 4.6 - Scales

The numeric count is mapped to bar width through `d3.scaleLinear()`. The categories are positioned through `d3.scaleBand()`, with padding to keep the bars visually separate. The SVG height changes according to the number of visible categories.

## 4.7 - Labels

Each group contains the brand name before the bar and the exact count just after it. I reserved margins for these labels and added light guide lines to help estimate values. The toggle switches from 25 to 10 categories while retaining the same numeric scale.

## Interpretation

The highest count in this exported CSV is Samsung with 1,096 records. Kogan has 788 and LG has 677. This is a count of available Australian registration records within the supplied filtered dataset, not a sales or market-share ranking.
