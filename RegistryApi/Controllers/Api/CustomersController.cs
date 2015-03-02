using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace RegistryApi.Controllers.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
		[HttpGet("{id}")]
		public Models.CustomerReadModel Get(int id)
        {
			/*
			Should do a query to return a CustomerReadModel from 
			a persistent storage based on the supplied id.
			*/
            return new Models.CustomerReadModel()
			{
				Id = id,
				DisplayName = "Acme, Inc."
			};
        }
	}
}
