# simple-react-treetable
A React component that presents a simple TreeTable, allowing the user to supply styling and rendering options.

## Installation
Run the following command:
`npm install simple-react-treetable --save`
or
`yarn add simple-react-treetable --save`

## Usage

Firstly, import the component as follows:

`import SimpleTreeTable from "simple-react-treetable";`

Then include it in your components as follows:

`<SimpleTreeTable tableData={this.props.tableData} columns={columns} control={control}/>`

See our [Demo page](https://truedub.github.io/simple-react-treetable/index.html) to see the component in action.

SimpleTreeTable expects data in the following format:

```javascript
[
    {
        data: {
            name: "name0",
            dataType: "string0",
            example: "ex0",
            description: "desc0"
        },
        children: [
            {
                data: {
                    name: "name0-0",
                    dataType: "string0-0",
                    example: "ex0-0",
                    description: "desc0-0"
                },
                children: []
            }, {
                data: {
                    name: "name0-1",
                    dataType: "string0-1",
                    example: "ex0-1",
                    description: "desc0-1"
                },
                children: []
            }, {
                data: {
                    name: "name0-2",
                    dataType: "string0-2",
                    example: "ex0-2",
                    description: "desc0-2"
                },
                children: [
                    {
                        data: {
                            name: "name0-2-1",
                            dataType: "string0-2-1",
                            example: "ex0-2-1",
                            description: "desc0-2-1"
                        },
                        children: []
                    }
                ]
            }
        ]
    },
    {
        data: {
            name: "name1",
            dataType: "string1",
            example: "ex1",
            description: "desc1 &euro; &euro;"
        },
        children: []
    },
    {
        data: {
            name: "name2",
            dataType: "string2",
            example: "ex2",
            description: "desc2 &euro; &euro; &euro; &euro;"
        },
        children: []
    }
]
```

### Configuration options

Obviously, the tableData prop is required. There is one other required prop:

**columns** is an array of objects, describing the columns to be rendered. The options within a column object are:

| Attribute Name | Type | Description | Example | Required |
| -------------- | ---- | ----------- | ------- | -------- |
| dataField      | String | the field that holds the data to be displayed | name | Yes |
| heading        | String | the column header to be used - if not supplied, the dataField is used instead. | Name | No |
| fixedWidth     | Boolean | Should the column be defined with a fixed width? | false | No |
| percentageWidth | Number | The percentage width this column will be allocated, should fixedWidth be true | 25 | No |
| styleClass     | String | A CSS class to be applied to the TD element for this field | whatever | No |
| renderer       | function | A function to be applied to the data - see further detail below | whatever | No |
| sortable       | Boolean | Is this field sortable? Default is yes | false | No |
| sortOrder      | String | Indicates that the table should be sorted by this field in this order - values are 'asc' or 'desc' | asc | No |

Further control of how the table is displayed can be provided using the **control** prop.

| Attribute Name | Type | Description | Example | Required |
| -------------- | ---- | ----------- | ------- | -------- |
| visibleRows    | Number | Number of levels to display automatically - default is 1 | 2 | No |
| tableClasses   | String | CSS class(es) to be applied to the table. See the styling section for more information. | | No |
| showExpandCollapseButton     | Boolean | Should the Expand All/Collapse All button be displayed? | False | No | 
| expandCollapseButtonClasses  | String | CSS classes to be applied to the button, if displayed | | No |
| showResetSortingButton     | Boolean | Should the Reset Sorting button be displayed, when appropriate? | False | No | 
| resetSortingButtonClasses  | String | CSS classes to be applied to the button, if displayed | | No |
        
#### Rendering option

A function can be provided on a per-column basis to control the display of the data from that column.

This function should accept 2 parameters:

1. dataRow - the entire row of data being operated on
2. dataField - the name of the field within that row to be displayed

Thus the actual data for the column will be provided as `dataRow.data[dataField]`

The function should return a simple type (string, number etc) or HTML - see the example below:

````javascript
let descriptionRenderer = function (dataRow, dataField) {
    return <span dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}></span>
};
````

#### Styling options

The table is by default entirely unstyled. To style it, simply provide a string of class names (separated by spaces) in the `control.tableClasses` prop.

For example, to use Bootstrap styling, you can pass "table table-bordered" to the prop, and assuming the Bootstrap CSS is available, the relevant styling will be applied.

Note that Bootstrap table striping won't work on a table where rows are expandable, as the striping is applied once at render time and doesn't adjust to the display changing.

### Sorting
The table can be sorted by default, simply set the `sortOrder` attribute of the relevant column.

Clicking the header of any column will sort by that column, in ascending order. Clicking again will sort in descending order. Appropriate icons are used to indicate the sort order.

You can prevent sorting of a specific column by simply setting the `sortable` attribute of the relevant column to false.

### Use as a simple DataTable

To use this component as a simple datatable (i.e. no expandable capabilities), simply provide a `tableData` prop with no `children` attributes.  

## Release History

| Release | Description | Release date |
| ------- | ----------- | ------------ |
|  2.0.0  | Added sorting | TBD |
|  1.0.3  | Corrected the configuration | Nov 19 2018 |
|  1.0.2  | Changed Babel setup to the correct dependency | Nov 19 2018 |
|  1.0.1  | IE11 compatibility | Nov 19 2018 |
|  1.0.0  | Initial launch | Nov 15 2018 |
|  0.9.1  | Second final pre-release candidate! | Nov 15 2018 |
|  0.9.0  | Final pre-release candidate | Nov 15 2018 |
|  0.3.0  | Another pre-release candidate | Nov 13 2018 |
|  0.2.0  | Pre-release effort | Nov 12 2018 |
