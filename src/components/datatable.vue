<template>
    <div class="hello">
        <!-- Table Data -->
        <div class="table table--padded">
            <!-- Table Head -->
            <div class="table__section table__section--head">
                <!-- table row -->
                <div class="table__row">
                    <!-- table header -->
                    <div :key="key" class="table__header" v-for="(title, key) in tableHeader">{{title | capitalize}}</div>
                    <!-- table header -->
                    <div class="table__header textRight" v-if="action">
                        <span class="visibilityNone">Action</span>
                    </div>
                </div>
            </div>
            <!-- Table body -->
            <div class="table__section table__section--body">
                <!-- table row -->
                <div :key="item.id" class="table__row" v-for="item in sortDataByValue">
                    <!-- table data -->
                    <div :key="key" class="table__data" v-for="(element, key) in tableFields">
                        <span v-if="element === 'date'">{{item[element] | date}}</span>
                        <span v-else>{{item[element]}}</span>
                    </div>
                    <!-- table data -->
                    <div class="table__data textRight" v-if="action">
                        <a @click.prevent="loadEditModal(item)" class="link link--blue">Edit</a>
                    </div>
                </div>
            </div>
        </div>

        <div aria-labelledby="editModal" class="modal fade" id="editModal" role="dialog" tabindex="-1">
            <!-- Modal Dialog -->
            <div class="modal__dialog modal__dialog--sm" role="document">
                <!-- Modal content -->
                <div class="modal__content">
                    <!-- Modal Body -->
                    <div class="modal__body modal__body--pad">
                        <form @submit.prevent="modifyField" class="form">
                            <div class="modal__body__top">
                                <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-13a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1m0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2" id="a"></path>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd">
                                        <circle cx="16" cy="16" fill="#BF0711" opacity=".409" r="16"></circle>
                                        <g transform="translate(6 6)">
                                            <circle cx="10" cy="10" fill="#FFF" r="9"></circle>
                                            <use fill="#BF0711" xlink:href="#a"></use>
                                        </g>
                                    </g>
                                </svg>
                                
                                <input type="text" v-model="des">
                            </div>
                            <div class="modal__body__bottom">
                                <div class="form__footer form__footer--flex">
                                    <button aria-label="Close" class="btn btn--flex btn--sm btn--primary" data-dismiss="modal" type="button">No</button>
                                    <button class="btn btn--flex btn--sm btn--danger" type="submit">Yes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const moment = require("moment");

export default {
    name: "datatable",
    props: ["tableData", "tableHeader", "sortBy", "tableFields", "action", "actionFields"],
    data() {
        return {
            selectedRow: "",
            selectedFields: {
                
            }
        };
    },

    filters: {
        capitalize: function(value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },

        date: function(item) {
            return moment(item).calendar(null, {
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                nextWeek: "Do MMM YYYY",
                lastDay: "[Yesterday]",
                lastWeek: "Do MMM YYYY",
                sameElse: "Do MMM YYYY"
            });
        }
    },

    computed: {
        // Return data by value
        sortDataByValue() {
            return this.tableData.sort((a, b) => {
                if (a[this.sortBy] < b[this.sortBy]) {
                    return 1;
                }
                if (a[this.sortBy] > b[this.sortBy]) {
                    return -1;
                }
                return 0;
            });
        }
    },

    methods: {
        // Select action row and load modal
        loadEditModal(value) {
            // Set the item into variable
            this.selectedRow = value;
            // Load Modal
            $("#editModal").modal("show");
        },

        // perform modify action on row
        modifyField() {
            // Set item to store
        },

        editdescription() {
            this.db
                .doc(this.selectedRow.id)
                .update({
                    description: this.des
                })
                .then(res => {
                    location.reload();
                });
        }
    }
};
</script>

<style lang="scss">
.table {
    display: table;
    width: 100%;
}
.table--padded {
    padding: 20px 20px 20px 20px;
}
.table__row {
    display: table-row;
    color: inherit;
    text-decoration: none;
}
.table__row:hover .table__data {
    background-color: #f2f4fd;
    box-shadow: inset 0 -1px 0 0 #e1e4fa;
}
.table__section--head {
    display: table-header-group;
    font-weight: 600;
}
.table__section--body {
    display: table-row-group;
}
.table__header,
.table__data {
    display: table-cell;
    vertical-align: middle;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #f1f1f3;
    padding: 20px 16px;
    cursor: pointer;
    text-align: left;
}
.table__header.table__checkbox,
.table__data.table__checkbox {
    width: 30px;
}
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal-open {
    overflow: hidden;
}
.modal-open .modal.in {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex !important;
    height: 100%;
    align-items: center;
}
.modal__dialog {
    position: relative;
    width: 100%;
    margin: 10px;
}
@media screen and (min-width: 768px) {
    .modal__dialog {
        width: 600px;
        margin: 30px auto;
    }
}
@media screen and (min-width: 768px) {
    .modal__dialog--sm {
        width: 360px;
    }
}
@media screen and (min-width: 992px) {
    .modal__dialog--lg {
        width: 620px;
    }
}
.modal.fade .modal__dialog {
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    -webkit-transform: scale(0.7);
    -ms-transform: scale(0.7);
    -o-transform: scale(0.7);
    transform: scale(0.7);
    opacity: 0;
}
.modal.in .modal__dialog {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 1;
}
.modal__content {
    position: relative;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 2px 16px 0 rgba(33, 43, 54, 0.08), 0 31px 41px 0 rgba(33, 43, 54, 0.2);
}
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #f6f2f3;
}
.modal-backdrop.fade {
    filter: alpha(opacity=0);
    opacity: 0;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.modal-backdrop.in {
    filter: alpha(opacity=53);
    opacity: 0.53;
}
.modal__header {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
}
.modal__header .close {
    margin-top: -2px;
}
.modal__title {
    margin: 0;
    line-height: 1.5;
    font-size: 16px;
    font-weight: 600;
}
.modal__body {
    position: relative;
}
.modal__footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
}
.modal__footer .btn + .btn {
    margin-bottom: 0;
    margin-left: 5px;
}
.modal__footer .btn-group .btn + .btn {
    margin-left: -1px;
}
.modal__footer .btn-block + .btn-block {
    margin-left: 0;
}
.modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
}

.close {
    border: none;
    background-color: transparent;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 3;
}
.close:active,
.close:focus {
    outline: none;
    box-shadow: none;
}
</style>
