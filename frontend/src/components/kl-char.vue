<template>
    <div class="col-md-4 char">
        <h2>{{ $t('character.title') }}</h2>
        <ul class="list-group char-stats">
            <li class="row list-group-item">
                <label for="kl-char-critChance" class="col-md-5 col-md-offset-1">
                    {{ $t('character.stats.critChance') }} %
                </label>
                <input type="number" id="kl-char-critChance" class="col-md-5 col-md-offset-1">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-critDmg" class="col-md-5 col-md-offset-1">
                     {{ $t('character.stats.critDmg') }} %
                </label>
                <input type="number" id="kl-char-critDmg" class="col-md-5 col-md-offset-1">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-attackSpd" class="col-md-5 col-md-offset-1">
                    {{ $t('character.stats.attackSpd') }}
                </label>
                <input type="number" id="kl-char-attackSpd" class="col-md-5 col-md-offset-1">
            </li>
            <li class="row list-group-item">
                <label for="kl-char-dmg" class="col-md-5 col-md-offset-1">
                    {{ $t('character.stats.dmg') }}
                </label>
                <input type="number" id="kl-char-dmg" class="col-md-5 col-md-offset-1">
            </li>
        </ul>
        <div class="manipulate-all">
        <button class="btn diablo">{{ $t('character.buttonUpdate') }}</button>
        </div>
    </div>  
</template>

<script src="./kl-char.js"></script>

<style>
ul.char-stats {
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
