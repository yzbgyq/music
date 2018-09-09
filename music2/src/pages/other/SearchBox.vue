<template>
    <div class="search-box-wrapper">
        <div class="search-box">
            <i class="icon-search"></i>
            <input ref="query" type="text" :placeholder="placeholder" v-model="query" class="box">
            <i class="icon-dismiss" v-show="query" @click="clearQuery"></i>
        </div>
    </div>
</template>

<script>
import {throttle} from 'js/utils'
export default {
    props:{
        placeholder:{
            type: String,
            default: '搜索歌曲、歌手'
        }
    },

    data() {
        return {
            query:''
        }
    },
    
    methods: {
        clearQuery() {
            this.query = ''
            this.$emit('queryTxt',this.query)
        },
        
        queryText(txt) {
            this.query = txt
        },

        blurInput() {
            this.$refs.query.blur()
        }
        
    },
    
    created () {
        // this.$watch('query',debounce((newQuery) => {
        //     if (this.query) {
        //         this.$emit('queryTxt',newQuery)
        //     }
        // },500))
        this.$watch('query',throttle((newQuery) => {
            if (this.query) {
                this.$emit('queryTxt',newQuery)
            }
        },500,1000))

        // this.$watch('query',newQuery => {
        //     if (this.query) {
        //         this.$emit('queryTxt',newQuery)
        //     }
        // })
    },


}
</script>

<style lang="stylus" scoped>
    .search-box-wrapper
        margin 40px
        .search-box
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            padding: 0 6px;
            height: 80px;
            background: #333;
            border-radius: 12px;
            .icon-search
                font-size: 48px;
                color: #eee;
            .box
                flex: 1;
                margin: 0 10px;
                line-height: 36px;
                background: #333;
                color: #fff;
                font-size: 28px;
                outline: 0;    
                height: 60px;
            .icon-dismiss
                color: #eee;
                font-size 32px
                margin-right 20px
</style>
