import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, withStyles } from "@material-ui/core";
import * as actions from "../actions/item";
import { connect } from "react-redux";
import useForm from "./useForm";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    smMargin: {
        margin: theme.spacing(1),
    }
})

const initialFieldValues = {
    itemName: '',
    cost: ''
}

const ItemForm = ({ classes, ...props }) => {

    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("itemName" in fieldValues) {
            temp.itemName = fieldValues.itemName != "" ? "" : "This field is required."
            // 13 character limit because otherwise tablecell extends past width, so hacky solution (figure this out later)
            if (fieldValues.itemName.length > 13) {
                temp.itemName = "Maximum 13 charcter limit"
            }
        }
        if ("cost" in fieldValues) {
            temp.cost = (/^\d{0,6}$/).test(fieldValues.cost) ? "" : "Cost must be between 0 and 999,999."
        }

        // handle case where user submits before entering anything, check if empty object
        if (Object.keys(temp).length === 0 && temp.constructor === Object) {
            temp.itemName = "This field is required."
            temp.cost = "Cost must be 0 or a positive integer."
        }

        setErrors({
            ...temp
        })

        // if temp.itemName is empty string, then no errors
        if (fieldValues == values) {
            return Object.values(temp).every(x => x == "")
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (props.currentId == -1) {
                props.createItem(values, () => { props.fetchAll(); addToast("Item created successfully!", { appearance: 'success' }) })
            }
            else {
                props.updateItem(values, () => { props.fetchAll(); addToast("Item updated successfully!", { appearance: 'success' }) })
                document.getElementById('addBtn').childNodes[0].innerText = "ADD ITEM"
            }

            resetForm()
        }
    }

    useEffect(() => {
        if (props.currentId != -1) {
            document.getElementById('addBtn').childNodes[0].innerText = "UPDATE ITEM"
        }
        setValues({
            ...props.itemList.find(x => x.id == props.currentId)
        })

        setErrors({})
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="itemName"
                        variant="outlined"
                        label="Item Name"
                        value={values.itemName}
                        onChange={handleInputChange}
                        required
                        {...(errors.itemName && { error: true, helperText: errors.itemName })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="cost"
                        type="number"
                        inputProps={{ min: "0", step: "1" }}
                        variant="outlined"
                        label="Cost"
                        value={values.cost}
                        onChange={handleInputChange}
                        required
                        {...(errors.cost && { error: true, helperText: errors.cost })}
                    />
                </Grid>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        id="addBtn"
                    >Add Item</Button>

                    <Button
                        variant="contained"
                        onClick={resetForm}
                        className={classes.smMargin}
                    >Clear</Button>
                </div>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        itemList: state.item.list
    }
}

const mapActionToProps = {
    createItem: actions.create,
    updateItem: actions.update,
    fetchAll: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ItemForm))