using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace User.Function
{
    public class Registration
    {
        private readonly ILogger _logger;
        private readonly RegistrationService _registrationService;

        public Registration(ILoggerFactory loggerFactory, RegistrationService registrationService)
        {
            _logger = loggerFactory.CreateLogger<Registration>();
            _registrationService = registrationService;
        }

        [Function("Registration")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", "delete")] HttpRequestData req)
        {
            var response = req.CreateResponse(HttpStatusCode.OK);

            switch(req.Method.ToLower())
            {
                case "get":
                    StreamReader reader0 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body0 = reader0.ReadToEnd();
                    var get = JsonSerializer.Deserialize<RegistrationService.Registration>(body0);
                    if (get.Id != 0)
                    {
                        var registration_g = _registrationService.Find(get.Id);
                        response.WriteAsJsonAsync(registration_g);
                    } else {
                        var registrations = _registrationService.GetAll();
                        response.WriteAsJsonAsync(registrations);
                    }
                    break;
                case "post":
                    StreamReader reader = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body = reader.ReadToEnd();
                    var registration = JsonSerializer.Deserialize<RegistrationService.Registration>(body);
                    var newRegistration = _registrationService.Add(registration.UserId, registration.DateEntry, registration.DateExit);
                    response.WriteAsJsonAsync(newRegistration);
                    break;
                case "put":
                    StreamReader reader2 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body2 = reader2.ReadToEnd();
                    var registration2 = JsonSerializer.Deserialize<RegistrationService.Registration>(body2);
                    var updatedRegistration = _registrationService.Update(registration2.Id, registration2.UserId, registration2.DateEntry, registration2.DateExit);
                    response.WriteAsJsonAsync(updatedRegistration);
                    break;
                case "delete":
                    StreamReader reader3 = new StreamReader(req.Body, System.Text.Encoding.UTF8);
                    var body3 = reader3.ReadToEnd();
                    var registration3 = JsonSerializer.Deserialize<RegistrationService.Registration>(body3);
                    _registrationService.Delete(registration3.Id);
                    break;
                default:
                    response.WriteAsJsonAsync("Error, method not found [get, post, put, delete]");
                    break;
            }

            return response;
        }
    }
}
