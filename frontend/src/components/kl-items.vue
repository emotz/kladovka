<template>
    <div class="col-md-4">
        <h2>Items in Kladovka</h2>
        <ul class="list-group">
            <li class="list-group-item" v-for="(item, index) in items">
                <div class="row">
                    <div class="col-md-4">
                        <dl>
                            <dt>item</dt>
                            <dd>type: {{ item.type }}</dd>
                            <dd>dps: {{ item.dps }}</dd>
                            <dd>hui: {{ item.hui }}</dd>
                        </dl>
                    </div>
                    <div class="col-md-2 col-md-offset-6">
                        <button class="btn btn-default diablo" type="submit" v-on:click="deleteItem(item._id, index)">delete</button>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                 <div class="row">
                    <div class="col-md-4 col-md-offset-8">
                        <button class="btn btn-default diablo" type="submit" v-on:click="deleteAll">delete all</button>
                        <button class="btn btn-default diablo" type="submit">add item</button>
                     </div>
                </div>
            </li>
        </ul>       
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
.btn-default  {
    border: 1px solid #211b14;
    color: #ad835a;
    background: #000000;
}
.btn-default:hover {
    border: 1px solid #332D24;
    color: #F3E6D0;
    background: #201A11;
}
.btn-default:focus {
    outline: none;
    border: 1px solid #332D24;
    color: #ad835a;
    background: #000000;
}
.btn-default.diablo:active{
    outline: none;
    border: 1px solid #332D24;
    color: #F3E6D0;
    background: #100D08;
}
</style>