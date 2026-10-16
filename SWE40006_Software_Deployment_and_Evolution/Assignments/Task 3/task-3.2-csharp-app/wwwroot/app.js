const form = document.querySelector("#task-form");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const status = document.querySelector("#status");

async function api(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

async function refresh() {
  const tasks = await api("/api/tasks");
  list.replaceChildren();
  count.textContent = `${tasks.filter(task => !task.isDone).length} open / ${tasks.length} total`;

  if (!tasks.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks yet. Add one above.";
    list.append(empty);
    return;
  }

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = task.isDone ? "task done" : "task";

    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = task.title;
    const priority = document.createElement("span");
    priority.className = "priority";
    priority.textContent = task.priority;
    details.append(title, priority);

    const actions = document.createElement("div");
    actions.className = "actions";
    const toggle = document.createElement("button");
    toggle.className = "secondary";
    toggle.textContent = task.isDone ? "Undo" : "Complete";
    toggle.addEventListener("click", () => change(`/api/tasks/${task.id}/toggle`, "PATCH"));

    const remove = document.createElement("button");
    remove.className = "danger";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => change(`/api/tasks/${task.id}`, "DELETE"));
    actions.append(toggle, remove);
    item.append(details, actions);
    list.append(item);
  }
}

async function change(url, method) {
  try {
    await api(url, { method });
    status.textContent = "";
    await refresh();
  } catch (error) {
    status.textContent = error.message;
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  if (!title) return;

  try {
    await api("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority: form.elements.priority.value })
    });
    form.reset();
    status.textContent = "";
    await refresh();
  } catch (error) {
    status.textContent = error.message;
  }
});

refresh().catch(error => { status.textContent = error.message; });
