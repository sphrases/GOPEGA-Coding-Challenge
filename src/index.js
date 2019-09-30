import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const sampleCustomers = [
    {
        key: new Date('1996-07-09T03:24:00'),
        name: "Mike",
        sex: "male",
        DOB: "1996-07-09"
    },
    {
        key: new Date('1993-08-01T02:30:12'),
        name: "Tom",
        sex: "male",
        DOB: "1993-08-01"
    },
    {
        key: new Date('1987-03-05T02:30:12'),
        name: "Jenny",
        sex: "female",
        DOB: "1987-03-05"
    },
    {
        key: new Date('1981-01-12T02:30:12'),
        name: "Jake",
        sex: "male",
        DOB: "1981-01-12"
    }
];

function App() {
    return (
        <div className="App">
            <h1>Hello, create a customer</h1>
            <NameForm/>
        </div>
    );
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
        //alert('A name was submitted: ' + this.state.name + '  ' + this.state.sex + '  ' + this.state.DOB);
        //add to customer array from state
        //reset current state, to clear customer data.
        //pass customer data to foreach and customer div
        let date = new Date();
        let newCustomer = {
            key: date.now,
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
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="gender"
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
                                    fullWidth
                                >
                                    create customer
                                </Button>
                            </label>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <CustomerList customers={this.state.customer}/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}


class CustomerList extends React.Component {
    inputLabel;

    //use this to filter list
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            customerDivs: [],
            customers: [],
            searchCriteria: 'sex'
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
                customers: this.state.customers.concat(sampleCustomers)
            },
            () => this.fillCustomerList(this.state.customers)
        )
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
                    <TableCell align="right">{value.DOB}</TableCell>
                </TableRow>
            );
            customerDiv = customerDiv.concat(cstmer);
        }
        this.setState({
            customerDivs: customerDiv
        });
    }

    handleChangeSearch(event) {
        this.setState({searchField: event.target.value},
            () => this.filterName(this.state.searchField));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.filterName(this.state.searchField);
    }

    filterName(input) {
        let customerList = this.state.customers;
        if (input !== '') {  //meh
            let customerMatch = [];
            _.some(customerList, function (e) {
                if (e.name.toUpperCase().includes(input.toUpperCase())) {
                    customerMatch.push(e);
                }
            });
            let q = customerMatch; //_.filter(customerList, {name: name});
            if (q !== undefined) {

                this.fillCustomerList(q);
            }
        } else {

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
                            fullWidth={true}
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </label>
                </form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Birthday</TableCell>
                            <TableCell align="right">Key</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customerDivs}
                    </TableBody>
                </Table>
            </div>);
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
