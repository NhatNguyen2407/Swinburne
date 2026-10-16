"""Recalculate the Week 3 website data from the existing Week 1 CSV."""
from pathlib import Path
import json
import pandas as pd

HERE = Path(__file__).resolve().parents[1]
SOURCE = HERE.parent / "Week01/data/tv_2026_02_15.csv"
frame = pd.read_csv(SOURCE)
frame = frame.loc[
    frame["Availability Status"].eq("Available")
    & frame["SoldIn"].fillna("").str.contains(r"(?:^|,)Australia(?:,|$)", regex=True)
].copy()
frame["inches"] = pd.to_numeric(frame["screensize"], errors="coerce") / 2.54
frame["kwh"] = pd.to_numeric(frame["Labelled energy consumption (kWh/year)"], errors="coerce")
frame = frame.loc[frame["inches"].gt(0) & frame["kwh"].gt(0)]
groups = ["<40", "40–49", "50–59", "60–69", "70–79", "80–89", "90+"]
frame["band"] = pd.cut(
    frame["inches"], bins=[0, 40, 50, 60, 70, 80, 90, float("inf")],
    labels=groups, right=False
)
sizes = frame.groupby("band", observed=False)["kwh"].agg(count="size", median_kwh="median")
tech = (frame.loc[frame["band"].eq("60–69")]
        .groupby("Screen_Tech")["kwh"]
        .agg(count="size", median_kwh="median")
        .reindex(["LCD", "LCD (LED)", "OLED"]))
sizes.rename_axis("screen_size_inches").to_csv(HERE / "data/size_summary.csv", float_format="%.1f")
tech.rename_axis("screen_technology").to_csv(HERE / "data/technology_60_69.csv", float_format="%.1f")

def rows(table, names):
    return [
        {"label": str(name), "count": int(row["count"]), "median": int(round(row["median_kwh"]))}
        for name, row in zip(names, table.to_dict("records"))
    ]

summary = {
    "sizes": rows(sizes, groups),
    "technologies": rows(tech, ["LCD", "LCD (LED)", "OLED"])
}
(HERE / "data/summary.js").write_text(
    "// Generated from the supplied Week 1 television CSV. See scripts/rebuild.py.\n"
    + "window.tvStoryData = " + json.dumps(summary, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8"
)
print(f"Built summaries from {len(frame):,} registration records.")
