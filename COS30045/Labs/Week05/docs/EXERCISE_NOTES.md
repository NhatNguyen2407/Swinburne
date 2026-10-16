# Week 05 - Exercise Notes

## 5.1 - Vertical bar chart

I wanted to compare the energy labels of TVs at the same nominal screen size, rather than compare the different technologies across all screen sizes. I filtered the available Australian registration records to those rounded to 55 inches, then grouped them by screen technology.

The mean labelled energy consumption is:

- LCD (LED): 585 records, 369.7 kWh/year
- OLED: 68 records, 358.7 kWh/year
- LCD: 83 records, 337.2 kWh/year

I used a band scale for the categories and a linear scale for the numerical values, with axes, tick labels and direct bar-value labels.

## 5.2 - Scatter plot and line chart

I used the official ARE_Spot_Prices.csv provided for the course. The two columns I used are Year and Average Price (notTas-Snowy). They cover 27 calendar years, from 1998 to 2024.

- Year is converted from a CSV string to an integer
- Average price is converted to a number in Australian dollars per megawatt-hour
- Both x and y positions use linear scales
- Circles show the individual yearly observations
- A D3 line generator connects the observations in chronological order

The highest yearly value in this supplied series is $144.50/MWh in 2022 and the lowest is $30.25/MWh in 2011. The average series excludes Tasmania and Snowy, as stated in the source column header.

## 5.3 - Donut chart

I used 4,508 valid Australian TV registration rows, divided into three size categories:

- Small: less than 42 inches, 770 rows
- Medium: at least 42 and less than 65 inches, 2,386 rows
- Large: 65 inches or more, 1,352 rows

The order of the groups is kept fixed. I use d3.pie() to calculate the angles, d3.arc() to draw paths with an inner radius and a categorical colour scale to distinguish the groups. The legend gives exact counts and percentages.

## What these figures mean

The TV figures describe registration records, not sales. The kWh/year values come from the energy label. The spot-price dataset tracks wholesale electricity prices and should not be used to infer the amount a household paid for electricity.

The TV summaries can be rebuilt by running scripts/prepare_tv_data.py from the Week05 folder while the Week01 data remains in its existing location.
