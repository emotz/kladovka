<template>
    <div class="col-md-4">
        <h2>{{ $t('list.title') }}</h2>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in items" v-bind:key="index">
                <div class="row">
                    <div class="col-xs-8">
                        <dl>
                            <dt>{{ $t('item.name')}}</dt>
                            <dd>{{ $t('item.type')}}: {{ item.type }}</dd>
                            <dd>{{ $t('item.minDmg')}}: {{ item.minDmg }}</dd>
                            <dd>{{ $t('item.maxDmg')}}: {{ item.maxDmg }}</dd>
                            <dd>{{ $t('item.aps')}}: {{ item.aps }}</dd>
                            <dd>{{ $t('item.dps')}}: {{ item.dps }}</dd>
                        </dl>
                    </div>
                    <div class="col-xs-4">
                        <button class="btn diablo" type="button" v-on:click="deleteItem(item._id, index)">{{ $t('list.buttonDelete') }}</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="manipulate-all">
            <button class="btn diablo" type="button" data-toggle="modal" data-target="#delete-all">{{ $t('list.buttonDeleteAll') }}</button>
            <button class="btn diablo" type="button" data-toggle="modal" data-target="#add-item" v-on:click="focusAddItem=true">{{ $t('list.buttonAddItem') }}</button>
        </div>
        <kl-delete-all v-on:deleteAll="deleteAll"></kl-delete-all>       
        <kl-add-item v-on:addItem="addItem" v-bind:focusProp="focusAddItem"></kl-add-item>       
    </div>
</template>

<script src="./kl-items.js"></script>

<style>

h2 {
    text-align: center;
    color: #F3E6D0
}
.list-group-item  {
    color: white;
    background: #12110F;
    border: 1px solid #2A241C; 
}
.col-xs-4, .manipulate-all {
    text-align: right;
}
.manipulate-all {
    padding-right: 15px;
    margin-bottom: 20px;
}
</style>