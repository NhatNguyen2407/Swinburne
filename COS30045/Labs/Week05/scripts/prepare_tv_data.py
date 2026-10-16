"""Rebuild my Week 5 television summaries from the Week 1 CSV."""
import csv
from collections import defaultdict
from pathlib import Path

week = Path(__file__).resolve().parents[1]
source = week.parent / "Week01" / "data" / "tv_2026_02_15.csv"
groups = {"Small": 0, "Medium": 0, "Large": 0}
energy = defaultdict(list)
with source.open(newline="", encoding="utf-8-sig") as handle:
    for row in csv.DictReader(handle):
        if row["Availability Status"] != "Available":
            continue
        if "Australia" not in (s.strip() for s in row["SoldIn"].split(",")):
            continue
        try:
            inches = float(row["screensize"]) / 2.54
            kwh = float(row["Labelled energy consumption (kWh/year)"])
        except (ValueError, TypeError):
            continue
        if inches <= 0 or kwh <= 0:
            continue
        category = "Small" if inches < 42 else "Medium" if inches < 65 else "Large"
        groups[category] += 1
        if round(inches) == 55:
            energy[row["Screen_Tech"]].append(kwh)

out = week / "data"
with (out / "tv_55inch_energy.csv").open("w", newline="", encoding="utf-8") as handle:
    writer = csv.writer(handle)
    writer.writerow(["technology", "records", "average_kwh"])
    for technology, values in sorted(energy.items(), key=lambda pair: -sum(pair[1]) / len(pair[1])):
        writer.writerow([technology, len(values), f"{sum(values) / len(values):.10f}"])

with (out / "tv_screen_sizes.csv").open("w", newline="", encoding="utf-8") as handle:
    writer = csv.writer(handle)
    writer.writerow(["category", "count"])
    writer.writerows(groups.items())
print("TV records included:", sum(groups.values()))
