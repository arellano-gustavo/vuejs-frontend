<template>
  <div>
	    <table>
	      <tr v-for="p in xLabel" border=1>
	        <td>{{ p.a }}</td>
	        <td>{{ p.b }}</td>
	      </tr>
	    </table>
  </div>
</template>

<script>
export default {
	data: function () {
    	return {
        	wsocket: null,
        	dataLenght: 10,
        	xLabel: [],
    	}
	},
    created() {
    },
    methods: {
    	onMessage: function (e) {
        	var vm = this;
        	var json = JSON.parse(e.data);

        	vm.xLabel.push(json);
        	if(vm.xLabel.length >= vm.dataLenght) {
        		vm.xLabel.shift();
        	}
		}
    },
    mounted: function () {
    	var vm = this;
    	vm.wsocket = new WebSocket('ws://localhost:8080/WebSocket/websocketendpoint');
    	vm.wsocket.onmessage = vm.onMessage;
    }
}
</script>
