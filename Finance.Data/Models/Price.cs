using System;

namespace Finance.Data.Models
{
    public class Price
    {
        public Guid ProductId { get; set; }
        public double ItemPrice { get; set; }
    }
}
