using User.Function.Database;

namespace User.Function
{
    public class UserService
    {
        private List<User> users { get; } = new List<User>();
        private readonly UserDb _db;
        public UserService(UserDb db)
        {
            _db = db;
        }

        public class User
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public decimal Balance { get; set; }
            public ICollection<RegistrationService.Registration> Registration { get; set; }
        }
    }
}