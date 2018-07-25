<template>
  <div>
    <h1>GUS 2</h1>
    <task-list :text="major"></task-list>
  </div>
</template>

<script>
import TaskList from '@/components/Task-List'

//const TaskList = Vue.component('task-list', require('../../components/Task-List.vue'));


export default {


  components: {
    TaskList
  },
    data: function () {
        return {
              major: "BTC",
              minor: "USDT",
              hostRest: "xyz"
        }
    },
    created() {
    },    
    methods: {
    }
}

</script>
