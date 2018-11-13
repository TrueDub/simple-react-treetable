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

`<SimpleTreeTable tableData={this.props.tableData} dataFields={dataFields} columns={columns} control={control}/>`

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

####

Obviously, the tableData prop is required, and there is one other required prop:

dataFields - an array of strings, containing the attribute names to be 

## Not ready for Prime Time
This component is still under development and will change extensively over the next while.

Do not use this component until the 1.0.0 release!