import React from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';


import "./styles.css";

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
        return (<div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChangeName} required={true}/>
                        Sex:
                        <input type="text" value={this.state.sex} onChange={this.handleChangeSex} required={false}/>
                        Date OF Birth:
                        <input type="date" value={this.state.DOB} onChange={this.handleChangeDOB} required={false}/>
                    </label>
                    <input type="submit" value="Submit"/>

                </form>
                <CustomerList customers={this.state.customers}/>
            </div>
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
            this.fillCustomerList(this.props.customers);
            this.setState({
                customers: this.props.customers
            })
        }
    }

    fillCustomerList(customers) {
        let customerDiv = [];
        for (const [i, value] of customers.entries()) {
           customerDiv = customerDiv.concat(<CustomerDiv customer={value}/>)
        }

        this.setState({
            customerDivs: this.state.customerDivs.concat(customerDiv),
        });

        console.log(this.state.customerDivs);
    }

    emptyCustomerList() {
        /* this.setState({
            customerDivs: []
        }); */
        //very bad! but the other stuff doesnt work
        this.state.customerDivs.length = 0;
    }

    handleChangeSearch(event) {
        this.setState({searchField: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state.searchField);
        event.preventDefault();
        this.filterName(this.state.searchField);
    }

    filterName(name) {
        let customerList = this.state.customers;
        console.log(customerList);
        if (name !== '') {
            //The filter Form was submitted

            //filter contains
            //
            let q = _.filter(customerList, {name: name});
            console.log(q);
            if (q !== undefined) {
                this.emptyCustomerList();
                this.fillCustomerList(q);
            }
        } else {
            console.log("empty!");
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
                    </label>
                    <input type="submit" value="Submit"/>

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
