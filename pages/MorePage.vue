<template>
  <div>
    <!-- https://www.codejobs.biz/es/blog/2015/12/01/sistema-de-filas-y-columnas-de-bootstrap3-con-ejemplos -->
    <!-- https://codepen.io/tutelagesystems/pen/pjBbxQ -->
    <div id="vueApp">
        <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <div>Trader: {{ userName }}</div>
              </div>
              <div class="col-sm-6">
                <div style="text-align:right;">Fee: T=0.075% | M=0.075%</div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div style="text-align:right;">Remanente en BNB's: {{ data.c }}</div>
              </div>              
            </div>

            <hr/>

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
                                            <label>Saldo: {{ data.a }} {{ minor }}</label>
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
                                      <label for="precioCompra">Precio (en {{ minor }})</label>
                                      <!-- https://www.npmjs.com/package/vue-numeric -->
                                      <vue-numeric 
                                        separator="," 
                                        v-model="precioCompra" 
                                        v-bind:precision="7"
                                        class="form-control" />                                      
                                    </div>
                                    <div class="form-group">
                                      <label for="cantidadCompra">Cantidad (en {{ major }})</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="cantidadCompra" 
                                        v-bind:precision="7"
                                        class="form-control" />                                      
                                    </div>        
                                  </div>
                             </div>

                             <div class="row"> 
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(true, 100, data.a)">100%</a>
                                  </div>
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(true, 75, data.a)">75%</a>
                                  </div>
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(true, 50, data.a)">50%</a>
                                  </div>                      
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(true, 25, data.a)">25%</a>
                                  </div>
                            </div>
                            <hr/>
                            <div class="row">
                                  <div class="col-sm-6">
                                    <a href="#" class="btn btn-success" @click="checaCompra">Comprar</a>
                                  </div>

                                  <div class="col-sm-6">
                                    <div style="text-align: right;">
                                      <label>Gasto: {{ totalOperacion(cantidadCompra, precioCompra) }} {{ minor }}</label>
                                    </div>
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
                                            <label>Saldo: {{ data.b }} {{ major }}</label>
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
                                      <label for="precioVenta">Precio (en {{ minor }})</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="precioVenta" 
                                        v-bind:precision="7"
                                        class="form-control" />
                                    </div>
                                    <div class="form-group">
                                      <label for="cantidadVenta">Cantidad (en {{ major }})</label>
                                      <vue-numeric 
                                        separator="," 
                                        v-model="cantidadVenta" 
                                        v-bind:precision="7"
                                        class="form-control" />
                                    </div>        
                                  </div>
                             </div>

                             <div class="row">
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(false, 100, data.b)">100%</a>
                                  </div>
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(false, 75, data.b)">75%</a>
                                  </div>
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(false, 50, data.b)">50%</a>
                                  </div>
                                  <div class="col-sm-3">
                                    <a href="#" class="btn btn-info" @click="asigna(false, 25, data.b)">25%</a>
                                  </div>
                            </div>
                            <hr/>
                            <div class="row">
                                  <div class="col-sm-6">
                                    <a href="#" class="btn btn-danger" @click="checaVenta">Vender</a>
                                    <span v-if="ajaxRequest">Please Wait ...</span>
                                  </div>

                                  <div class="col-sm-6">
                                    <div style="text-align: right;">
                                      <label>Recepción: {{ totalOperacion(cantidadVenta, precioVenta) }} {{ minor }}</label>
                                    </div>
                                  </div>
                            </div>
                          </div>
                        </div> 
                    </div><!-- / vender -->
                </div> <!-- / sell and buy sections -->
                
                <hr/>
                
                <div class="row">
                    <div class="col-sm-12">
                        <h3>Listado de posiciones colocadas {{ info2 }}</h3>
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
                        <td><button @click="cancelOrder(p.clientOrderId)" class="btn btn-warning">delete</button></td>
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
                        <label>Valor actual {{ major }}:&nbsp;</label><b>{{ current }}</b>
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
                  <hr/>
                  <button type="button" class="btn btn-primary" @click="zape">
                    <span class="glyphicon glyphicon-search">Refresh</span>
                  </button>
                  <a href="#" class="btn btn-primary" @click="openHistory">History</a>                  
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


