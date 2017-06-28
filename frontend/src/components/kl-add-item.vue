<template>
   <div class="modal fade" id="add-item" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">{{ $t('addItem.title') }}</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-10 col-md-offset-2">
                            <ul class="list-group">
                                <li class="row">
                                    <label for="addItemType" class="col-md-6">
                                        {{ $t('item.type') }}
                                    </label>
                                    <div class="col-md-6">
                                        <select v-model="item.type" class="kl-type-input item" id="addItemType">
                                            <option v-for="(tp, index) in typeList" v-bind:key="index" v-bind:value="tp.value">{{tp.trans}}</option>
                                        </select>
                                    </div>
                                </li>
                                <li class="row">
                                    <label for="addItemMinDmg" class="col-md-6">
                                        {{ $t('item.minDmg') }}
                                    </label>
                                    <div class="col-md-6">
                                        <input type="number" class="kl-minDmg-input item" id="addItemMinDmg" v-model.number="item.minDmg" v-on:change="dmgControl" >
                                    </div>
                                </li>
                                <li class="row">
                                    <label for="addItemMaxDmg" class="col-md-6">
                                        {{ $t('item.maxDmg') }}
                                    </label>
                                    <div class="col-md-6">
                                        <input type="number" class="kl-maxDmg-input item" id="addItemMaxDmg" v-model.number="item.maxDmg" v-on:change="dmgControl">
                                    </div>
                                </li>
                                <li class="row">
                                    <label for="addItemCritChance" class="col-md-6">
                                        {{ $t('item.critChance') }} %
                                    </label>
                                    <div class="col-md-6">
                                        <input type="number" class="kl-critChance-input item" id="addItemCritChance" v-model.number="item.critChance" v-on:change="critChanceControl">
                                    </div>
                                </li>
                                <li class="row">
                                    <label for="addItemCritDmg" class="col-md-6">
                                        {{ $t('item.critDmg') }} %
                                    </label>
                                    <div class="col-md-6">
                                        <input type="number" class="kl-critDmg-input item" id="addItemCritDmg" v-model.number="item.critDmg" v-on:change="critDmgControl">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">{{ $t('addItem.buttonCancel') }}</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="addItem" v-focus="focused" v-on:focus="focused=true" v-on:blur="focused=false">{{ $t('addItem.buttonOk') }}</button>
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
    padding-left: 20px;
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
input.item, select.item {
    color: #000000;
}
label {
    font-weight: normal
}
</style>
