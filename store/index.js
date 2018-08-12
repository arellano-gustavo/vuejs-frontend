import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sender:'',
  	usuario:'',
  	urlRest:'',
  	portRest:'',
		urlWs: '',
		portWs: ''
  },
  mutations: {
  	setState(state, data) {
  		state.sender = data.senderIn;
			state.usuario = data.usuarioIn;
  		state.urlRest = data.urlRestIn;
  		state.portRest = data.portRestIn;
			state.urlWs = data.urlWsIn;
      state.portWs = data.portWsIn;
  	}
  }
})