<template>
    <div class="col-md-4 kl-char">
        <h2>{{ $t('char.title') }}</h2>
        <ul class="list-group kl-char-stats">
            <li class="row list-group-item">
                <label for="kl-char-dmg-input" class="col-md-5 col-md-offset-1">
                    {{ $t('char.stats.dmg') }}
                </label>
                <input type="number" id="kl-char-dmg-input" class="col-md-5 col-md-offset-1" v-model.number="char.dmg" v-on:change="dmgControl">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-atkSpd-input" class="col-md-5 col-md-offset-1">
                    {{ $t('char.stats.atkSpd') }} %
                </label>
                <input type="number" id="kl-char-atkSpd-input" class="col-md-5 col-md-offset-1" v-model.number="char.atkSpd" v-on:change="atkSpdControl">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-critChance-input" class="col-md-5 col-md-offset-1">
                    {{ $t('char.stats.critChance') }} %
                </label>
                <input type="number" id="kl-char-critChance-input" class="col-md-5 col-md-offset-1" v-model.number="char.critChance" v-on:change="critChanceControl">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-critDmg-input" class="col-md-5 col-md-offset-1">
                     {{ $t('char.stats.critDmg') }} %
                </label>
                <input type="number" id="kl-char-critDmg-input" class="col-md-5 col-md-offset-1" v-model.number="char.critDmg" v-on:change="critDmgControl">
            </li>
        </ul>
        <div class="manipulate-all">
        <button class="btn diablo" v-on:click="updateChar">{{ $t('char.buttonUpdate') }}</button>
        </div>
    </div>  
</template>

<script src="./kl-char.js"></script>

<style>
ul.kl-char-stats {
    width: 95%;
    margin-left: 15px
}
li.row.list-group-item {
    color: white;
    background: #12110F;
    border: none;
}
li.row.list-group-item input{
    color: black;
    height: 20px;
    width: 130px;
    padding: 0
}
</style>
