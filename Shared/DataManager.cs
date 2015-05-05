using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace Shared
{
	// This project can output the Class library as a NuGet Package.
	// To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
	public class DataManager
	{
		readonly String applicationBasePath;
		readonly String dataDirectory;

		public DataManager(String applicationBasePath)
		{
			this.applicationBasePath = applicationBasePath;
			this.dataDirectory = Path.Combine(this.applicationBasePath, "Data");
		}

		String ComposeFullFileName(String type, int id)
		{
			var fileName = type + "." + id.ToString().PadLeft(4, '0') + ".json";
			var path = Path.Combine(this.dataDirectory, fileName);

			return path;
		}

		dynamic GetDocument( String fullFileName)
		{
			using (var fs = File.OpenText(fullFileName))
			{
				var content = fs.ReadToEnd();
				var obj = JsonConvert.DeserializeObject(content);

				return obj;
			}
		}

		public dynamic GetById(String type, int id)
		{
			return this.GetDocument(this.ComposeFullFileName(type, id));
		}

		public IEnumerable<dynamic> Select(String type, int pageIndex, int pageSize)
		{
			return Directory.EnumerateFiles(this.dataDirectory, type + ".*.json")
				.Skip(pageIndex * pageSize)
				.Take(pageSize)
				.Select(file => this.GetDocument(file) );
		}
	}
}
