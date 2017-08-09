<template>
    <header v-if="!user" class="row">
        <div  class="col-md-4 col-md-offset-6">
            <a href="#" data-toggle="modal" data-target="#sign-in">Sign in</a>
            <span>or</span>
            <a href="#" data-toggle="modal" data-target="#sign-up">Sign up</a>
        </div>
        <kl-sign-in v-on:signIn="signIn"></kl-sign-in>
        <kl-sign-up></kl-sign-up>
    </header>
    <header v-else class="row">
         <div class="col-md-4 col-md-offset-6">
            <span>Hello,</span>
            <span class="name">{{user}}!</span>
            <a href="#" v-on:click="signOut">Sign out</a>
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
a, a:hover, a:focus, a:visited, span.name{
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px
}
header div.col-md-4.col-md-offset-6{
    text-align: right
}
</style>
