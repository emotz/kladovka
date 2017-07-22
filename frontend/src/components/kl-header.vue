<template>
    <header class="row">
        <div class="col-md-4 col-md-offset-8">
            <a href="#">Sign in</a>
            <span>or</span>
            <a href="#">Sign up</a>
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
a, a:hover, a:focus, a:visited{
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px
}
header div.col-md-4.col-md-offset-8{
    text-align: right
}
</style>
