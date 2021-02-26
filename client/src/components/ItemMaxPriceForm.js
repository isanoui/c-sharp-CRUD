import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, withStyles, Card, CardContent, Typography } from "@material-ui/core";
import * as actions from "../actions/item";
import { connect } from "react-redux";
import useForm from "./useForm";

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
    itemName: ''
}

const ItemMaxPriceForm = ({ classes, ...props }) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("itemName" in fieldValues) {
            temp.itemName = fieldValues.itemName != "" ? "" : "This field is required."
        }

        // handle case where user submits before entering anything, check if empty object
        if (Object.keys(temp).length === 0 && temp.constructor === Object) {
            temp.itemName = "This field is required."
        }

        setErrors({
            ...temp
        })

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
        resetForm,
        resetCard
    } = useForm(initialFieldValues, validate, props.setCurrentId)



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            props.fetchMaxPriceByItem(values, () => props.fetchAll())
        }
    }

    useEffect(() => {
        if (props.maxCost > -1) {
            document.getElementById('card').innerText = props.maxCost
        }

        if (props.maxCost == -1) {
            document.getElementById('card').innerText = "Item doesn't exist"
        }

        setErrors({})
    }, [props.maxCost])

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
                    <Card>
                        <CardContent>
                            <Typography id="card" variant="h5" component="h2"></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                    >Check Max Price</Button>

                    <Button
                        variant="contained"
                        onClick={resetCard}
                        className={classes.smMargin}
                    >Clear</Button>
                </div>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        maxCost: state.item.maxCost
    }
}

const mapActionToProps = {
    fetchMaxPriceByItem: actions.fetchMaxPriceByItem,
    fetchAll: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ItemMaxPriceForm))