namespace TodoApi
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; // שמור רגיל בשלב זה (בהמשך אפשר להצפין)
    }
}
