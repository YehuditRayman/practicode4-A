namespace TodoApi
{
    public partial class Item
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsComplete { get; set; } = false;
    }
}
