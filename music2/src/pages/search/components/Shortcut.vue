<template>
    <!-- 热门搜索关键词 -->
    <div class="shortcut-wrapper">
        <div class="shortcut">
            <div>
                <div class="hot-key">
                    <div class="title">热门搜索</div>
                    <ul>
                        <li class="item" v-for="val in hotKeyList" :key="val.n" @click="searchText(val.k)">
                            <span>{{val.k}}</span>
                        </li>
                    </ul>
                </div>
                <Storage @selectVal='selectVal' @delectOne='delectSearchHistory' @delectAll='delectSearchHistoryAll'/>
            </div>
        </div>
    </div>
</template>

<script>
import Storage from 'pages/other/Storage'
import Scroll from 'pages/other/Scroll'
import {mapActions} from 'vuex'
export default {
    props: {
        hotKeyList:{
            type: Array,
            default:[]
        }
    },
    
    components: {
        Scroll,
        Storage
    },

    methods: {
        searchText(txt) {
            this.$emit('queryText',txt)
        },

        selectVal(val) {
            this.$emit('queryText',val)
        },
        ...mapActions(['delectSearchHistory','delectSearchHistoryAll'])
    }
}
</script>

<style lang="stylus" scoped>
    .shortcut-wrapper
        position: fixed;
        top: 356px;
        bottom: 0;
        width: 100%;
        .shortcut
            height 100%
            overflow hidden
            .hot-key
                margin: 0 40px 40px;
                .title
                    margin-bottom: 40px;
                    font-size: 28px;
                    color: hsla(0,0%,100%,.5);
                .item
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 0 40px 20px 0;
                    border-radius: 12px;
                    background: #333;
                    font-size: 28px;
                    color: hsla(0,0%,100%,.3);
</style>

