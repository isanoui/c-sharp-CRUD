using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace MediKeeperItems.Controllers
{
    [ApiController]
    public class ItemsController : Controller
    {

        [HttpGet]
        [Route("/getAllRecords")]
        public string getAllRecords()
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");

            return dataStore;
        }

        [HttpGet]
        [Route("/getMaxPriceByItemName/{itemName}")]
        // Return max price for item name inputted by user
        public int GetMaxPriceByItemName(string itemName)
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");
            string json = @dataStore;
            JArray jsonArr = JArray.Parse(json);

            int price = -1;

            foreach (JObject obj in jsonArr.Children<JObject>())
            {
                if (string.Equals((string) obj.GetValue("itemName"), itemName))
                {
                    if ((int)obj.GetValue("cost") > price)
                    {
                        price = (int)obj.GetValue("cost");
                    }
                }
            }
            return price;
        }

        [HttpPost]
        [Route("/addItem/{itemName}/{cost}")]
        public void AddItem(string itemName, int cost)
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");
            string json = @dataStore;
            JArray jsonArr = JArray.Parse(json);

            JObject obj = new JObject
            {
                { "id", jsonArr.Count }, 
                { "itemName", itemName },
                { "cost", cost }
            };

            jsonArr.Add(obj);
            string jsonArrStringify = jsonArr.ToString();
            System.IO.File.WriteAllText(@"~\..\Models\Items.txt", jsonArrStringify);
            return;
        }

        [HttpPut]
        [Route("/editItem/{itemName}/{cost}/{id}")]
        public void EditItem(int id, string itemName, int cost)
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");
            string json = @dataStore;
            JArray jsonArr = JArray.Parse(json);

            foreach (JObject obj in jsonArr.Children<JObject>())
            {
                if ((int) obj.GetValue("id") == id)
                {
                    obj["itemName"] = itemName;
                    obj["cost"] = cost;

                    string jsonArrStringify = jsonArr.ToString();
                    System.IO.File.WriteAllText(@"~\..\Models\Items.txt", jsonArrStringify);
                    return;
                }
            }
            return;
        }

        [HttpDelete]
        [Route("/deleteItem/{id}")]
        public void DeleteItem(int id)
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");
            string json = @dataStore;
            JArray jsonArr = JArray.Parse(json);
            List<JObject> list = new List<JObject>();
            int index = 0;

            foreach (JObject obj in jsonArr.Children<JObject>())
            {
                if ((int)obj.GetValue("id") != id)
                {
                    obj["id"] = index++;
                    list.Add(obj);
                }
            }

            string newList = string.Join(",", list);
            System.IO.File.WriteAllText(@"~\..\Models\Items.txt", "[" + newList + "]");
            return; 
        }

        [HttpGet]
        [Route("/getMaxPricesList")]
        public Dictionary<string, int> getMaxPricesList()
        {
            string dataStore = System.IO.File.ReadAllText(@"~\..\Models\Items.txt");
            string json = @dataStore;
            JArray jsonArr = JArray.Parse(json);

            Dictionary<string, int> maxList = new Dictionary<string, int>();

            foreach (JObject obj in jsonArr.Children<JObject>())
            {
                if (maxList.ContainsKey((string) obj["itemName"]))
                {
                    if ((int) obj["cost"] > maxList[(string) obj["itemName"]])
                    {
                        maxList[(string) obj["itemName"]] = (int) obj["cost"];
                    }
                }
                else
                {
                    maxList.Add((string) obj["itemName"], (int) obj["cost"]);
                }
            }
            return maxList;
        }
    }
}