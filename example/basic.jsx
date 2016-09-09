var React = require('react')
var ReactPivot = require('..')
var lodash = require('lodash')

//var rows = require('./data.json')
var rows = require('./diseaseData3.json')
var colData = require('./colData.js')

// These are your "groups"
// "title" is the title of the column
// all rows with the same "value" will be grouped
var dimensions = [
  // "value" can be the key of what you want to group on
  {title: 'Province', value: 'province'},
  {title: 'District', value: 'district'},
  {title: 'Facility', value: 'facility'}
  // "value" can also be function that returns what you want to group on
]

// All rows will be run through the "reduce" function
// Use this to build up a "memo" object with properties you're interested in
var reduce = function(row, memo) {
  // the memo object starts as {} for each group, build it up

  //  memo.count = (memo.count || 0) + 1
      memo[row["name"] + '_case_total'] = (memo[row["name"] + '_case_total'] || 0) + parseFloat(row[row["name"] + '_case'])
      memo[row["name"] + '_death_total'] = (memo[row["name"] + '_death_total'] || 0) + parseFloat(row[row["name"] + '_death'])
  // be sure to return it when you're done for the next pass
  return memo
}


var calculations = function() {
  var calculationsData = []
  lodash.map(colData,(function(value, key) {
    if (!value.hasChildren) {
     calculationsData = lodash.concat(calculationsData, {title: key + '_case_total', value: key + '_case_total',template: function(val, row) { return val }})
     calculationsData = lodash.concat(calculationsData, {title: key + '_death_total', value: key + '_death_total', template: function(val, row) { return val }})
    }
  }))
  return calculationsData
}()


React.render(
  <ReactPivot rows={rows}
    dimensions={dimensions}
    reduce={reduce}
    calculations={calculations}
    activeDimensions={['Province']} />,
  document.body
)
