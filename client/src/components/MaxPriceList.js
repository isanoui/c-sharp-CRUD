import React, { useState, useEffect } from "react";
import { Grid, Button, withStyles, TableRow, TableCell } from "@material-ui/core";
import * as actions from "../actions/item";
import { connect } from "react-redux";

const styles = theme => ({
    smMargin: {
        margin: theme.spacing(1),
    }
})

const MaxPriceList = ({ classes, ...props }) => {

    const handleSubmit = e => {
        props.fetchMaxPricesList(() => props.fetchAll())
        e.preventDefault()

        var table = document.getElementById("insert");
        table.innerHTML = ""

        var header = table.insertRow(0)
        var itemName = header.insertCell(0)
        var cost = header.insertCell(1)
        itemName.innerHTML = '<b>ITEM NAME</b>'
        cost.innerHTML = '<b>COST</b>'

        for (let i = 1; i < Object.keys(props.maxList[0]).length+1; i++) {
            var row = table.insertRow(i)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            cell1.innerHTML = Object.keys(props.maxList[0])[i-1]
            cell2.innerHTML = props.maxList[0][Object.keys(props.maxList[0])[i-1]]
        }
    }

    useEffect(() => {

        props.fetchMaxPricesList(() => props.fetchAll())

    }, [])

    return (
        <Grid container>
            <div>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    className={classes.smMargin}
                    onClick={handleSubmit}
                >List Max Prices</Button>
            </div>
            <table id="insert"></table> 
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        maxList: state.item.maxList
    }
}

const mapActionToProps = {
    fetchMaxPricesList: actions.fetchMaxPricesList,
    fetchAll: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(MaxPriceList))