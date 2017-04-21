<template>
  <div class="hello">
    <h3><a href="https://github.com/ratiw/vuetable-2" target="_blank">Vuetable-2</a></h3>
    <div>
      <filter-bar></filter-bar>
      <vuetable ref="vuetable"
                api-url="http://vuetable.ratiw.net/api/users"
                :fields="fields"
                :sort-order="sortOrder"
                :per-page="5"
                detail-row-component="my-detail-row"
                @vuetable:cell-clicked="onCellClicked"
                pagination-path=""
                :append-params="moreParams"
                @vuetable:pagination-data="onPaginationData"
      >
        <template slot="actions" scope="props">
          <div class="custom-actions">
            <button class="ui basic button"
                    @click="onAction('view-item', props.rowData, props.rowIndex)">
              <i class="zoom icon"></i>
            </button>
            <button class="ui basic button"
                    @click="onAction('edit-item', props.rowData, props.rowIndex)">
              <i class="edit icon"></i>
            </button>
            <button class="ui basic button"
                    @click="onAction('delete-item', props.rowData, props.rowIndex)">
              <i class="delete icon"></i>
            </button>
          </div>
        </template>
      </vuetable>
      <div class="vuetable-pagination ui basic segment grid">
        <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
        <vuetable-pagination ref="pagination"
                             @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueEvents from 'vue-events'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import DetailRow from './DetailRow'
  import FilterBar from './FilterBar'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
  import accounting from 'accounting'
  import moment from 'moment'

  Vue.use(VueEvents)
  Vue.component('my-detail-row', DetailRow)

  export default {
    name: 'vuetable2grid',
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
      FilterBar
    },
    data () {
      return {
        sortOrder: [
          {
            field: 'salary',
            sortField: 'salary',
            direction: 'asc'
          }
        ],
        moreParams: {},
        myCSS: {
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down'
        },
        fields: [
          {
            name: 'name',
            sortField: 'name'
          },
          {
            name: 'email',
            sortField: 'email'
          },
          {
            name: 'birthdate',
            sortField: 'birthdate',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
            callback: 'formatDate|DD.MM.YYYY'
          },
          {
            name: 'age',
            sortField: 'birthdate',
            dataClass: 'center aligned'
          },
          {
            name: 'nickname',
            sortField: 'nickname',
            callback: 'allcap'
          },
          {
            name: 'gender',
            sortField: 'gender',
            titleClass: 'center aligned',
            dataClass: 'center aligned',
            callback: 'genderLabel'
          },
          {
            name: 'salary',
            sortField: 'salary',
            titleClass: 'center aligned',
            dataClass: 'right aligned',
            callback: 'formatNumber'
          },
          {
            name: '__slot:actions',
            title: 'Actions',
            titleClass: 'center aligned',
            dataClass: 'center aligned'
          }
        ]
      }
    },
    mounted () {
      this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
      this.$events.$on('filter-reset', e => this.onFilterReset())
    },
    methods: {
      allcap (value) {
        return value.toUpperCase()
      },
      genderLabel (value) {
        return value === 'M'
          ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
          : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
      },
      formatNumber (value) {
        return accounting.formatNumber(value, 2)
      },
      formatDate (value, fmt = 'D MMM YYYY') {
        return (value == null)
          ? ''
          : moment(value, 'YYYY-MM-DD').format(fmt)
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      onAction (action, data, index) {
        console.log('slot) action: ' + action, data.name, index)
      },
      onCellClicked (data, field, event) {
        console.log('cellClicked: ', field.name)
        this.$refs.vuetable.toggleDetailRow(data.id)
      },
      onFilterSet (filterText) {
        this.moreParams = {
          'filter': filterText
        }
        console.log('filter-set', filterText)
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onFilterReset () {
        this.moreParams = {}
        console.log('filter-reset')
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
