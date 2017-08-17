<template>
   <div class="modal fade" id="sign-up" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">{{ $t('signUp.title') }}</h4>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-email">{{ $t('signUp.email') }}</label>
                            <input class="col-md-6" v-model="email" type="text" id="kl-sign-in-email"><br>
                        </li>
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-name">{{ $t('signUp.name') }}</label>
                            <input class="col-md-6" v-model="name" type="text" id="kl-sign-in-name"><br>
                        </li>
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-pass">{{ $t('signUp.password') }}</label>
                            <input class="col-md-6" v-model="password" type="password" id="kl-sign-in-pass">
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">{{ $t('signUp.buttonCancel') }}</button>
                    <button type="button" class="btn diablo" data-dismiss="modal" v-on:click="signUp">{{ $t('signUp.buttonOk') }}</button>
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
