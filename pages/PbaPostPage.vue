<template>
<div>
  <div class="container">
  	<h1>Sorpresa</h1>
  	<a href="#" class="btn btn-primary" @click="ok">Aceptar</a>
  </div>

	<modal 
	    name="op-goose" 
	    :clickToClose="false" 
	    :reset="true"          
	    :width="480"
	    :height="260">
	    <div class="card">
	      <div class="card-header">
	        Advertencia del sistema
	      </div>
	      <div class="card-body">
	        <h5 class="card-title">uno</h5>
	        <p class="card-text">{{ infoH }}</p>
	        <div style="text-align: right;">
	          <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
	        </div>
	      </div>
	    </div>
	</modal>  
</div>
</template>

<script>
import axios from 'axios';
export default {
  	data: function () {
      	return {
        	infoH: "xyz"
      	}
  	},
    created() {
    },    
    methods: {
        closeModal: function() {
          this.$modal.hide('op-goose');
        },    	
        ok: function() {
          axios.post('http://13.57.5.179:6060/coloca', 
              {
                  accion: "venta"
              }, 
              {
                  headers: {
                      'Content-type': 'application/json'
                  }
              }
          ).then(response => {
          	//alert(response.data.message);
          	//alert(r.data.message);
          	this.infoH = response.data.message;
          	this.$modal.show('op-goose');
          });
        }        
      },
      mounted: function () {
      },
      computed: {
      }
}
</script>
