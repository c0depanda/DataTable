<template>
    <div class="home">
        <DataTable :action="true" :actionFields="['description']" :tableData="payments" :tableFields="['name', 'amount', 'description', 'date']" :tableHeader="['name', 'amount', 'description', 'date']" sortBy="date" />
    </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/datatable.vue";

export default {
    name: "home",
    components: {
        DataTable
    },
    data() {
        return {
            value: ""
        };
    },
    computed: {
        payments() {
            return this.$store.state.storeItems;
        }
    },

    created() {
        this.$store.dispatch("fetchStoreItems");
        // this.parseDocument();
    },

    methods: {
        // Parse CSV and upload to Firebase
        parseDocument() {
            Papa.parse("https://docs.google.com/spreadsheets/d/1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE/export?format=csv&id=1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE&gid=1376887707", {
                download: true,
                complete: result => {
                    let tableHeaders = [result.data[0][0].toLowerCase(), result.data[0][1].toLowerCase(), result.data[0][2].toLowerCase(), result.data[0][3].toLowerCase(), result.data[0][4].toLowerCase()];
                    console.log(tableHeaders);
                    result.data.forEach(element => {
                        if (element[0] == "ID") {
                        } else {
                            db.collection("payments")
                                .doc(element[0])
                                .set({
                                    [tableHeaders[0]]: element[0],
                                    [tableHeaders[1]]: element[1],
                                    [tableHeaders[2]]: element[2],
                                    [tableHeaders[3]]: element[3],
                                    [tableHeaders[4]]: parseFloat(element[4])
                                });
                        }
                    });
                }
            });
        }
    }
};
</script>

<style>
.home {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
    padding-bottom: 100px;
}
</style>

