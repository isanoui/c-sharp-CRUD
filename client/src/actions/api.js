import axios from "axios"

const baseUrl = "http://localhost:54204/"



export default {
    item(url = baseUrl) {
        return {
            fetchAll: () => axios.get(url + "getAllRecords"),
            fetchMaxPricesList: () => axios.get(url + "getMaxPricesList"),
            fetchMaxPriceByItem: itemName => axios.get(url + "getMaxPriceByItemName/" + itemName),
            create: (itemName, cost) => axios.post(url + "addItem/" + itemName + "/" + cost),
            update: (itemName, cost, id) => axios.put(url + "editItem/" + itemName + "/" + cost + "/" + id),
            delete: id => axios.delete(url + "deleteItem/" + id)
        }
    }
}