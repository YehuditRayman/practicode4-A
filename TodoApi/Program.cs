using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("ToDoDB");
connectionString ??= builder.Configuration.GetConnectionString("ToDoDB");

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString,
        new MySqlServerVersion(new Version(8,0,39))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowAll");
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }
app.MapGet("/items", async (ToDoDbContext db) => await db.Items.ToListAsync());

app.MapPost("/items", async (ToDoDbContext db, Item newItem) =>
{
    db.Items.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}", newItem);
});

// PUT – עדכון ✔️ בלבד
app.MapPut("/items/{id}", async (ToDoDbContext db, int id, [FromBody] Item updatedItem) =>
{
    Console.WriteLine($"PUT → id={id}, name={updatedItem.Name}, isComplete={updatedItem.IsComplete}");

    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;

    await db.SaveChangesAsync();
    return Results.Ok(item);
});


app.MapDelete("/items/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapGet("/", ()=>"The server is running");

app.Run();
