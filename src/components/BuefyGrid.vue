<template>
  <div class="hello">
    <h3><a href="https://buefy.github.io/#/documentation/table" target="_blank">Buefy Table</a></h3>
    <p>The layout is a bit broken here, using all those different UI libs here in one example doesn't really work well ... but you get the idea hopefully :)
    For the original layout, check the Buefy examples!
      <br/>This example is using the table component and <strong>an extra pagination component</strong> to get async / remote data working, see
      <a href="https://github.com/rafaelpimpa/buefy/issues/50" target="_blank">this issue</a></p>
    <b-table
        :data="tableData"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :selectable="isSelectable"
        :checkable="isCheckable"
        :mobile-cards="hasMobileCards"
        :paginated="false"
        :backend-sorting="backendSorting"
        default-sort="id"
        render-html
        @check="checked"
        @sort="triggerSort"
        @change="triggerSort"
        @select="selected">

      <b-table-column field="id" label="ID" width="40" sortable numeric></b-table-column>
      <b-table-column field="name" label="Name" sortable></b-table-column>
      <b-table-column field="nickname" label="Nickname" sortable></b-table-column>
      <b-table-column field="birthdate" label="Date" sortable :format="formatDate"></b-table-column>
      <b-table-column field="gender" label="Gender" component="gender-icon"></b-table-column>

    </b-table>
    <b-pagination
        :total="paging.total"
        :current="paging.currentPage"
        :simple="false"
        :per-page="paging.perPage"
        order="is-right"
        @change="pageChange">
    </b-pagination>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Buefy from 'buefy'
  import axios from 'axios'
  import GenderIcon from './GenderIcon.vue'

  Vue.component('GenderIcon', GenderIcon)
  Vue.use(Buefy, {
    defaultIconPack: 'fa'
  })

  export default {
    props: {
      httpOptions: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        tableData: [],
        checkItems: [],
        selItem: {},
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isSelectable: false,
        isCheckable: false,
        hasMobileCards: true,
        isPaginated: false,
        isPaginationSimple: false,
        backendSorting: true,
        paging: {
          perPage: 10,
          currentPage: 1,
          total: 0
        },
        sort: {
          sortName: 'id',
          sortDesc: 'asc',
          currSort: 'id'
        }
      }
    },
    methods: {
      checked (items, item) {
        this.checkItems = items
      },
      selected (item) {
        this.selItem = item
      },
      formatDate (value, row) {
        return `<span class="tag is-primary">
                ${new Date(value).toLocaleDateString()}
            </span>`
      },
      triggerSort: function (value) {
        if (this.sort.currSort === value) {
          this.sort.sortDesc = (this.sort.sortDesc === 'asc') ? 'desc' : 'asc'
        } else {
          this.sort.sortDesc = 'asc'
        }
        this.sort.currSort = value
        this.sort.sortName = value
        this.getData()
      },
      pageChange: function (value) {
        this.paging.currentPage = value
        this.getData()
      },
      getSorting: function () {
        let result = '&sort=' + this.sort.sortName + '|' + this.sort.sortDesc
        return result
      },
      getData: function () {
        axios.get(`http://vuetable.ratiw.net/api/users?per_page=${this.paging.perPage}&page=${this.paging.currentPage}` + this.getSorting())
          .then(response => {
            this.tableData = response.data.data
            this.paging.total = response.data.total
          })
          .catch(err => {
            console.error(err.response.data.error)
          })
      }
    },
    mounted () {
      // console.log(this.$root.$children[0])
      this.getData()
    },
    computed: {
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
