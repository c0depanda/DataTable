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
By default it sorts in the descending order if you want to sort in the ascending order just pass 
```
sortBy="asc"
```
