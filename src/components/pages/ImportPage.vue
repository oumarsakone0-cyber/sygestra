<template>
    
    <div class="vs-card--content">
        <div data-v-a200f080="" style="width: 100%; display: inline-block; margin-bottom: -15px; color: black; font-size: 20px;">
            <span data-v-a200f080="" style="color: rgb(195, 45, 57);">
                <i data-v-a200f080="" class="vs-icon notranslate icon-scale material-icons" style="font-size: 18px;">
                    home
                </i> DOSSIERS /
            </span> 
            IMPORT 
            <button data-v-a200f080="" type="button" name="button" class="vs-component vs-button vs-button-null vs-button-filled includeIcon" style="background: rgb(195, 45, 57); width: 150px; padding: 5px; position: absolute;">
                <span class="vs-button-backgroundx vs-button--background" style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s, height 0.3s, opacity 0.3s;"></span><i class="vs-icon notranslate icon-scale vs-button--icon material-icons null" style="order: 0; margin-right: 5px; margin-left: 0px;">list</i>
                <span class="vs-button-text vs-button--text">Historique</span>
                <span class="vs-button-linex" style="top: auto; bottom: -2px; background: rgb(195, 45, 57); left: 50%; transform: translate(-50%);"></span>
            </button>
            <div data-v-a200f080="" class="el-date-editor el-range-editor el-input__inner el-date-editor--daterange">
                <i class="el-input__icon el-range__icon el-icon-date"></i>
                <input autocomplete="off" placeholder="Date de début" name="" class="el-range-input">
                <span class="el-range-separator">à</span><input autocomplete="off" placeholder="Date de fin" name="" class="el-range-input">
                <i class="el-input__icon el-range__close-icon"></i></div><button data-v-a200f080="" type="button" class="el-button el-button--default is-circle"><!----><i class="el-icon-search"></i><!----></button>
            </div>
            <span data-v-a200f080="" style="float: right; margin-right: 150px;"></span>
        </div>
</template>



<script>
export default {
    name: "ImportPage",
};

</script>