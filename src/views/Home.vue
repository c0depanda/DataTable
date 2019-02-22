<template>
    <div class="home">
        <DataTable/>
    </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/datatable.vue";

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

export default {
    name: "home",
    components: {
        DataTable
    },
    data() {
        return {
            payments: "",
            value: ""
        };
    },
    computed: {
        dataBase() {
            return db.collection("payments");
        }
    },

    created() {
        // this.fetchData();
        // this.setData();
        this.parseDocument();
    },

    methods: {
        fetchData() {
            this.dataBase.get().then(response => {
                this.payments = response.data();
            });
        },

        setData() {
            this.dataBase.set({
                id: "adhahda",
                descriptioin: "ahahdhahdha",
                amount: "1234",
                date: "ahdh23234"
            });
        },

        parseDocument() {
            Papa.parse('https://docs.google.com/spreadsheets/d/1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE/export?format=csv&id=1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE&gid=1376887707', {
                download: true,
                complete: result => {
                    let tableHeaders = [result.data[0][0].toLowerCase(), result.data[0][1].toLowerCase(), result.data[0][2].toLowerCase(), result.data[0][3].toLowerCase(), result.data[0][4].toLowerCase()]
                    console.log(tableHeaders);

                    result.data.forEach(element => {
                        // console.log(element[0]);
                        this.dataBase.doc(element[0]).set({
                            [tableHeaders[0]] : element[0],
                            [tableHeaders[1]] : element[1],
                            [tableHeaders[2]] : element[2],
                            [tableHeaders[3]] : element[3],
                            [tableHeaders[4]] : element[4],
                        });
                    });
                }
            });
        }
    }
};
</script>
