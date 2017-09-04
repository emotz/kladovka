<template>
    <header v-if="!user" class="row">
        <div  class="col-md-4 col-md-offset-6">
            <button type="button" class="btn diablo" data-toggle="modal" data-target="#sign-in">{{ $t('header.signIn') }}</button>
            <button type="button" class="btn diablo" data-toggle="modal" data-target="#sign-up">{{ $t('header.signUp') }}</button>
        </div>
        <kl-sign-in v-on:signIn="signIn"></kl-sign-in>
        <kl-sign-up v-on:signIn="signIn"></kl-sign-up>
    </header>
    <header v-else class="row">
         <div class="col-md-2 col-md-offset-7">
            <span>{{ $t('header.hello') }}</span>
            <span class="name">{{user}}</span>
         </div>
         <div class="col-md-1 col">
            <button type="button" class="btn diablo" v-on:click="signOut">{{ $t('header.signOut') }}</button>
        </div>
    </header>
</template>

<script src="./kl-header.js"></script>

<style>
header {
    color: white;
    background: rgba(18, 17, 15 , 0.8);
    height: 50px;
    line-height: 50px;
    vertical-align: center;
}
span.name{
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px
}
header{
    text-align: right
}
</style>
