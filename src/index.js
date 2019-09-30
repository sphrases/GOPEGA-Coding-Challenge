import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


function App() {
    return (
        <div className="App">
            <h1>Hello, insert your Name</h1>
            <NameForm/>
        </div>
    );
}

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class NameForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sex: '',
            DOB: '',
            customers: []
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
        //alert('A name was submitted: ' + this.state.name + '  ' + this.state.sex + '  ' + this.state.DOB);
        //add to customer array from state
        //reset current state, to clear customer data.
        //pass customer data to foreach and customer div

        let newCustomer = {
            name: this.state.name,
            sex: this.state.sex,
            DOB: this.state.DOB
        };
        this.setState({
            customers: newCustomer,
            name: '',
            sex: '',
            DOB: ''
        });

        event.preventDefault();
    }

    render() {
        return (<Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={2} color="green">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <TextField
                                    label="name"
                                    value={this.state.name}
                                    onChange={this.handleChangeName}
                                    required={true}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="sex"
                                    value={this.state.sex}
                                    onChange={this.handleChangeSex}
                                    required={true}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="date"
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
                                    fullWidth
                                >
                                    create customer
                                </Button>

                            </label>

                        </form>
                    </Grid>
                    <Grid item xs={10}>
                        <CustomerList customers={this.state.customers}/>


                    </Grid>
                </Grid>
            </Container>
        ) //ends return
    }
}


class CustomerList extends React.Component {
    //use this to filter list
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            customerDivs: [],
            customers: []
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.customers !== prevProps.customers) {
            this.setState({
                    customers: this.state.customers.concat(this.props.customers)
                },
                () => this.fillCustomerList(this.state.customers)
            )
        }
    }

    fillCustomerList(customers) {
        let customerDiv = [];
        for (const [i, value] of customers.entries()) {
            let cstmer = (
            <TableRow key={value.name}>
                <TableCell component="th" scope="row">
                    {value.name}
                </TableCell>
                <TableCell align="right">{value.sex}</TableCell>
                <TableCell align="right">{value.DOB}</TableCell>
            </TableRow>
            );
            customerDiv = customerDiv.concat(cstmer);
        }
        console.log(customerDiv);

        this.setState({
            customerDivs: customerDiv
        });
    }

    emptyCustomerList() {
        /* this.setState({
            customerDivs: []
        }); */
        //very bad! but the other stuff doesnt work
        this.state.customerDivs.length = 0;
    }

    handleChangeSearch(event) {
        this.setState({searchField: event.target.value},
            () => this.filterName(this.state.searchField));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.filterName(this.state.searchField);
    }

    filterName(name) {
        let customerList = this.state.customers;
        if (name !== '') {
            let q = _.filter(customerList, {name: name});
            if (q !== undefined) {
                this.emptyCustomerList();
                this.fillCustomerList(q);
            }
        } else {
            this.emptyCustomerList();
            this.fillCustomerList(customerList);
        }
    }


    render() {
        //return the List as <list elem="filteredList"/>
        //<Button type="submit" value="Submit">search</Button>
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>

                        <TextField
                            id="outlined-full-width"
                            label="Search"
                            value={this.state.searchField}
                            onChange={this.handleChangeSearch}
                            required={false}
                            style={{margin: 8}}
                            placeholder=""
                            helperText=""
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Sex</TableCell>
                                    <TableCell align="right">Birthday</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.customerDivs}
                            </TableBody>
                        </Table>
                    </label>
                </form>
            </div>);
    }
}


class CustomerDiv extends React.Component {
    //Get Customers as filtered list, and display as Table
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>name: {this.props.customer.name}</div>)

    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
