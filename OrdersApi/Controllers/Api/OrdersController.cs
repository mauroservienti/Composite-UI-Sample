using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

namespace OrdersApi.Controllers.Api
{
	[Route("api/[controller]")]
	[Route("api/[controller]/[action]")]
	public class OrdersController : Controller
	{
		readonly Shared.DataManager dataManager;

		public OrdersController(Shared.DataManager dataManager)
		{
			this.dataManager = dataManager;
		}

		[HttpGet("{id}")]
		public IEnumerable<dynamic> ByCustomer(int id, int p = 0, int s = 10)
		{
			return this.dataManager.Select("Order")
				.Where(d => d.customerId == id)
				.Skip(p * s)
				.Take(s);

			///*
			//Should do a query to return a OrderReadModel list from 
			//a persistent storage based on the supplied customer id.
			//*/
			//return new[]
			//{
			//	new OrderReadModel()
			//	{
			//		Id = 1,
			//		CustomerId = id,
			//		Status = OrderStatus.Shipped,
			//		Price = 134m
			//	},
			//	new OrderReadModel()
			//	{
			//		Id = 2,
			//		CustomerId = id,
			//		Status = OrderStatus.CollectingItems,
			//		Price = 100m
			//	}
			//};
		}
	}
}
