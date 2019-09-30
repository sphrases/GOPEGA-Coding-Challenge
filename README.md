# GOPEGA-Coding-Challenge

##Task

1.	Implement a simple createCustomer screen with a 
simple call to action button to add customers to a list. 
The person object should include name, sex and 
date of birth. Display all information of the customers.
2.	Add a search function with the lodash package.
3.	Beautify the screen with some custom stylings.
4.	Get Creative and add additional features a user 
	might find useful (optional). 

##Working
- Create Customer
	- Name
	- Gender
	- Date of birth
- Filter customer
	- Filters only by name currently, could be changed 


##Nice to have
- Date object instead of date as a string (complications with React not allowing objects to be passed)

- Minor filtering on the inputs (Gender as dropdown, limited to maybe three options)

- Sorting by either name, gender or DOB (could be done with 

   `_.orderBy(customerDivs, [{sortCriteria}],[{sortDirection}]))`

- Filter customers by not only name, but also gender and DOB

	`if (e. `_CHANGE THIS_`.toUpperCase().includes(input.toUpperCase())) 
                    customerMatch.push(e);`
- Handle the keys differently (Again, date objects can't be used as the key sadly. Maybe unix timestamp, or sequencial number)

