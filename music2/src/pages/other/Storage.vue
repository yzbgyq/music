<template>
    <!-- 搜索历史 -->
    <div class="search-history" v-show="searchCache && searchCache.length">
        <h1 class="title">
            <span class="text" @click="conf">搜索历史</span>
            <span class="clear" @click="delectAll"><i class="icon-clear"></i></span>
        </h1>
        <div class="search-list">
            <ul>
                <li class="search-item" v-for="(val,index) in searchCache.slice(0,5)" :key="index" @click="select(val)">
                    <span class="text">{{val}}</span>
                    <span class="icon" @click.stop="delectOne(val)"><i class="icon-delete"></i></span>
                </li>
            </ul>
        </div>
        <Comfirm :isShow='showComfirm'/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Comfirm from 'other/Comfirm'
export default {
    computed: {
        ...mapGetters(['searchCache'])
    },

    components: {
        Comfirm,
    },
    
    data() {
        return {
            showComfirm: false
        }
    },

    methods: {
        // 单项点击
        select(val) {
            this.$emit('selectVal',val)
        },

        // 删除单项
        delectOne(val) {
            this.$emit('delectOne',val)
        },

        // 删除全部
        delectAll() {
            this.$emit('delectAll')
        },

        conf() {
            console.log(1);
            this.showComfirm = true
        }
    }
}
</script>

<style lang="stylus" scoped>
    .search-history
        position: relative;
        margin: 0 40px;              
        .title
            display: flex;
            align-items: center;
            height: 80px;
            font-size: 28px;
            color: hsla(0,0%,100%,.5);  
            .text
                flex 1
            .clear
                position: relative;
                .icon-clear
                    font-size: 28px;
                    color: hsla(0,0%,100%,.3);
        .search-item
            display: flex;
            align-items: center;
            height: 80px;
            overflow: hidden;
            .text
                flex: 1;
                color: hsla(0,0%,100%,.5);
                font-size 28px
            .icon
                position relative    
                .icon-delete
                    font-size: 28px;
                    color: hsla(0,0%,100%,.3); 
</style>

