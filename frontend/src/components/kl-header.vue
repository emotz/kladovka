<template>
    <header class="row">
        <div class="col-md-4 col-md-offset-7">
            <a href="#" data-toggle="modal" data-target="#sign-in">Sign in</a>
            <span>or</span>
            <a href="#" data-toggle="modal" data-target="#sign-up">Sign up</a>
        </div>
        <kl-sign-in></kl-sign-in>
        <kl-sign-up></kl-sign-up>
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
a, a:hover, a:focus, a:visited{
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px
}
header div.col-md-4.col-md-offset-7{
    text-align: right
}
</style>
