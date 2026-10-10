from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from html import escape
import json
import os
from pathlib import Path

DATA_FILE = Path("/app/tasks.json")


def load_tasks():
    if DATA_FILE.exists():
        try:
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return []
    return []


def save_tasks(tasks):
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(
        json.dumps(tasks, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )


class TaskHandler(BaseHTTPRequestHandler):
    def send_html(self, content, status=200):
        data = content.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def redirect_home(self):
        self.send_response(303)
        self.send_header("Location", "/")
        self.end_headers()

    def do_GET(self):
        tasks = load_tasks()
        items = ""

        for task in tasks:
            task_id = task["id"]
            title = escape(task["title"])
            done = task["done"]
            status = "Completed" if done else "Pending"
            style = "text-decoration: line-through;" if done else ""
            button_label = "Undo" if done else "Complete"

            items += f"""
            <li>
              <span style="{style}">{title}</span>
              <small>({status})</small>
              <form method="POST" action="/toggle" style="display:inline">
                <input type="hidden" name="id" value="{task_id}">
                <button type="submit">{button_label}</button>
              </form>
              <form method="POST" action="/delete" style="display:inline">
                <input type="hidden" name="id" value="{task_id}">
                <button type="submit">Delete</button>
              </form>
            </li>
            """

        if not items:
            items = "<li>No tasks yet. Add your first task above.</li>"

        page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Docker Task Manager</title>
<style>
body {{ max-width:760px; margin:40px auto; padding:0 20px;
font-family:Arial,sans-serif; background:#f4f6f8; color:#222; }}
main {{ background:white; padding:28px; border-radius:12px;
box-shadow:0 3px 14px #0001; }}
input[type=text] {{ padding:10px; width:60%; max-width:360px; }}
button {{ padding:8px 12px; margin:4px; cursor:pointer; }}
li {{ margin:14px 0; }}
.note {{ color:#555; }}
</style>
</head>
<body>
<main>
<h1>Docker Task Manager</h1>
<p class="note">A Python web application running inside a Docker container.</p>
<form method="POST" action="/add">
<input type="text" name="title" maxlength="120"
placeholder="Enter a task..." required>
<button type="submit">Add Task</button>
</form>
<h2>Your Tasks ({len(tasks)})</h2>
<ul>{items}</ul>
</main>
</body>
</html>"""
        self.send_html(page)

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        form_data = self.rfile.read(length).decode("utf-8")
        values = parse_qs(form_data)
        tasks = load_tasks()

        if self.path == "/add":
            title = values.get("title", [""])[0].strip()
            if title:
                next_id = max((task["id"] for task in tasks), default=0) + 1
                tasks.append({
                    "id": next_id,
                    "title": title[:120],
                    "done": False
                })
                save_tasks(tasks)

        elif self.path == "/toggle":
            task_id = values.get("id", [""])[0]
            for task in tasks:
                if str(task["id"]) == task_id:
                    task["done"] = not task["done"]
                    break
            save_tasks(tasks)

        elif self.path == "/delete":
            task_id = values.get("id", [""])[0]
            tasks = [task for task in tasks if str(task["id"]) != task_id]
            save_tasks(tasks)

        self.redirect_home()


port = int(os.environ.get("PORT", "8000"))
server = HTTPServer(("0.0.0.0", port), TaskHandler)
print(f"Task Manager listening on port {port}", flush=True)
server.serve_forever()
