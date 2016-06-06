using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Customers.Data.Models;

namespace Customers.Data.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer> Customer(Guid id);
        Task<List<Customer>> Customers();
    }
}