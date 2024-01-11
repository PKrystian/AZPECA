using User.Function.Database;

namespace User.Function
{
    public class RegistrationService
    {
        private List<Registration> registrations { get; } = new List<Registration>();
        private readonly UserDb _db;
        public RegistrationService(UserDb db)
        {
            _db = db;
        }
        public Registration Add(int userId, DateTime dateEntry, DateTime dateExit)
        {
            var registration = new Registration
            {
                UserId = userId,
                DateEntry = dateEntry,
                DateExit = dateExit
            };
            _db.Registrations.Add(registration);
            _db.SaveChanges();
            return registration;
        }
        public Registration Update(int id, int userId, DateTime dateEntry, DateTime dateExit)
        {
            var registration = _db.Registrations.FirstOrDefault(x => x.Id == id);
            if (registration == null)
            {
                throw new Exception($"Registration with id {id} not found");
            }
            registration.UserId = userId;
            registration.DateEntry = dateEntry;
            registration.DateExit = dateExit;
            _db.SaveChanges();
            return registration;
        }
        public void Delete(int id)
        {
            var registration = _db.Registrations.FirstOrDefault(x => x.Id == id);
            if (registration == null)
            {
                throw new Exception($"Registration with id {id} not found");
            }
            _db.Registrations.Remove(registration);
            _db.SaveChanges();
        }
        public Registration Find(int id)
        {
            var registration = _db.Registrations.FirstOrDefault(x => x.Id == id);
            if (registration == null)
            {
                throw new Exception($"Registration with id {id} not found");
            }
            return registration;
        }
        public IEnumerable<Registration> GetAll()
        {
            return _db.Registrations.ToList();
        }
        public class Registration
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public DateTime DateEntry { get; set; }
            public DateTime DateExit { get; set; }
            public UserService.User User { get; set; }
        }
    }
}