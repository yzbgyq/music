<template>
    <!-- 热门搜索关键词 -->
    <div class="shortcut-wrapper" ref="shortcuts">
        <Scroll class="shortcut" :data='shortcut' ref="scroll">
            <div>
                <div class="hot-key">
                    <div class="title">热门搜索</div>
                    <ul>
                        <li class="item" v-for="val in hotKeyList" :key="val.n" @click="searchText(val.k)">
                            <span>{{val.k}}</span>
                        </li>
                    </ul>
                </div>
                <Storage @selectVal='selectVal' @delectOne='delectSearchHistory' @delectAll='delectAll' :searchList='searchCache'/>
            </div>
        </Scroll>
        <Comfirm ref="comfirm" @ok='delectSearchHistoryAll'/>
    </div>
</template>

<script>
import Storage from 'pages/other/Storage'
import Scroll from 'pages/other/Scroll'
import Comfirm from 'other/Comfirm'
import {mapActions,mapGetters} from 'vuex'
import {playlistMixin} from 'js/mixin'

export default {
    mixins:[playlistMixin],
    props: {
        hotKeyList:{
            type: Array,
            default:[]
        },
        query: {
            type: String,
            default: ''
        }
    },
    
    components: {
        Scroll,
        Storage,
        Comfirm
    },
    
    computed: {
        ...mapGetters(['searchCache']),

        shortcut() {
            return this.hotKeyList.concat(this.searchCache)
        }
    },

    methods: {
        searchText(txt) {
            this.$emit('queryText',txt)
        },

        selectVal(val) {
            this.$emit('queryText',val)
        },
        ...mapActions(['delectSearchHistory','delectSearchHistoryAll']),

        // 删除全部
        delectAll() {
            this.$refs.comfirm.showComf()
        },
        handlePlaylist(playlist) {
            console.log(1144545);
            
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.shortcuts.style.bottom = bottom
            this.$refs.scroll.refresh()
        },

    },

    watch: {
        query(newQuery) {
            if (!newQuery) {
                setTimeout(() => {
                    this.$refs.scroll.refresh()
                },20)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .shortcut-wrapper
        position: absolute;
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

