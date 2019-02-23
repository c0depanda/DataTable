import Vue from 'vue'
import Vuex from 'vuex'
import { reject } from 'q';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// initialize your firebase app
firebase.initializeApp({
    apiKey: "AIzaSyCJgHkwxIhcl0sWOGaQgpQ4JKAbGH5xAvE",
    authDomain: "britecode-b1fdf.firebaseapp.com",
    projectId: "britecode-b1fdf"
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
