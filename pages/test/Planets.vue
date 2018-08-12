<template>
	<div>
	<ul v-for="p in planets">
	  <li>{{ p.title }}</li>
	</ul>  
	</div>
</template>

<script>
    import {jsonInput } from './jsonInput';
    export default {
      data(){
          return {
              planets : jsonInput 
          }
       }
    }
</script>
