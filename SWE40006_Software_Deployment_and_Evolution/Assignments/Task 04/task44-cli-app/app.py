import json
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
        json.dumps(tasks, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


def show_tasks(tasks):
    print("\n=== Docker CLI Task Manager ===")
    if not tasks:
        print("No tasks yet.")
    else:
        for task in tasks:
            status = "Done" if task["done"] else "Pending"
            print(f'{task["id"]}. [{status}] {task["title"]}')


def main():
    tasks = load_tasks()
    next_id = max((task["id"] for task in tasks), default=0) + 1

    while True:
        show_tasks(tasks)
        print("\n1. Add task")
        print("2. Toggle task completion")
        print("3. Delete task")
        print("4. Exit")

        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            title = input("Enter task title: ").strip()
            if title:
                tasks.append({"id": next_id, "title": title, "done": False})
                next_id += 1
                save_tasks(tasks)
                print("Task added.")
            else:
                print("Task title cannot be empty.")

        elif choice == "2":
            try:
                task_id = int(input("Enter task ID: "))
                task = next((t for t in tasks if t["id"] == task_id), None)
                if task:
                    task["done"] = not task["done"]
                    save_tasks(tasks)
                    print("Task status updated.")
                else:
                    print("Task not found.")
            except ValueError:
                print("Please enter a valid numeric ID.")

        elif choice == "3":
            try:
                task_id = int(input("Enter task ID to delete: "))
                updated = [t for t in tasks if t["id"] != task_id]
                if len(updated) < len(tasks):
                    tasks = updated
                    save_tasks(tasks)
                    print("Task deleted.")
                else:
                    print("Task not found.")
            except ValueError:
                print("Please enter a valid numeric ID.")

        elif choice == "4":
            print("Goodbye!")
            break

        else:
            print("Invalid option. Choose 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
