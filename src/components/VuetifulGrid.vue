<template>
  <div class="hello">
    <h2><a href="https://github.com/andrewcourtice/vuetiful/tree/master/src/components/datatable" target="_blank">Vuetiful</a></h2>

    <h3>Static Data</h3>
    <div class="grid-row" layout="row top-stretch">
      <div class="grid-cell">
        <toggle id="striped" v-model="customers.striped" data-intro="Toggle alternate row colouring on or off for all datatables" data-step="1">Striped</toggle>
        <toggle id="line-numbers" v-model="customers.lineNumbers" data-intro="Toggle line numbers on or off for all datatables" data-step="2">Line Numbers</toggle>
        <toggle id="editable" v-model="customers.editable" data-intro="Toggle edit mode for all datatables" data-step="3">Editable</toggle>
      </div>
    </div>
    <div class="grid-row" layout="row top-stretch">
      <div class="grid-cell" layout="row">
        <input type="text" placeholder="Type here to filter paginated data" self="size-x1" v-model="customers.filter" data-intro="You can filter the data in a datatable by typing in any of the filter fields" data-step="9" data-position="top">
      </div>
    </div>
    <div class="grid-row" layout="row top-stretch">
      <div class="grid-cell">
        <paginator :source="customers.rows" :page-size="4" :filter="customers.filter" data-intro="Use the paginator to page data for easier viewing" data-step="10" data-position="top">
          <template scope="page">
            <datatable id="data-table-main"
                       :source="page.data"
                       :filterable="false"
                       :striped="customers.striped"
                       :editable="customers.editable"
                       :line-numbers="customers.lineNumbers">
              <datatable-column id="sel" label="sel" width="3.25rem" class="checkable-column" :sortable="false" :groupable="false" data-intro="Use custom cell tamplates to put your own content in cells" data-step="6">
                <checkbox id="sel-all" v-model="selectAll"></checkbox>
              </datatable-column>
              <datatable-column
                  v-for="column in customers.columns"
                  :id="column.id"
                  :label="column.label"
                  :width="column.width"
                  :sortable="column.sortable"
                  :groupable="column.groupable"
                  :formatter="column.formatter">
              </datatable-column>
              <datatable-column id="actions" label="Actions" :sortable="false" :groupable="false"></datatable-column>
              <template slot="sel" scope="cell">
                <div class="checkable-column">
                  <checkbox :id="cell.row.id" :value="cell.row" v-model="customers.selected"></checkbox>
                </div>
              </template>
              <template slot="actions" scope="cell">
                <a rel="nofollow" @click="deleteCustomer(cell.row)">Delete Customer</a>
              </template>
            </datatable>
          </template>
        </paginator>
      </div>
    </div>

    <!-- REMOTE USERS -->
    <h3>Remote Data</h3>
    <p>
      Vuetiful grid does not support remote data out of the box. We are using the Vue.js "$http" module to read
      <a href="http://vuetable.ratiw.net/api/users" target="_blank">remote
        JSON API data</a>, but we only get the first 15 of 200 data sets since we'd have to implement the correct paging to work with the remote
      API first. Also, sorting only works for the current page, not the whole data set, see the intro text.
    </p>
    <div class="grid-row" layout="row top-stretch">
      <div class="grid-cell" layout="row">
        <input type="text" placeholder="Type here to filter paginated data" self="size-x1" v-model="users.filter" data-intro="You can filter the data in a datatable by typing in any of the filter fields" data-step="9" data-position="top">
      </div>
    </div>
    <div class="grid-row" layout="row top-stretch">
      <div class="grid-cell">
        <paginator :source="users.rows" :page-size="10" :filter="users.filter" data-intro="Use the paginator to page data for easier viewing" data-step="10" data-position="top">
          <template scope="page">
            <datatable id="data-table-main2"
                       :source="page.data"
                       :filterable="false"
                       :striped="users.striped"
                       :editable="users.editable"
                       :line-numbers="users.lineNumbers">
              <datatable-column
                  v-for="column in users.columns"
                  :id="column.id"
                  :label="column.label"
                  :width="column.width"
                  :sortable="column.sortable"
                  :groupable="column.groupable"
                  :formatter="column.formatter">
              </datatable-column>
            </datatable>
          </template>
        </paginator>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import datatable from 'vuetiful/src/components/datatable/datatable'
  import datatableColumn from 'vuetiful/src/components/datatable/datatable-column'
  import paginator from 'vuetiful/src/components/paginator/paginator'
  import checkbox from 'vuetiful/src/components/toggles/checkbox'
  import toggle from 'vuetiful/src/components/toggles/toggle'
  import aggregators from 'vuetiful/src/aggregators/aggregators'
  import formatters from 'vuetiful/src/formatters/formatters'
  import currencies from 'vuetiful/src/maps/currencies'
  // additional vuetiful directives
  import directives from 'vuetiful/src/directives/directives'
  function registerDirectives (Vue) {
    for (let directive in directives) {
      let definition = directives[directive]
      Vue.directive(directive, definition)
    }
  }
  registerDirectives(Vue)

  // users will be loaded from a remote server
  var users = {
    striped: true,
    editable: false,
    lineNumbers: false,
    filter: null,

    currency: 'EUR',
    dateFormat: 'D MMMM YYYY',

    columns: [
      {
        id: 'email',
        label: 'Email',
        width: 20,
        sortable: true,
        groupable: true,
        aggregators: []
      },
      {
        id: 'birthdate',
        label: 'Birthdate',
        width: null,
        sortable: true,
        groupable: true,
        aggregators: [
          aggregators.min,
          aggregators.max
        ],
        formatter: function (value) {
          return formatters.datetime(value, customers.dateFormat)
        }
      },
      {
        id: 'salary',
        label: 'Salary',
        width: null,
        sortable: true,
        groupable: true,
        aggregators: [
          aggregators.min,
          aggregators.max,
          aggregators.total
        ],
        formatter: function (value) {
          return formatters.currency(value, 2, customers.currency)
        }
      },
      {
        id: 'nickname',
        label: 'Nickname',
        width: 15,
        sortable: true,
        groupable: true,
        aggregators: []
      },
      {
        id: 'gender',
        label: 'Gender',
        width: 10,
        sortable: true,
        groupable: true,
        aggregators: []
      },
      {
        id: 'age',
        label: 'Age',
        width: 10,
        sortable: true,
        groupable: true,
        aggregators: []
      }
    ],
    // will be filled dynamically
    rows: [],
    selected: []
  }

  // customers are static
  var customers = {
    striped: true,
    editable: false,
    lineNumbers: false,
    filter: null,

    currency: 'EUR',
    dateFormat: 'D MMMM YYYY',

    columns: [
      {
        id: 'purchasor_name',
        label: 'Client Name',
        width: null,
        sortable: true,
        groupable: true,
        aggregators: []
      },
      {
        id: 'purchasor_email',
        label: 'Client Email',
        width: 25,
        sortable: true,
        groupable: true,
        aggregators: []
      },
      {
        id: 'purchase_date',
        label: 'Purchase Date',
        width: null,
        sortable: true,
        groupable: true,
        aggregators: [
          aggregators.min,
          aggregators.max
        ],
        formatter: function (value) {
          return formatters.datetime(value, customers.dateFormat)
        }
      },
      {
        id: 'purchase_amount',
        label: 'Purchase Amount',
        width: null,
        sortable: true,
        groupable: true,
        aggregators: [
          aggregators.min,
          aggregators.max,
          aggregators.total
        ],
        formatter: function (value) {
          return formatters.currency(value, 2, customers.currency)
        }
      }
    ],
    // static customers data
    rows: [
      {
        id: '0584e8d2-984c-4ce0-a20f-8b9e21cd2c00',
        purchasor_name: 'Nancy Fuller',
        purchasor_email: 'nfuller0@about.me',
        purchase_date: '2002-01-02T04:45:48Z',
        purchase_amount: 1166.14
      },
      {
        id: 'f4769183-38af-4c22-8383-6dea302466fd',
        purchasor_name: 'Melissa Meyer',
        purchasor_email: 'mmeyer1@angelfire.com',
        purchase_date: '2010-05-15T08:13:59Z',
        purchase_amount: 6123.50
      },
      {
        id: 'e171c9fb-2438-4f23-8d0d-011b2d8e95bc',
        purchasor_name: 'Larry Rose',
        purchasor_email: 'lrose2@cdbaby.com',
        purchase_date: '2014-11-23T09:18:18Z',
        purchase_amount: 8288.27
      },
      {
        id: '3cad078d-083b-416e-9dd4-2f1470c3458d',
        purchasor_name: 'Jack Simpson',
        purchasor_email: 'jsimpson3@mayoclinic.com',
        purchase_date: '2002-01-02T04:45:48Z',
        purchase_amount: 1215.03
      },
      {
        id: 'ef7ff12c-90e5-4bfb-8fdd-9f20e4206afa',
        purchasor_name: 'Ernest Watson',
        purchasor_email: 'ewatson4@nytimes.com',
        purchase_date: '2002-01-02T04:45:48Z',
        purchase_amount: 9455.16
      },
      {
        id: 'b243be08-6b9c-4ebd-bb8b-b59256ad4956',
        purchasor_name: 'Adam Castillo',
        purchasor_email: 'acastillo5@dailymotion.com',
        purchase_date: '2014-08-22T08:14:28Z',
        purchase_amount: 9988.45
      },
      {
        id: 'a491adf5-8129-4f93-9442-98522fbd1e90',
        purchasor_name: 'Wayne Wilson',
        purchasor_email: 'wwilson6@indiegogo.com',
        purchase_date: '2012-03-07T22:16:08Z',
        purchase_amount: 4563.87
      },
      {
        id: '497a6cca-5c9c-4b93-af8e-63c93de3eacf',
        purchasor_name: 'Roy Coleman',
        purchasor_email: 'rcoleman7@independent.co.uk',
        purchase_date: '2010-09-14T05:05:17Z',
        purchase_amount: 4563.87
      },
      {
        id: 'ea34a698-fb86-44a5-b80e-57087d48737c',
        purchasor_name: 'Betty Diaz',
        purchasor_email: 'bdiaz8@dropbox.com',
        purchase_date: '2012-03-07T22:16:08Z',
        purchase_amount: 7527.62
      },
      {
        id: 'c48e5e68-cae5-4a2e-96b2-8509fca19ddb',
        purchasor_name: 'Sharon Gardner',
        purchasor_email: 'sgardner9@seesaa.net',
        purchase_date: '2004-10-14T14:59:00Z',
        purchase_amount: 1166.14
      }
    ],
    selected: []
  }
  export default {
    props: {
      httpOptions: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    name: 'vuetifulgrid',
    components: {
      datatable,
      datatableColumn,
      paginator,
      checkbox,
      toggle
    },
    data () {
      return {
        customers: customers,
        users: users,
        currencies: currencies,
        aggregators: aggregators,
        list: null,
        dateFormats: [
          'DD/MM/YYYY',
          'DD MMM YYYY',
          'D MMMM YYYY',
          'D/MM/YYYY h:mm a'
        ],
        formatters: [
          { id: 'C', name: 'Currency' },
          { id: 'DT', name: 'Date and Time' }
        ]
      }
    },
    computed: {
      selectAll: {
        get: function () {
          return customers.selected.length === customers.rows.length
        },
        set: function (value) {
          customers.selected = value ? customers.rows : []
        }
      }
    },
    mounted: function () {
      this.getUsers()
    },
    methods: {
      getUsers: function () {
        var link = 'http://vuetable.ratiw.net/api/users'
        axios.get(link).then(function (response) {
          users.rows = response.data.data
          console.log('num users: ' + users.rows.length)
        }, function (error) {
          console.log(error.statusText)
        })
      },
      deleteCustomer: function (customer) {
        var result = window.confirm('You are about to delete ' + customer.purchasor_name + '. Are you sure?')
        if (result) {
          var index = customers.rows.indexOf(customer)
          if (index === -1) {
            return
          }
          customers.rows.splice(index, 1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    cursor: pointer;
    color: #42b983;
  }

  .container {
    padding: 1rem 0;
  }

  .datatable-options-toggle {
    padding: 0.5rem 1rem;
  }

  .checkable-column {
    text-align: center;
  }
  .checkable-column .checkbox {
    margin: 0;
  }

  .paginator .datatable {
    border: none;
  }
</style>
