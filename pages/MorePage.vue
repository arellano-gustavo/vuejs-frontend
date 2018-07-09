<template>
  <div>
    <!-- https://www.codejobs.biz/es/blog/2015/12/01/sistema-de-filas-y-columnas-de-bootstrap3-con-ejemplos -->
    <!-- https://codepen.io/tutelagesystems/pen/pjBbxQ -->
    <div id="vueApp">
        <div class="container">
            <div class="row">

              <div class="col-sm-9">

                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                          <div class="card-header">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label>Compra</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <div v-if="vacio">Loading...</div>
                                        <div style="text-align: right;" v-else>
                                            <label>Saldo: {{ data.a }} USDT</label>
                                        </div>
                                    </div>
                                </div>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="edad">Precio</label>
                                      <input type="text" class="form-control" value="" v-model="edad" />
                                    </div>
                                    <div class="form-group">
                                      <label for="valor">Cantidad</label>
                                      <input type="text" class="form-control" value="" v-model="valor" />
                                    </div>        
                                  </div>
                                  <div class="col-sm-12">
                                    <a href="#" class="btn btn-success" @click="checkWebsite">Comprar</a>
                                    <span v-if="ajaxRequest">Please Wait ...</span>
                                  </div>
                            </div>
                          </div>
                        </div> 
                    </div><!-- / comprar -->

                    <div class="col-sm-6">
                        <div class="card">
                          <div class="card-header">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label>Venta</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <div v-if="vacio">Loading...</div>
                                        <div style="text-align: right;" v-else>
                                            <label>Saldo: {{ data.b }} BTC</label>
                                        </div>
                                    </div>
                                </div>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="edad">Precio</label>
                                      <input type="text" class="form-control" value="" v-model="edad" />
                                    </div>
                                    <div class="form-group">
                                      <label for="valor">Cantidad</label>
                                      <input type="text" class="form-control" value="" v-model="valor" />
                                    </div>        
                                  </div>
                                  <div class="col-sm-12">
                                    <a href="#" class="btn btn-danger" @click="checkWebsite">Vender</a>
                                    <span v-if="ajaxRequest">Please Wait ...</span>
                                  </div>
                            </div>
                          </div>
                        </div> 
                    </div><!-- / vender -->
                </div> <!-- / sell and buy sections -->
                
                <div>&nbsp;</div>
                
                <div class="row">
                    <div class="col-sm-12">
                        <h3>Listado de posiciones colocadas</h3>
                    </div>
                  <div class="col-sm-12">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                            <th>ID</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr v-for="p in info" >
                        <td>{{ p.orderId }}</td>
                        <td>{{ p.price }}</td>
                        <td>{{ p.origQty }}</td>
                        <td>{{ p.side }}</td>
                        <td><button @click="cancelOrder(p.orderId)" class="btn btn-warning">delete</button></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div><!-- / orders list -->

                <div class="row" v-if="debug">
                  <div class="col-sm-12">
                    <pre>{{ $data  }}</pre>
                  </div>
                </div><!-- / debug info -->
              
              </div><!-- / first column -->

              <div class="col-sm-3">
                  <div class="card">
                    <div class="card-header">
                        <label>Valor actual BTC:&nbsp;</label><b>{{ xLabel[0].a }}</b>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                          <tr v-for="p in xLabel" >
                            <td>{{ p.a }}</td>
                            <td>{{ p.b }}</td>
                          </tr>
                        </table>              
                    </div>
                  </div>
              </div><!-- / coninuous price list-->

            </div><!-- / main row -->
        </div><!-- / container -->
    </div><!-- / vueApp -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
	data: function () {
    	return {
        	wsocket: null,
            info: "",
            valorz: "",
            data: "",
            vacio: true,
            vacio2: true,

            edad: "",
            valor: 1,

            dataLenght: 16,
            xLabel: [],            

            debug: false,
            ajaxRequest: false,
            postResults: []
    	}
	},
    created() {
    },    
    methods: {
    	onMessage: function (e) {
        	//var vm = this;
        	this.info = JSON.parse(e.data);
		},
        onMessage2: function (e) {
            var vm = this;
            var json = JSON.parse(e.data);
            this.vacio2 = false;

            vm.xLabel.push(json);
            if(vm.xLabel.length >= vm.dataLenght) {
                vm.xLabel.shift();
            }
        },
        onMessage3: function (e) {
            //var vm = this;
            this.data = JSON.parse(e.data);
            this.vacio = false;
        },
        cancelOrder(id) {
            alert('You are deleting user id: ' + id)
            // axios.delete('https://your.rest.api/users/' + id)
        },
        checkWebsite: function() {
            //var vm = this;
            // this.ajaxRequest = true;
            console.log(this.edad);
            axios.post('http://192.168.100.10:6060/jersey-sample/bitcoin', 
                {
                    edad: this.edad,
                    valor: this.valor
                }, 
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            ).then(function(r) {
                // console.log('r: ', JSON.stringify(r, null, 2))
                console.log(r.data.resultado)
            });
        }         
    },
    mounted: function () {
    	var vm = this;
        vm.wsocket = new WebSocket("ws://localhost:8080/WebSocket/orders");
    	vm.wsocket.onmessage = vm.onMessage;

        vm.wsocket2 = new WebSocket("ws://localhost:8080/WebSocket/websocketendpoint");
        vm.wsocket2.onmessage = vm.onMessage2;

        vm.wsocket3 = new WebSocket("ws://localhost:8080/WebSocket/balances");
        vm.wsocket3.onmessage = vm.onMessage3;     

    }
}
</script>
