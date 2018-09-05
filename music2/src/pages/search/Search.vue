<template>
    <div class="search">
        <SearchBox ref="searchBox" @queryTxt='queryTxt'/>
        <Shortcut :hotKeyList='hotKeyList' @queryText='queryText' v-show="!query"/>
        <Suggest :query='query' v-show="query"/>
    </div>
</template>

<script>
import SearchBox from 'other/SearchBox'
import Shortcut from './components/Shortcut'
import Suggest from 'other/Suggest'
import {getHotKey} from 'api/search'
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
        }
    },

    created () {
        this._getHotKey()
    },
}
</script>

<style>

</style>
