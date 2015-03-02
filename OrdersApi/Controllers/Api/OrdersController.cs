using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using OrdersApi.Models;

namespace OrdersApi.Controllers.Api
{
    [Route("api/[controller]")]
	[Route("api/[controller]/[action]")]
	public class OrdersController : Controller
    {
		[HttpGet("{id}")]
		public IEnumerable<OrderReadModel> ByCustomer(int id)
        {
			/*
			Should do a query to return a OrderReadModel list from 
			a persistent storage based on the supplied customer id.
			*/
			return new []
			{
				new OrderReadModel()
				{
					Id = 1,
					CustomerId = id,
					Status = OrderStatus.Shipped,
					Price = 134m
				},
				new OrderReadModel()
				{
					Id = 2,
					CustomerId = id,
					Status = OrderStatus.CollectiongItems,
					Price = 100m
				}
			};
        }
    }
}
