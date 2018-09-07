<template>
    <div class="search">
        <SearchBox ref="searchBox" @queryTxt='queryTxt'/>
        <SearchShortcut :hotKeyList='hotKeyList'  @queryText='queryText' v-show="!query" :query='query'/>
        <Suggest :query='query' v-show="query" @listbeforeScroll='listbeforeScroll' @select='saveSearch' />
        <router-view/>
    </div>
</template>

<script>
import SearchBox from 'other/SearchBox'
import SearchShortcut from './components/SearchShortcut'
import Suggest from 'other/Suggest'
import Comfirm from 'other/Comfirm'
import {getHotKey} from 'api/search'
import {mapActions} from 'vuex'
import {searchMixin} from 'js/mixin'
export default {
    mixins: [searchMixin],
    components: {
        SearchBox,
        SearchShortcut,
        Suggest,
    },

    data () {
        return {
            hotKeyList:[],
            query:''
        }
    },

    methods: {
        _getHotKey() {
            getHotKey().then( res => {
                if (res.code == 0) {
                    this.hotKeyList = res.data.hotkey.slice(0,10)
                }
            })
        },
        // 搜索框派发事件
        queryTxt(txt) {
            this.query = txt
        },
        // 点击派发事件
        queryText(txt) {
            // 把搜索的关键字传递给搜索框
            this.$refs.searchBox.queryText(txt)
        },

        // 滚动键盘消失
        listbeforeScroll() {
            this.$refs.searchBox.blurInput()
        },
    },

    created () {
        this._getHotKey()
    },
}
</script>



