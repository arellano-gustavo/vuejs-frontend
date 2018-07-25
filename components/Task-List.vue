<template>
  <div>
    <h1>Dato:{{ id }}</h1>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
    <!-- https://stackoverflow.com/questions/45658348/creating-component-dynamically-always-removes-last-instance  -->
  </div>
</template>


<script>

export default {
  props: ['text'],
  data: function () {
    return {
      id: 'none',
      count: 0,
      textual: 'hola mundo'
    }
  },
  created() {
    this.id = this.text
  }
}

</script>
