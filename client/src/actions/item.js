import api from "./api"

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_MAX_PRICES_LIST: 'FETCH_MAX_PRICES_LIST',
    FETCH_MAX_BY_ITEM: 'FETCH_MAX_BY_ITEM'
}

export const fetchAll = () => dispatch => {
    api.item().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            })
        })
}

export const fetchMaxPricesList = (onSuccess) => dispatch => {
    api.item().fetchMaxPricesList()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_MAX_PRICES_LIST,
                payload: res.data
            })
            onSuccess()
        })
}

export const fetchMaxPriceByItem = (data, onSuccess) => dispatch => {
    api.item().fetchMaxPriceByItem(data.itemName)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_MAX_BY_ITEM,
                payload: res.data
            })
            onSuccess()
        })
}

export const create = (data, onSuccess) => dispatch => {
    api.item().create(data.itemName, data.cost)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (data, onSuccess) => dispatch => {
    api.item().update(data.itemName, data.cost, data.id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

// capital "D" because "delete" is a keyword 
export const Delete = (id, onSuccess) => dispatch => {
    api.item().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: res.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}