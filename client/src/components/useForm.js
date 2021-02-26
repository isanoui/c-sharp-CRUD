import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }

        setValues({
            ...values,
            ...fieldValue
        })

        validate(fieldValue)
    }

    const resetForm = () => {
        document.getElementById('addBtn').childNodes[0].innerText = "ADD ITEM"

        setValues({
            ...initialFieldValues
        })

        setErrors({})
        setCurrentId(-1)
    }

    const resetCard = () => {
        document.getElementById('card').innerText = ""

        setValues({
            ...initialFieldValues
        })

        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        resetCard
    }
}

export default useForm