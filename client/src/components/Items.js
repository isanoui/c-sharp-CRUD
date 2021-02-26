import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import * as actions from "../actions/item";
import { Grid, Paper, TableRow, TableCell, TableContainer, withStyles, FormControl, InputLabel, Select, Button, ButtonGroup, MenuItem, Divider } from "@material-ui/core";
import ItemForm from "./ItemForm";
import ItemMaxPriceForm from "./ItemMaxPriceForm";
import MaxPriceList from "./MaxPriceList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    dropdown: {
        margin: theme.spacing(1),
        minWidth: 500
    },
    menuitem: {
        maxWidth: 500
    },
    TableCell: {
        width: 165
    }
})

const Items = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(-1)

    useEffect(() => {
        props.fetchAllItems()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm("Are you sure you want to delete item?")) {
            props.deleteItem(id, () => { props.fetchAllItems(); addToast("Deleted Successfully!", { appearance: 'info' }) })
        }
    }

    // code I copied from Material-UI documentation to fix dropdown input alignment issue
    const inputLabel = React.useRef(null)
    const [labelWidth, setLabelWidth] = React.useState(0)
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])


    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <ItemForm {...({ currentId, setCurrentId })} />
                    <br /><br /><Divider></Divider><br /><br />
                    <ItemMaxPriceForm {...({ currentId, setCurrentId })} />
                    <br /><br /><Divider></Divider><br /><br /><br /><br /><br />
                    <MaxPriceList />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <FormControl variant="outlined" className={classes.dropdown}>
                            <InputLabel ref={inputLabel}>Total list of items</InputLabel>
                            <Select
                                name="itemList"
                                value={props.itemList}
                                labelWidth={labelWidth}
                            >
                                {
                                    props.itemList.map((record, index) => {
                                        return (
                                            <MenuItem className={classes.menuitem}>
                                                <TableRow key={index} hover>
                                                    <TableCell className={classes.TableCell}>{record.itemName}</TableCell>
                                                    <TableCell className={classes.TableCell}>{record.cost}</TableCell>
                                                    <TableCell className={classes.TableCell}>
                                                        <ButtonGroup variant="text">
                                                            <Button><EditIcon
                                                                color="primary"
                                                                onClick={() => { setCurrentId(record.id) }}></EditIcon></Button>

                                                            <Button><DeleteIcon
                                                                color="secondary"
                                                                onClick={() => onDelete(record.id)}></DeleteIcon></Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        itemList: state.item.list
    }
}

const mapActionToProps = {
    fetchAllItems: actions.fetchAll,
    deleteItem: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Items))