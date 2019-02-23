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
<DataTable :action="true" :actionFields="['description']" :tableData="payments" :tableFields="['name', 'amount', 'description', 'date']" :tableHeader="['name', 'amount', 'description', 'date']" sortBy="date" />
```

### List of props supported

1. tableData

This accepts an array of objects

2. tableHeader

This accepts an array of titles. This is what gets populated in the header of the table

3. tableFields

4. action

5. actionFields

6. sortBy

7. sortDirection