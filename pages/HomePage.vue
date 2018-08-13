<template>
  <div class="container">
    <div class="card" style="width: 480px;">
      <div class="card-header">
            <div class="row">
                <div class="col-sm-6">
                    <label>Login al sistema !!!</label>
                </div>
                <div class="col-sm-6" style="text-align: right;">
                    <label>(v2.0)</label>
                </div>          
            </div>
      </div>
      <div class="card-body">
        <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="precioVenta">Usuario</label>
                  <input type="text" class="form-control" v-model="usr" />
                </div>
                <div class="form-group">
                  <label for="cantidadVenta">Password</label>
                  <input type="password" class="form-control" v-model="psw" />
                </div>        
              </div>
              <div class="col-sm-12" style="text-align: center;">
                <button @click="checkCredentials" class="btn btn-success">Ingresar al sistema</button>
              </div>
        </div>
      </div>
    </div> 


<modal 
    name="mensaje-login" 
    :clickToClose="false" 
    :reset="true"          
    :width="480"
    :height="260">
    <div class="card">
      <div class="card-header">
        Advertencia del sistema
      </div>
      <div class="card-body">
        <h5 class="card-title">Error de ingreso al sistema</h5>
        <p class="card-text">{{ msgErr }}</p>
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
import router from '../router'
import store from '../store'

export default {
    data: function () {
        return {
          usr: "",
          psw: "",
          msgErr: ""
        }
    },
    created() {
    },
    methods: {
          closeModal: function() {
              this.$modal.hide('mensaje-login');
          },     
          checkCredentials: function() {
              axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';            
              axios.post('http://54.241.82.49:10001/crypto-trader/bitcoin/login', 
              {
                  usuario: this.usr,
                  password: this.psw
              }, 
              {
                  headers: {
                      'Content-type': 'application/json',
                      'crossDomain': true,
                      'Acces-Control-Allow-Origin': '*' 
                  }
              }
          ).catch(error => {
              this.msgErr = "Ha ocurrido un error de red: " + error;
              this.$modal.show('mensaje-login');            
          }).then(response => {
            if(response.data.succeed=='true') {
              console.log(response.data);
              store.commit('setState',   {
                senderIn:this.usr,
                usuarioIn:response.data.name,
                urlRestIn:response.data.ip,
                portRestIn:response.data.port,
                urlWsIn:response.data.ip,
                portWsIn:"6159" 
                //port:response.data.port, 
              });
              router.push('/trade');            
            } else {
              this.msgErr = "La combinación Usuario/password es errónea";
              this.$modal.show('mensaje-login');
            }
          });
        }      
    },
    mounted: function () {
    }
}

</script>