<modal
    name="operaciones"
    :clickToClose="false"
    :reset="true"
    :width="960"
    :height="480">
  <div class="card">
    <div class="card-header">
        <div class="row">
          <div class="col-sm-9">
              <h3>Histórico de la últimas 50 posiciones ejecutadas</h3>
          </div>
          <div class="col-sm-3">
            <div style="text-align: right;">
              <a href="#" class="btn btn-danger" @click="closeHistory">X</a>
            </div>            
          </div>          
        </div>
    </div>
    <div class="card-body scroll">
                <div class="row">
                  <div class="col-sm-12">
                      <table class="table table-striped header-fixed">
                        <thead>
                          <tr>
                              <th>ID</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>Tipo</th>
                              <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr v-for="p in history">
                          <td>{{ p.orderId }}</td>
                          <td>{{ p.price }}</td>
                          <td>{{ p.origQty }}</td>
                          <td>{{ p.side }}</td>
                          <td>{{ p.status }}</td>
                        </tr>
                        </tbody>
                      </table>
                  </div>
                </div><!-- / orders history -->
                <div class="row">
                  <div class="col-sm-12">
                    <label>Scroll to review your full fucking history, dude... </label>
                  </div>
                </div>                
    </div>
  </div>
</modal>



  </div>
</template>



<style>
.header-fixed {
    width: 100% 
}

.header-fixed > thead,
.header-fixed > tbody,
.header-fixed > thead > tr,
.header-fixed > tbody > tr,
.header-fixed > thead > tr > th,
.header-fixed > tbody > tr > td {
    display: block;
}

.header-fixed > tbody > tr:after,
.header-fixed > thead > tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

.header-fixed > tbody {
    overflow-y: auto;
    height: 250px;
}

.header-fixed > tbody > tr > td,
.header-fixed > thead > tr > th {
    width: 20%;
    float: left;
}  
</style>



<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

