using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RegistryApi.Controllers.Controllers
{
    [Route("api/[controller]")]
	public class CustomersController : ControllerBase
	{
		readonly Shared.DataManager dataManager;

		public CustomersController(Shared.DataManager dataManager)
		{
			this.dataManager = dataManager;
		}

		[HttpGet("{id}")]
		public dynamic Get(int id)
		{
			return this.dataManager.GetById("Customer", id);
		}

		[HttpGet("")]
		public IEnumerable<dynamic> Get(int p = 0, int s = 10)
		{
			return this.dataManager.Select("Customer")
				.Skip(p * s)
				.Take(s);
		}
	}
}
