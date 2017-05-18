<template>
    <div class="col-md-4">
        <h2>Items in Kladovka</h2>
        <ul class="list-group">
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-4">
                        <dl>
                            <dt>Wildwood</dt>
                            <dd>type: sword</dd>
                            <dd>dmg: 10-15 (dps 12.5)</dd>
                            <dd>aps: 1.40</dd>
                            <dd>score: 125</dd>
                        </dl>
                    </div>
                    <div class="col-md-2 col-md-offset-6">
                        <button class="btn btn-default diablo" type="submit">delete</button>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-4">
                        <dl>
                            <dt>Earthshatter</dt>
                            <dd>type: mace</dd>
                            <dd>dmg: 145-266 (dps 246.5)</dd>
                            <dd>aps: 1.20</dd>
                            <dd>score: 5250</dd>
                        </dl>
                    </div>
                    <div class="col-md-2 col-md-offset-6">
                        <button class="btn btn-default diablo" type="submit">delete</button>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                 <div class="row">
                    <div class="col-md-4 col-md-offset-8">
                        <button class="btn btn-default diablo" type="submit">delete all</button>
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