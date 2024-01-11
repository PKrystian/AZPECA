using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace User.Function
{
    public class User
    {
        private readonly ILogger _logger;
        private readonly UserService _userService;

        public User(ILoggerFactory loggerFactory, UserService userService)
        {
            _logger = loggerFactory.CreateLogger<User>();
            _userService = userService;
        }

        [Function("User")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", "delete")] HttpRequestData req)
        {
            var response = req.CreateResponse(HttpStatusCode.OK);

            switch(req.Method.ToLower())
            {
                case "get":
                    StreamReader reader0 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body0 = reader0.ReadToEnd();
                    var get = JsonSerializer.Deserialize<UserService.User>(body0);
                    if (get.Id != 0)
                    {
                        var user_g = _userService.Find(get.Id);
                        response.WriteAsJsonAsync(user_g);
                    } else {
                        var users = _userService.GetAll();
                        response.WriteAsJsonAsync(users);
                    }
                    break;
                case "post":
                    StreamReader reader = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body = reader.ReadToEnd();
                    var user = JsonSerializer.Deserialize<UserService.User>(body);
                    var newUser = _userService.Add(user.Name, user.Surname, user.Balance);
                    response.WriteAsJsonAsync(newUser);
                    break;
                case "put":
                    StreamReader reader2 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body2 = reader2.ReadToEnd();
                    var user2 = JsonSerializer.Deserialize<UserService.User>(body2);
                    var updatedUser = _userService.Update(user2.Id, user2.Name, user2.Surname, user2.Balance);
                    response.WriteAsJsonAsync(updatedUser);
                    break;
                case "delete":
                    StreamReader reader3 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body3 = reader3.ReadToEnd();
                    var user3 = JsonSerializer.Deserialize<UserService.User>(body3);
                    _userService.Delete(user3.Id);
                    break;
                default:
                    response.WriteAsJsonAsync("Error, method not found [get, post, put, delete]");
                    break;
            }

            return response;
        }
    }
}
