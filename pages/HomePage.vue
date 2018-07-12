<template>
  <div class="container">
    <div class="card" style="width: 480px;">
      <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <label>Login al sistema</label>
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
        <p class="card-text">Combinación usuario/password errónea</p>
        <div style="text-align: right;">
          <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
        </div>
      </div>
    </div>
</modal>



  </div>
</template>




<script>
import router from '../router'
export default {
    data: function () {
        return {
          usr: "",
          psw: ""
        }
    },
    created() {
    },    
    methods: {
        closeModal: function() {
          this.$modal.hide('mensaje-login');
        },        
        checkCredentials: function() {
          var b00 = this.usr=="trader01" && this.psw=="hGt76rs";
          var b01 = this.usr=="trader02" && this.psw=="8hT4awq";
          var b02 = this.usr=="trader03" && this.psw=="jg&5ee1";
          var b03 = this.usr=="trader04" && this.psw=="aj75hh1";
          var b04 = this.usr=="trader05" && this.psw=="BgYtkkC";
          var b05 = this.usr=="trader06" && this.psw=="5sl0FF3";
          var b06 = this.usr=="trader07" && this.psw=="iuY7rrL";
          var b07 = this.usr=="trader08" && this.psw=="tm96Q2q";
          var b08 = this.usr=="trader09" && this.psw=="tG866aK";
          var b = b00 || b01 || b02 || b03 || b04 || b05 || b06 || b07 || b08;

          if(b) {
            router.push('/more');
          } else {
            //alert("Combinación usuario/password incorrecta !!!");
            this.$modal.show('mensaje-login');
          }
        }         
    },
    mounted: function () {
    }
}

</script>
