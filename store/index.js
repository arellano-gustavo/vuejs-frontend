import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sender:'',
  	usuario:'',
  	urlWs:'',
  	portWs:'',
  	urlRest:'',
  	portRest:''
  },
  mutations: {
  	setState(state, data) {
  		state.sender = data.sender;
  		state.usuario = data.usua;
  		state.urlRest = data.ip;
  		state.portRest = data.port;
      state.urlWs = data.ip;
      state.portWs = data.port-1;
  	}
  }
})