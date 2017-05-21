<template>
    <div class="col-lg-4">
        <h2>Items in Kladovka</h2>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in items">
                <div class="row">
                    <div class="col-lg-4">
                        <dl>
                            <dt>item</dt>
                            <dd>type: {{ item.type }}</dd>
                            <dd>aps: {{ item.aps }}</dd>
                            <dd>min damage: {{ item.minDmg }}</dd>
                            <dd>max damage: {{ item.maxDmg }}</dd>
                        </dl>
                    </div>
                    <div class="col-lg-2 col-lg-offset-6">
                        <button class="btn diablo" type="button" v-on:click="deleteItem(item._id, index)">Delete</button>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                 <div class="row">
                    <div class="col-lg-5 col-lg-offset-7">
                        <button class="btn diablo" id="del" type="button" v-on:click="deleteAll">Delete all</button>
                        <button class="btn diablo" type="button" data-toggle="modal" data-target="#add_item">Add item</button>
                     </div>
                </div>
            </li>
        </ul>
        <kl-modal v-on:added="added"></kl-modal>       
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
dd {
    padding-left: 10px;
}
li:last-child {
    border-top: none;
}
button#del {
    margin-left: 45px;
}
</style>