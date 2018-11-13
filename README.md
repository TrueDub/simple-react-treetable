# simple-react-treetable
A React component that presents a simple TreeTable, allowing the user to supply styling and rendering options.

## Not ready for Prime Time
This component is still under development and will change extensively over the next while.

Do not use this component until the 1.0.0 release!

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

Further control of how the table is displayed can be provided using the **control** prop.

| Attribute Name | Type | Description | Example | Required |
| -------------- | ---- | ----------- | ------- | -------- |
| tableClasses   | String | CSS class(es) to be applied to the table. See the styling section for more information. | | No |
| showButton     | Boolean | Should the Expand All/Collapse All button be displayed? | False | No | 
| buttonClasses  | String | CSS classes to be applied to the button, if displayed | | No |
        
#### Rendering option

A function can be provided on a per-column basis to control the display of the data from that column.

This function should accept 2 parameters:

dataRow - the entire row of data being operated on
dataField - the name of the field within that row to be displayed

Thus the actual data for the column will be provided as `dataRow.data[dataField]`

The function should return HTML - see the example below:

````javascript
let descriptionRenderer = function (dataRow, dataField) {
    return <span><span dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}></span></span>
};
````

#### Styling options

The table is by default entirely unstyled. To style it, simply provide a string of class names (separated by a space) in the `control.tableClasses` prop.

For example, to use Bootstrap styling, you can pass "table table-bordered" to the prop, and assuming the Bootstrap CSS is available, the relevant styling will be applied.

Note that Bootstrap table striping won't work on a table where rows are expandable, as the striping is applied once at render time and doesn't adjust to the display changing.

### Use as a simple DataTable

To use this component as a simple datatable (i.e. no expandable capabilities), simply provide a `tableData` prop with no `children` attributes.  

## Release History

| Release | Description | Release date |
| ------- | ----------- | ------------ |
|  0.2.0  | Pre-release effort | Nov 12 2018 |
|  0.3.0  | Another pre-release candidate | Nov 13 2018 |
|  1.0.0  | Initial launch | TBD |