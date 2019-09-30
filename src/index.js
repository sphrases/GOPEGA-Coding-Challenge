import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Button from "@material-ui/core/Button";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";


function App() {
    return (
        <div className="App">
            <h1>Hello, insert your Name</h1>
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            required={true}
                        />

                        <TextField
                            label="sex"
                            value={this.state.sex}
                            onChange={this.handleChangeSex}
                            required={false}
                        />

                        <TextField
                            label="date"
                            type="date"
                            value={this.state.DOB}
                            onChange={this.handleChangeDOB}
                            required={false}
                        />
                    </label>
                    <Button variant="contained" color="primary" type="submit" value="Submit">Submit</Button>

                </form>
                <CustomerList customers={this.state.customers}/>
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
            customerDiv = customerDiv.concat(<CustomerDiv customer={value}/>)
        }

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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search Parameter:
                        <input type='text' value={this.state.searchField} onChange={this.handleChangeSearch}
                               required={false}/>

                        <TextField
                            id="outlined-full-width"
                            label="Search"
                            style={{margin: 8}}
                            placeholder=""
                            helperText=""
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /><Button type="submit" value="Submit">search</Button>


                    </label>


                </form>
                {this.state.customerDivs}
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
