<template>
    <div class="col-md-4">
        <h2>Items in Kladovka</h2>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in items">
                <div class="row">
                    <div class="col-xs-8">
                        <dl>
                            <dt>item</dt>
                            <dd>type: {{ item.type }}</dd>
                            <dd>aps: {{ item.aps }}</dd>
                            <dd>min damage: {{ item.minDmg }}</dd>
                            <dd>max damage: {{ item.maxDmg }}</dd>
                            <dd>dps: {{ item.dps }}</dd>
                        </dl>
                    </div>
                    <div class="col-xs-4">
                        <button class="btn diablo" type="button" v-on:click="deleteItem(item._id, index)">Delete</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="footer-list">
            <button class="btn diablo" type="button" data-toggle="modal" data-target="#delete-all">Delete all</button>
            <button class="btn diablo" type="button" data-toggle="modal" data-target="#add-item" v-on:click="focusAddItem=true">Add item</button>
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
.col-xs-4, .footer-list {
    text-align: right;
}
.footer-list {
    padding-right: 15px;
    margin-bottom: 20px;
}
</style>