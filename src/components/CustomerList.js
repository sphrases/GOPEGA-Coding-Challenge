import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return { customers: state.customers };
};


const sampleCustomers = [
    {
        key: 1,
        name: "Mike",
        sex: "male",
        DOB: "1996-07-09"
    },
    {
        key: 2,
        name: "Tom",
        sex: "male",
        DOB: "1993-08-01"
    },
    {
        key: 3,
        name: "Jenny",
        sex: "female",
        DOB: "1987-03-05"
    },
    {
        key: 4,
        name: "Jake",
        sex: "male",
        DOB: "1981-01-12"
    }
];


class CustomerList extends React.Component {
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
            let lastCustomerID = this.state.customers[this.state.customers.length - 1].key;
            let newCustomer = this.props.customers;
            newCustomer.key = lastCustomerID + 1;
            this.setState({
                    customers: this.state.customers.concat(newCustomer)
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
                    <TableCell align="right">{value.key}</TableCell>
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


const ConnectedList = ({ customers }) => (
    <ul>
        {customers.map(el => (
            <li key={el.id}>{el.name}</li>
        ))}
    </ul>
);


const CList = connect(mapStateToProps)(ConnectedList);
export default CList;