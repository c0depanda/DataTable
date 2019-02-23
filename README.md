# Vue DataTable
A little Vue.js Data app that displays list of payments made on an app using firebase as storage, Vuex and a DataTable component to present data.
The App also allows you to modify any field in the table. 

## How to setup Project
First clone app and open project folder and run the below,
```
npm install
```
then proceed to serving the app by running,
```
node server.js
```

### For Compiles and hot-reloads for development
Run the below inside the app folder directory
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## How to use the datatable component
The DataTable allows you to pass data using props, specify the header names, select the items from the data that needs to be displayed on the table, specify if you want an action field i.e things like edit, specify what items in the data you want to sort the list by, what direction you want the fields to be sorted be it ascending/descending order and lastly which fields you need edited. 

```
<DataTable 
    :tableData="payments" 
    :tableHeader="['name', 'amount', 'description', 'date']" 
    :tableFields="['name', 'amount', 'description', 'date']" 
    :action="true" 
    :actionFields="['description']" 
    sortBy="date" 
/>
```

### List of props supported

`tableData`
This accepts an array of objects

`tableHeader`
This accepts an array of titles. This is what gets populated in the header of the table.

`tableFields`
Accepts an array of the object key of the data that would be displayed in table fields
```
i.e item.name, item.description, item.amount
```
Where name, description and amount are the keys.

`action`
This takes a boolean value. It used when you either want to add an action row to the data table

`actionFields`
By default action fields only support an Edit which essentially allows you to edit any of the items in a row of data. All you have to do is pass an array of the fields name you want to edit.
It also accepts an array

`sortBy`
This allows you to sort the data being passed to the table based on the a column of data. i.e Sort the data by all the Names, or the amount or description etc
This accepts the name of the column as a string

`sortDirection`
Allows to specify the direction in which to sort the specified `sortBy` variable by.
By default it sorts in the descending order if you want to sort in the ascending order just pass  `sortDirection="asc"`


## Deployment
Created a simple node app that serve the pages and will handle the history mode.
The Node app uses Express, Serve static and helmet for basic security checkmates. 

App is hosted on Heroku so thus a Procfile file is created to run the `node server.js` after successful production development. 

Previous we had to add a `postinstall` script to install the `npm run build` command after install all dependencies on Heroku when building but based on the recent changes to heroku. 
Heroku now runs the `npm run build` by default so we had to remove the `postinstall`

Lastly, we had to move the build for production to heroku mainly to allow us move our firebase configuration keys to envirnoment variables. 

## Extras
**Q:** How long did you spend on the test? Would you do anything differently if you had more time?

**A:** About 10 hours in total spread over 2 days. There are couple more features that could be added such as a search feature, paginations etc but that would have just prolonged it. Could probably add the search feature later tonight. 

**Q:** In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

**A:** That's essentially packaging the component as a Vue plugin so devs can install through npm or yarn and import into their project and get hacking.

**Q:** What is your favorite CSS property? Why?

**A:** No favourite css property, every property has a purpose and based on the task at hand and the support required will determine what property should be used over the other. 

**Q:** What is your favorite modern Javascript feature? Why?

**A:** This would be the use of `Let` in creating variables and the reason is simple i don't have to bother my head about scoping variables. 

**Q:** What is your favorite third-party Vue.js library? Why?

**A:** There's also no favourite just depends on what i'm building.
