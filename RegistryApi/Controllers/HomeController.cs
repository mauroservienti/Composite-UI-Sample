using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RegistryApi.Controllers.Api
{
    public class HomeController : Controller
    {
        public HomeController()
        {

        }

        // GET: /<controller>/
        [HttpGet("/")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
