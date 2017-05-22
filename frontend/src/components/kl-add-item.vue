<template>
   <div class="modal fade" id="add-item">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">Add item</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-3">
                            <ul class="list-group">
                                <li>type:</li>
                                <li>aps:</li>
                                <li>min damage:</li>
                                <li>max damage:</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-group">
                                <li class="item">
                                <select v-model="type">
                                    <option v-for="tp in typeList">{{tp}}</option>
                                </select>
                                </li>
                                <li class="item">
                                    <select v-model.number="aps">
                                        <option v-for="aps in apsList">{{aps}}</option>
                                    </select>
                                </li>
                                <li class="item">
                                    <input type="number" v-model.number="minDmg" v-on:change="statControl">
                                </li>
                                <li class="item">
                                    <input type="number" v-model.number="maxDmg" v-on:change="statControl">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">Close</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="addItem">Add</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script src="./kl-add-item.js"></script>

<style>
div.modal.fade {
    background: none;
}
.modal-content{
    color: white;
    background: #12110F;
}
.modal-header {
    text-align: center;
    color: #F3E6D0;
    border-bottom: 1px solid #2A241C;
    background: #221F1C;
}
.modal-footer {
    border-top: none;
}
.modal-body>.row>div {
    padding: 0;
}
.modal-body>.row div:first-child {
    padding-left: 40px;
}
span {
    color: white;
}
input, select {
    height: 20px;
    width: 130px;
}
button.close:focus, select:focus, input:focus {
    outline: none;
}
li {
    list-style-type: none;
    margin-bottom: 10px;
}
li.item {
    color: #000000;
}
</style>
