# GOPEGA-Coding-Challenge

## Task

1.	Implement a simple createCustomer screen with a 
simple call to action button to add customers to a list. 
The person object should include name, sex and 
date of birth. Display all information of the customers.
2.	Add a search function with the lodash package.
3.	Beautify the screen with some custom stylings.
4.	Get Creative and add additional features a user 
	might find useful (optional). 
	
Running application on [Heroku](https://gopega-challenge.herokuapp.com/ "Heroku")

## Working
- Create Customer
	- Name
	- Gender
	- Date of birth
- Filter customer
	- Filters only by name currently, could be changed 

## Nice to have
- Date object instead of date as a string (complications with React not allowing objects to be passed, would use `@material-ui/pickers` library)

- Minor filtering on the inputs (Valid Date? Valid Name?)

- Sorting by either name, gender or DOB (could be done with 

   `_.orderBy(customerDivs, [{sortCriteria}],[{sortDirection}]))`

    but I would use an external library for the table anyways, to provide sort functionality as well as more advanced UI elements 
- Filter customers by not only name, but also gender and DOB

	`if (e. `_CHANGE THIS_`.toUpperCase().includes(input.toUpperCase())) 
                    customerMatch.push(e);`
     Or 

