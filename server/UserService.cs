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

        public User Add(string name, string surname, decimal balance)
        {
            var user = new User
            {
                Name = name,
                Surname = surname,
                Balance = balance
            };
            _db.Users.Add(user);
            _db.SaveChanges();
            return user;
        }
        public User Update(int id, string name, string surname, decimal balance)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with id {id} not found");
            }
            user.Name = name;
            user.Surname = surname;
            user.Balance = balance;
            _db.SaveChanges();
            return user;
        }
        public void Delete(int id)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with id {id} not found");
            }
            _db.Users.Remove(user);
            _db.SaveChanges();
        }
        public User Find(int id)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with id {id} not found");
            }
            return user;
        }
        public IEnumerable<User> GetAll()
        {
            return _db.Users.ToList();
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