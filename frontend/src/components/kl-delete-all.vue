<template>
   <div class="modal fade" id="delete-all" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">{{ $t('deleteAll.title') }}</h4>
                </div>
                <div class="modal-body">
                    {{ $t('deleteAll.content') }}Kladovka?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">{{ $t('deleteAll.buttonCancel') }}</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="deleteAll">{{ $t('deleteAll.buttonOk') }}</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script src="./kl-delete-all.js"></script>

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
