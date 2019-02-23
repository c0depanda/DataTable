import Vue from 'vue'
import Vuex from 'vuex'
import { reject } from 'q';
import firebase from 'firebase/app'
import 'firebase/firestore'

// initialize your firebase app
firebase.initializeApp({
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID
});

const db = firebase.firestore();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeItems: [],
    },
    mutations: {
        setStoreItems(state, value) {
            state.storeItems = value
        }
    },
    actions: {
        // Fetch Store Items
        fetchStoreItems({ commit }) {
            db.collection('payments').get().then(response => {
                console.log(response.docs);
                let items = []
                response.docs.forEach(item => {
                    console.log(item.data());
                    items.push(item.data());
                })
                // set storeitems
                commit('setStoreItems', items)
            })
        },

        // Update Store Item details
        updateStoreItems({ dispatch, commit }, request) {
            return new Promise((resolve, reject) => {
                // Update items
                db.collection('payments').doc(request.id).update(request.selectedFields).then((response) => {
                    dispatch('fetchStoreItems')
                    resolve();
                }).catch((error) => {
                    reject();
                })
            })
        }
    }
})
