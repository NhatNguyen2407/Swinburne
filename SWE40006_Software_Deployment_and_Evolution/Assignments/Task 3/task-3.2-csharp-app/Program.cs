using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

var tasks = new ConcurrentDictionary<Guid, StudyTask>();

app.MapGet("/api/tasks", () =>
    Results.Ok(tasks.Values.OrderByDescending(task => task.CreatedAt).ToArray()));

app.MapPost("/api/tasks", (NewTask request) =>
{
    var title = request.Title?.Trim();
    if (string.IsNullOrWhiteSpace(title) || title.Length > 80)
        return Results.BadRequest(new { error = "Title must contain 1 to 80 characters." });

    var priority = new[] { "Low", "Medium", "High" }
        .FirstOrDefault(value => value.Equals(request.Priority ?? "Medium", StringComparison.OrdinalIgnoreCase));

    if (priority is null)
        return Results.BadRequest(new { error = "Priority must be Low, Medium or High." });

    var task = new StudyTask(Guid.NewGuid(), title, priority, false, DateTimeOffset.UtcNow);
    tasks[task.Id] = task;
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPatch("/api/tasks/{id:guid}/toggle", (Guid id) =>
{
    while (tasks.TryGetValue(id, out var current))
    {
        var updated = current with { IsDone = !current.IsDone };
        if (tasks.TryUpdate(id, updated, current))
            return Results.Ok(updated);
    }

    return Results.NotFound(new { error = "Task not found." });
});

app.MapDelete("/api/tasks/{id:guid}", (Guid id) =>
    tasks.TryRemove(id, out _) ? Results.NoContent() : Results.NotFound());

app.Run();

record NewTask(string? Title, string? Priority);
record StudyTask(Guid Id, string Title, string Priority, bool IsDone, DateTimeOffset CreatedAt);
