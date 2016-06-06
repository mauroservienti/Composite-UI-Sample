using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sales.Data.Context;
using SQLite.CodeFirst;

namespace Sales.Data.Migrations
{
    public class DatabaseInitializer : SqliteCreateDatabaseIfNotExists<SalesContext>
    {
        public DatabaseInitializer(DbModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void Seed(SalesContext context)
        {
            context.Products.AddOrUpdate(k => k.Id, SeedData.Products().ToArray());

            context.Orders.AddOrUpdate(k => k.Id, SeedData.Orders().ToArray());
        }
    }
}