export default {
    data: function () {
        return {
              major: "BTC",
              minor: "USDT",

              info: "",
              info2: "",
              valorz: "",
              data: "",
              history: "",
              vacio: true,
              current: 0,
              userName:'',

              delta: 0.985,
              modalInfo: "",
              tituloOpDenegada: "",

              precioVenta: 0,
              cantidadVenta: 0,
              precioCompra: 0,
              cantidadCompra: 0,

              dataLenght: 7,
              xLabel: [0,0],            

              debug: false,
              ajaxRequest: false,
              postResults: [],

              hostWs: "abc",
              hostRest: "xyz"
        }
    },
    created() {
    },    
    methods: {
        asigna: function(a, b, c) {
           //console.log(a+"  "+b+"  "+c);
           if(a==true) {
              this.cantidadCompra = (c*b/100)/this.current;
           }
           if(a==false) {
              this.cantidadVenta = c*b/100;
           }
        },
        totalOperacion: function(a, b) {
           return a*b;
        },
        meta: function(a, b, c) {
           //console.log("a:"+a);
           //console.log("b:"+b);
           //console.log("c:"+c);
           
           var r = (a/c) + b;
           return "...";
        },
        onMessagePrice: function (e) {
            var vm = this;
            var json = JSON.parse(e.data);
            this.current = json.a;

            vm.xLabel.push(json);
            if(vm.xLabel.length >= vm.dataLenght) {
                vm.xLabel.shift();
            }
        },
        onMessage3: function (e) {
            var response = JSON.parse(e.data); 
            this.data = response.balance;
            this.info = response.ordenes;
            this.history = response.history;
            this.vacio = false;
        },
        cancelOrder(id) {
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.post('http://'+this.hostRest+'/crypto-trader/bitcoin/elimina', 
                {
                      valor: 0,
                      cantidad: 0,
                      accion: id
                }, 
                {
                    headers: {
                        'Content-type': 'application/json',
                        'crossDomain': true,
                        'Acces-Control-Allow-Origin': '*'
                    }
                }
            ).then(r => {
                var msg = "Orden eliminada exitosamente";
                this.tituloOpDenegada = "Operacion procesada";
                this.modalInfo = msg;
                this.$modal.show('op-denegada');  
                this.zape();                              
            });   
        },
        closeModal: function() {
          this.$modal.hide('op-denegada');
          this.zape();
        },
        openHistory: function() {
          this.zape();
          this.$modal.show('operaciones');
        },
        closeHistory: function() {
          this.$modal.hide('operaciones');
        },      
        checaVenta: function() {
          if(this.cantidadVenta*this.precioVenta<10) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(this.cantidadVenta*this.precioVenta)+") es menor a 10 " + this.minor;
            this.$modal.show('op-denegada');            
          } else if(this.data.b<this.cantidadVenta) {
            this.tituloOpDenegada = "Operacion inválida";
            this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.b + this.major;
            this.$modal.show('op-denegada');
          } else if(this.precioVenta<this.current*this.delta ) {
            this.tituloOpDenegada = "Operacion con riesgo";
            this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación "+this.precioVenta+" es menor a "+Math.floor(this.current*this.delta) + " " + this.minor;
            this.$modal.show('op-denegada');
          } else {
                  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                  axios.post('http://'+this.hostRest+'/crypto-trader/bitcoin/coloca', 
                      {
                          valor: this.precioVenta,
                          cantidad: this.cantidadVenta,
                          accion: "venta"
                      }, 
                      {
                          headers: {
                              'Content-type': 'application/json',
                              'crossDomain': true,
                              'Acces-Control-Allow-Origin': '*' 
                          }
                      }
                  ).then(r => {
                      var res = r.data.valor*r.data.cantidad;
                      var msg = "Acabas de colocar una posición de venta de " + r.data.cantidad + " BTC por un precio de " + r.data.valor + " cada uno.\nSi se ejecuta, recibirás " + Math.floor(res) + " USDT";
                      //alert(msg);
                      this.tituloOpDenegada = "Operacion procesada";
                      this.modalInfo = msg;
                      this.$modal.show('op-denegada');
                      this.zape();
                  });   
          }
        },
        zape : function() {
          this.hostWs = store.state.urlWs+":"+store.state.portWs;
          this.hostRest = store.state.urlRest+":"+store.state.portRest;

          console.log("RELOAD !!!!!!!!!!!!!!!!!!!!!!");
          //console.log("WebSocket ws://"+this.hostWs + "/WebSocket/balances  (o bien price)");
          //console.log("REST http://"+this.hostRest);


          var wsPrice = new WebSocket("ws://"+this.hostWs+"/WebSocket/price");
          wsPrice.onmessage = this.onMessagePrice;

          var wsocket3 = new WebSocket("ws://"+this.hostWs+"/WebSocket/balances");
          wsocket3.onmessage = this.onMessage3;
        },
        checaCompra: function() {            
              if(this.cantidadCompra*this.precioCompra<10) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que el monto total de la operacion ("+(this.cantidadCompra*this.precioCompra)+") es menor a 10 " + this.minor;
                this.$modal.show('op-denegada');            
              } else if(this.data.a/this.current<this.cantidadCompra) {
                this.tituloOpDenegada = "Operacion inválida";
                this.modalInfo = "Tu operación no fue aceptada debido a que sólo posees " + this.data.a/this.current + " " + this.major;
                this.$modal.show('op-denegada');
              } else {
                    if(this.precioCompra>(this.current*(2-this.delta)) ) {
                      this.tituloOpDenegada = "Operacion con riesgo";
                      this.modalInfo = "Tu operación no fue aceptada debido a que el valor de la operación " + this.precioCompra + " es mayor a " + Math.floor(this.current*(2-this.delta))+" "+this.minor;                
                      this.$modal.show('op-denegada');
                    } else {
                      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                      axios.post('http://'+this.hostRest+'/crypto-trader/bitcoin/coloca', 
                          {
                              valor: this.precioCompra,
                              cantidad: this.cantidadCompra,
                              accion: "compra"
                          }, 
                          {
                              headers: {
                                  'Content-type': 'application/json',
                                  'crossDomain': true,
                                  'Acces-Control-Allow-Origin': '*' 
                              },
                              mode: 'no-cors',
                              credentials: 'same-origin'
                          }
                      ).then(r => {
                          var res = r.data.valor*r.data.cantidad;
                          var msg = "Acabas de colocar una posición de compra de " + r.data.cantidad + " BTC por un precio de " + r.data.valor + " cada uno.\nSi se ejecuta, habrás gastado " + Math.floor(res) + " USDT";
                          this.tituloOpDenegada = "Operacion procesada";
                          this.modalInfo = msg;
                          this.$modal.show('op-denegada');                      
                      }); 
                      this.zape();                      
                    }
              }
        }         
    },
    mounted: function () {
          this.userName = store.state.usuario;
          if(this.userName=="") {
             console.log("usr is null redirecting to home page");
             router.push("/");
          } else {
          this.hostWs = store.state.urlWs+":"+store.state.portWs;
          this.hostRest = store.state.urlRest+":"+store.state.portRest;
          //console.log("WebSocket ws://"+this.hostWs + "/WebSocket/balances  (o bien price)");
          //console.log("REST http://"+this.hostRest);

          //var wsocket = new WebSocket("ws://"+this.hostWs+"/WebSocket/orders");
          //wsocket.onmessage = this.onMessage;

          var wsPrice = new WebSocket("ws://"+this.hostWs+"/WebSocket/price");
          wsPrice.onmessage = this.onMessagePrice;

          var wsocket3 = new WebSocket("ws://"+this.hostWs+"/WebSocket/balances");
          wsocket3.onmessage = this.onMessage3;
          }     
    },
    computed: {
          getUrl() {
            return store.state.urlWs;
          }
    }
}

</script>

