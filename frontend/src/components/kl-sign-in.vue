<template>
   <div class="modal fade" id="sign-in" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                    <h4 class="modal-title">Sign in to Kladovka</h4>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-email">Email address: </label>
                            <input class="col-md-6" type="text" id="kl-sign-in-email"><br>
                        </li>
                        <li class="row">
                            <label class="col-md-3 col-md-offset-3" for="kl-sign-in-pass">Password: </label>
                            <input class="col-md-6" type="password" id="kl-sign-in-pass">
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn diablo" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn diablo" data-dismiss="modal">Sign in</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script src="./kl-sign-in.js"></script>

<style>
#sign-in input {
    color:black;
    height: 20px;
    width: 180px;
    padding: 0;
}
#sign-in label {
    line-height: 20px;
}
</style>
