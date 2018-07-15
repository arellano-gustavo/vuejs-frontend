import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sender:'',
  	usuario:'',
  	urlWs:'13.57.5.179',
  	portWs:'10002',
  	urlRest:'',
  	portRest:''
  },
  mutations: {
  	setState(state, data) {
  		state.sender = data.sender;
  		state.usuario = data.usua;
  		state.urlRest = data.ip;
  		state.portRest = data.port;
  	}
  }
})