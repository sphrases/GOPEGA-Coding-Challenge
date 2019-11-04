import React from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {addCustomer} from "../actions";
import CList from "./CustomerList";


function mapDispatchToProps(dispatch) {
    return {
        addCustomer: customer => dispatch(addCustomer(customer))
    };
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sex: '',
            DOB: '',
            customer: {}
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeSex(event) {
        this.setState({sex: event.target.value});
    }

    handleChangeDOB(event) {
        this.setState({DOB: event.target.value});
    }

    handleSubmit(event) {
        //add to customer array from state
        //reset current state, to clear customer data.
        let newCustomer = {
            name: this.state.name,
            sex: this.state.sex,
            DOB: this.state.DOB
        };
        this.setState({
            customer: newCustomer,
            name: '',
            sex: '',
            DOB: ''
        });
        event.preventDefault();

        //This line should add stuff to the Redux Store
        this.props.addCustomer({
            name: this.state.name,
            sex: this.state.sex,
            DOB: this.state.DOB
        });
    }

    render() {
        return (<Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} color="green">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <TextField
                                    label="name"
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                    required={true}
                                    margin="normal"
                                    fullWidth
                                />
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="age-simple">
                                        gender</InputLabel>
                                    <Select
                                        value={this.state.sex}
                                        onChange={this.handleChangeSex}

                                        inputProps={{
                                            name: 'gender',
                                            id: 'gender-simple'
                                        }}>
                                        <MenuItem value={"female"} textAlign='left'>female</MenuItem>
                                        <MenuItem value={"male"}>male</MenuItem>
                                        <MenuItem value={"other"}>other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="birthday"
                                    type="date"
                                    value={this.state.DOB}
                                    onChange={this.handleChangeDOB}
                                    required={true}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <br/>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    value="Submit"
                                    fullWidth>
                                    create customer
                                </Button>
                            </label>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <CList customers={this.state.customer}/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const Form = connect(
    null,
    mapDispatchToProps
)(NameForm);

export default Form;