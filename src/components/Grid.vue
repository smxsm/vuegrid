<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

    <div class="info">
      To "get into" Vue.js, I am going to compare different "datatable" solutions I came across and which I found promising.
      In the past, working with jQuery and mainly AngularJS (1 and 2) and also JAVA frameworks like Grails it was always very difficult and cumbersome to find a really good
      datatable, which was easy to use, stable and had all the features the projects needed.
      <br/>
      So I figured, if I can find a decent datatable component for Vue.js, it would be a good sign for the Vue.js framework and community and also a good way to dive
      into the framework very fast :)
    </div>

    <h3>1) <a href="https://github.com/ratiw/vuetable-2" target="_blank">Vuetable-2</a></h3>
    <div>
      <p>Vuetable 2 allows a quick start, but some additional steps are required to get a full-blown datatable with all the bells and whistles.</p>
      <h4>Additional Steps</h4>
      <ul>
        <li>npm install vue-events --save-dev</li>
      </ul>
      <h4>Pros</h4>
      <ul>
        <li>great step-by-step tutorials</li>
        <li>example app with Laravel backend</li>
        <li>feature-rich</li>
        <li>support for remote data API</li>
        <li>modularized filterbar and pagination</li>
        <li>remote data support</li>
        <li>easyly customizable</li>
      </ul>

      <h4>Drawbacks</h4>
      <ul>
        <li>no out-of-the-box cell editing (but can be added with custom templates or slots in Vue.js >= 2.1)</li>
      </ul>

    </div>

    <h3>2) <a href="https://github.com/matfish2/vue-tables-2" target="_blank">Vue-Tables-2</a></h3>
    <div>
      <p>Vue-Tables 2 are simple to start with, but have a bunch of options for customization (without adding much code)</p>
      <h4>Additional Steps</h4>
      <ul>
        <li>n/a</li>
      </ul>

      <h4>Pros</h4>
      <ul>
        <li>very lean</li>
        <li>client and server data by config</li>
        <li>remote data mapping for external APIs via "ResponseAdapter"</li>
        <li>example Laravel Backend included</li>
      </ul>

      <h4>Drawbacks</h4>
      <ul>
        <li>documentation and examples are a bit lacking</li>
        <li>cell editing only via custom templates / slots</li>
      </ul>
    </div>

    <h3>3) <a href="https://github.com/andrewcourtice/vuetiful/tree/master/src/components/datatable" target="_blank">Vuetiful</a></h3>
    <div>
      <p>Vuetiful has some other components, too, and is probably aiming to become a full collection of UI components.
      The datatable has some really cool features, while lacking some quite basic ones like sorting of the full dataset or
      out-of-the-box support for remote data.</p>
      <h4>Additional Steps</h4>
      <ul>
        <li>npm install git://github.com/andrewcourtice/vuetiful.git</li>
        <li>npm install sass-loader --save-dev</li>
        <li>npm install node-sass --save-dev</li>
      </ul>

      <h4>Pros</h4>
      <ul>
        <li>cell-editing</li>
        <li>feature-rich</li>
        <li>aggregations</li>
        <li>grouping by dragging of header cells</li>
        <li>other cool components</li>
        <li>good documentation</li>
        <li>easy configuration, many config options</li>
      </ul>

      <h4>Drawbacks</h4>
      <ul>
        <li>no out-of-the-box remote data support (no remote paging, sorting, ...)</li>
        <li>sorting only works on current page, not the whole data set, see <a href="https://github.com/andrewcourtice/vuetiful/issues/10" target="_blank">Issue 10</a> </li>
        <li>inline cell editing only available globally (whole table, not single columns)</li>
        <li>not available via npm / yarn package yet (but can be installed from the Github URL)</li>
      </ul>

    </div>

    <span name="jquery" id="jquery"></span>
    <h3>4) <a href="https://laracasts.com/discuss/channels/vue/using-datatables-with-vue" target="_blank">jQuery Datatables</a></h3>
    <div>
      Well, I couldn't get jQuery Datatables to work in my Vue.js project ... I've tried it via
      <a href="https://github.com/cretueusebiu/vue-datatables" target="_blank">https://github.com/cretueusebiu/vue-datatables</a>, but I was getting
      errors with require() of "datatables.net-bs", no matter what I tried, I always got
      <pre>
      ERROR  Failed to compile with 1 errors                                                                                                                                         08:36:52
      This dependency was not found:
      * datatables.net-bs in ./src/main.js
      To install it, you can run: npm install --save datatables.net-bs
      </pre>
      and some other errors ....
      Of course, the datatables.net*-modules were installed before... if anybody has an idea how to fix that, let me know :)
    </div>

    <h3>Other solutions</h3>
   <h4><a href="https://vuetifyjs.com/components/datatables" target="_blank">Vuetify</a></h4>
    <p><strong>Vuefify</strong> is a really great looking UI and component lib for Vue.js, it really has a lot of components
      and is using Material Design for layout. The <a href="https://vuetifyjs.com/components/datatables" target="_blank">datatable</a>
      though is also <i>not supporting remote / async data yet</i>, so for me
    that is a show stopper at the moment (same as for Vuetiful, see above). <strong>But</strong>, there is hope -
      <a href="https://github.com/vuetifyjs/vuetify/issues/345" target="_blank">async data support seems to be in the making for the next release</a>,
      so we might have a new winner then ;)</p>

    <h3>Conclusion</h3>

    <p>All the datatable components I have tested seem to "do their job". All of them (except JQuery Datatables probably) share the drawback though
    that they are mainly developed by single committers in their spare time, so nobody knows if the development will be discountinued
    in the future, how fast issues are taken care of etc.</p>
    <p>That being said, none of the solutions is "perfect", but I think every of these components can be used for "real life" projects, it really depends which features you need
      and which one "feels" better to you. My personal favourite would be <strong>"Vuetiful"</strong>, too bad it doesn't really work well
    with remote data and that the sorting only sorts the current page - that will be a problem in almost any project I can think of.
    If that would be fixed, I'd definitely recommend Vuetiful since it has some other cool components, too!</p>
    <p>
      <img src="static/Vuetiful_Component_Framework_small.jpg">
    </p>
    <p>So all-in-all, I'd currently recommend <strong><a href="https://github.com/ratiw/vuetable-2" target="_blank">"Vuetable-2"</a></strong>
      since it is really flexible, has a lot of features, good documentation and examples and e.g. inline editing should't be too hard to add, especially if you are using Vue.js >= 2.1
      with the <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots" target="_blank">new "slots" feature</a>.
      <br/>But, as stated above, as soon as Vuetiful or Vuetify support remote / async data, I'll throw the dice again :)
      <br/><strong><i>So, as always - try and decide for yourself!</i></strong> :)
    </p>
    <p>
      So, that's it for now, I really like Vue.js so far, I've posted the source code for this comparison on
      <a href="https://github.com/smxsm/vuegrid" target="_blank">Github</a>!
      <br/>
      Let me know if I've missed another cool datatable, I'll try to add it here!
    </p>
    <p>
      <strong>Next stop: Datatabless in Aurelia! :) Stay tuned and happy coding!</strong>
      <br/>
      P.S.: If you happen to use <strong>Angular</strong>, use <a href="https://www.primefaces.org/primeng/#/">PrimeNG</a> for datatables and dozens of other
      super-cool ui widgets etc.!
    </p>
  </div>
</template>

<script>

  export default {
    name: 'grid',
    data () {
      return {
        msg: 'Welcome to the Vue.js DataTable Comparison'
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    padding: 20px;
  }
  .hello {
    text-align: left;
    margin-left: 20px;
    padding: 20px;
    font-size: 16px;
  }
  .info {
    width: 80%;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style: square;
    padding: 10px;
  }

  li {
    list-style: square;
    display: list-item;
  }

  a {
    color: #42b983;
  }
</style>
