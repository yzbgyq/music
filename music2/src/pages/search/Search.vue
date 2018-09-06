<template>
    <div class="search">
        <SearchBox ref="searchBox" @queryTxt='queryTxt'/>
        <Shortcut :hotKeyList='hotKeyList'  @queryText='queryText' v-show="!query"/>
        <Suggest :query='query' v-show="query" @listbeforeScroll='listbeforeScroll' @select='saveSearch'/>
    </div>
</template>

<script>
import SearchBox from 'other/SearchBox'
import Shortcut from './components/Shortcut'
import Suggest from 'other/Suggest'
import {getHotKey} from 'api/search'
import {mapActions} from 'vuex'
export default {
    components: {
        SearchBox,
        Shortcut,
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

        // 保存搜索结果到缓存
        saveSearch() {
            this.saveSearchHistory(this.query)
        },

        ...mapActions(['saveSearchHistory'])
    },

    created () {
        this._getHotKey()
    },
}
</script>



