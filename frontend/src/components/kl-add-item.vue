<template>
   <div class="modal fade" id="add-item" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">Add item</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-2">
                            <ul class="list-group">
                                <li>Type:</li>
                                <li>Min damage:</li>
                                <li>Max damage:</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-group">
                                <li class="item">
                                <select v-model="type" class="kl-type-input">
                                    <option v-for="tp in typeList" v-bind:value="tp">{{tp}}</option>
                                </select>
                                </li>
                                <li class="item">
                                    <input type="number" class="kl-minDmg-input" v-model.number="minDmg" v-on:change="statControl">
                                </li>
                                <li class="item">
                                    <input type="number" class="kl-maxDmg-input" v-model.number="maxDmg" v-on:change="statControl">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">Close</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="addItem" v-focus="focused" v-on:focus="focused=true" v-on:blur="focused=false">Add</button>
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
