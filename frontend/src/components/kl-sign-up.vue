<template>
   <div class="modal fade" id="sign-up" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">Sign up for Kladovka</h4>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-email">Email address: </label>
                            <input class="col-md-6" v-model="email" type="text" id="kl-sign-in-email"><br>
                        </li>
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-name">User name: </label>
                            <input class="col-md-6" v-model="name" type="text" id="kl-sign-in-name"><br>
                        </li>
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-pass">Password: </label>
                            <input class="col-md-6" v-model="password" type="password" id="kl-sign-in-pass">
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="signUp">Sign up</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script src="./kl-sign-up.js"></script>

<style>
#sign-up input {
    color:black;
    height: 20px;
    width: 180px;
    padding: 0;
}
#sign-up label {
    line-height: 20px;
}
</style>
