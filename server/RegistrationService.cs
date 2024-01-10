using Google.Protobuf.WellKnownTypes;
using User.Function.Database;

namespace User.Function
{
    public class RegistrationService
    {
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