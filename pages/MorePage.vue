<template>
  <div>
    <!-- https://www.codejobs.biz/es/blog/2015/12/01/sistema-de-filas-y-columnas-de-bootstrap3-con-ejemplos -->
    <!-- https://codepen.io/tutelagesystems/pen/pjBbxQ -->
    <div id="vueApp">
        <div class="container">
          <div class="col-sm-12">
            <h1 style="text-align: center;">Interfaz para trading "Kebblar Capital"</h1>
          </div>
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
                            <h5 class="card-title">Posición de tipo "Limit" para compra</h5>
                            <p class="card-text">(revisor de límites activado)</p>
                            <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="edad">Precio</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="precioCompra" 
                                        v-bind:precision="2"
                                        class="form-control" />                                      
                                    </div>
                                    <div class="form-group">
                                      <label for="valor">Cantidad</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="cantidadCompra" 
                                        v-bind:precision="2"
                                        class="form-control" />                                      
                                    </div>        
                                  </div>
                                  <div class="col-sm-12">
                                    <a href="#" class="btn btn-success" @click="checaCompra">Comprar</a>
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
                            <h5 class="card-title">Posición de tipo "Limit" para venta</h5>
                            <p class="card-text">(revisor de límites activado)</p>
                            <div class="row">
                                  <div class="col-sm-12">
                                    <div class="form-group">
                                      <label for="edad">Precio</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="precioVenta" 
                                        v-bind:precision="2"
                                        class="form-control" />
                                    </div>
                                    <div class="form-group">
                                      <label for="valor">Cantidad</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="cantidadVenta" 
                                        v-bind:precision="2"
                                        class="form-control" />
                                    </div>        
                                  </div>
                                  <div class="col-sm-12">
                                    <a href="#" class="btn btn-danger" @click="checaVenta">Vender</a>
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
                        <label>Valor actual BTC:&nbsp;</label><b>{{ current }}</b>
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


<!-- 
  https://github.com/euvl/vue-js-modal 
  https://github.com/euvl/vue-js-modal/blob/master/demo/client_side_rendering/src/App.vue
-->
<modal 
    name="op-denegada" 
    :clickToClose="false" 
    :reset="true"          
    :width="480"
    :height="260">
    <div class="card">
      <div class="card-header">
        Advertencia del sistema
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ tituloOpDenegada }}</h5>
        <p class="card-text">{{ modalInfo }}</p>
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
              info: "",
              valorz: "",
              data: "",
              vacio: true,
              current: 0,

              edad: "",
              valor: 1,
              delta: 0.91,
              modalInfo: "",
              tituloOpDenegada: "",

              precioVenta: 0,
              cantidadVenta: 0,
              precioCompra: 0,
              cantidadCompra: 0,

              dataLenght: 10,
              xLabel: [0,0],            

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
            this.current = json.a;

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
        closeModal: function() {
          this.$modal.hide('op-denegada');
        },
        checaVenta: function() {
          if(this.cantidadVenta*this.precioVenta<10) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(this.cantidadVenta*this.precioVenta)+") es menor a 10 USD";
            this.$modal.show('op-denegada');            
          } else if(this.data.b<this.cantidadVenta) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.b + " BTC";
            this.$modal.show('op-denegada');
          } else if(this.precioVenta<this.current*this.delta ) {
            this.tituloOpDenegada = "Operacion con riesgo";
            this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación "+this.precioVenta+" es menor a "+Math.floor(this.current*this.delta)+" USDT."
            this.$modal.show('op-denegada');
          } else {
            alert("ok");
          }
        },
        checaCompra: function() {          
            //var vm = this;
            // this.ajaxRequest = true;
            if(false) {
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
            } else {
              if(this.cantidadCompra*this.precioCompra<10) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(this.cantidadCompra*this.precioCompra)+") es menor a 10 USD";
                this.$modal.show('op-denegada');            
              } else if(this.data.a<this.cantidadCompra) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.a + " USDT";
                this.$modal.show('op-denegada');
              } else {
                if(this.precioCompra>(this.current*(2-this.delta)) ) {
                  this.tituloOpDenegada = "Operacion con riesgo";
                  this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación " + this.precioCompra + " es mayor a " + Math.floor(this.current*(2-this.delta))+" USDT."                
                  this.$modal.show('op-denegada');
                } else {
                  alert("ok");
                }
              }
            }
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
