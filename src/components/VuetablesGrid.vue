<template>
  <div class="hello">
    <h3><a href="https://github.com/matfish2/vue-tables-2" target="_blank">Vue-Tables-2</a></h3>
    <div id="people">
      <v-server-table url="http://vuetable.ratiw.net/api/users" :columns="columns" :options="options">
        <template slot="edit" scope="props">
          <div class="custom-actions">
            <button class="ui basic button"
                    @click="onAction('view-item', props.row)">
              <i class="zoom icon"></i>
            </button>
            <button class="ui basic button"
                    @click="onAction('edit-item', props.row)">
              <i class="edit icon"></i>
            </button>
            <button class="ui basic button"
                    @click="onAction('delete-item', props.row)">
              <i class="delete icon"></i>
            </button>
          </div>
        </template>
      </v-server-table>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {ServerTable} from 'vue-tables-2'
  Vue.use(ServerTable)

  export default {
    name: 'grid',
    components: {
    },
    data () {
      return {
        columns: ['id', 'email', 'name', 'birthdate', 'age', 'salary', 'edit'],
        options: {
          // see the options API
          'responseAdapter': function (resp) {
            return {
              data: resp.data,
              count: resp.total
            }
          },
          'requestKeys': {
            query: 'filter',
            limit: 'per_page',
            orderBy: 'orderBy',
            ascending: 'ascending',
            page: 'page',
            byColumn: 'byColumn'
          }
          /*
          childRow: function (h, row) {
            return 'My custom content for row ' + row.id
          }
          */
        }
      }
    },
    mounted () {
    },
    methods: {
      onAction (action, row) {
        console.log('slot) action: ' + action, row.id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    padding: 20px;
  }
  .hello {
    margin-left: 20px;
    padding: 20px;
  }
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

  .VueTables__child-row-toggler {
    width:16px;
    height:16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }

  .VueTables__child-row-toggler--open::before  {
    content: "-";
  }

</style>
