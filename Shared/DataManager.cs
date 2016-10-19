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
		readonly string applicationBasePath;
		readonly string dataDirectory;
		readonly bool makeItSlow;

		public DataManager(string applicationBasePath, bool makeItSlow = true)
		{
			this.applicationBasePath = applicationBasePath;
			this.makeItSlow = makeItSlow;
			this.dataDirectory = Path.Combine(this.applicationBasePath, "Data");
		}

		void SlowDown()
		{
			if (this.makeItSlow)
			{
				System.Threading.Thread.Sleep(500);
			}
		}

        string ComposeFullFileName(string type, int id)
		{
			var fileName = type + "." + id.ToString().PadLeft(4, '0') + ".json";
			var path = Path.Combine(this.dataDirectory, fileName);

			return path;
		}

		dynamic GetDocument(string fullFileName)
		{
			using (var fs = File.OpenText(fullFileName))
			{
				var content = fs.ReadToEnd();
				var obj = JsonConvert.DeserializeObject(content);

				return obj;
			}
		}

		public dynamic GetById(string type, int id)
		{
			this.SlowDown();

			return this.GetDocument(this.ComposeFullFileName(type, id));
		}

		public IEnumerable<dynamic> Select(string type)
		{
			this.SlowDown();

			return Directory.EnumerateFiles(this.dataDirectory, type + ".*.json")
				.Select(file => this.GetDocument(file));
		}
	}
}
