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
                  <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="cantidadVenta">Password</label>
                  <input type="password" class="form-control" />
                </div>        
              </div>
              <div class="col-sm-12" style="text-align: center;">
                <router-link to="/more" class="btn btn-success">Ingresar al sistema</router-link>
              </div>
        </div>
      </div>
    </div> 
  </div>
</template>


