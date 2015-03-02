using System;

namespace OrdersApi.Models
{
	public class OrderReadModel
	{
		public int CustomerId { get; internal set; }
		public int Id { get; internal set; }
		public decimal Price { get; internal set; }
		public OrderStatus Status { get; internal set; }
	}

	public enum OrderStatus {
		Shipped,
		CollectiongItems
	}
}