<template>
    <div class="rank" ref="rank">
        <Scroll class="toplist" :data='songList && songList' ref="scroll">
            <ul>
                <li class="item" v-for="val in songList" :key='val.topID' @click="rankMusic(val.topID)">
                    <div class="icon"><img :src="val.pic_v12" width="100" height="100" alt="" srcset=""></div>
                    <ul class="songlist">
                        <li class="song" v-for="(item,index) in val.songlist.slice(0,3)" :key='index' >
                           <span>{{index + 1}}</span>
                           <span>{{item.songname}} -- {{item.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </Scroll>
        <router-view/>
    </div>
</template>

<script>
import Scroll from 'pages/other/Scroll'
import {getRank} from 'api/rank'
import {playlistMixin} from 'js/mixin'
export default {
    mixins:[playlistMixin],
    data() {
        return {
            songList:[],
        }
    },
    components: {
        Scroll,
    },

    created() {
      getRank().then(res => {
          console.log(res);
          this.songList = res.List
      })
    },
    
    methods: {
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.rank.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        
        rankMusic(item) {
            console.log(item);
            
        }
    }
}
</script>

<style lang="stylus" scoped>
 .rank
    position: fixed;
    width: 100%;
    top: 176px;
    bottom: 0;
    .toplist
        height: 100%;
        overflow: hidden;
        .item
            display flex
            margin: 0 40px
            padding-top: 40px
            height: 200px
            .icon
                flex: 0 0 200px;
                width: 200px;
                height: 200px;
            .songlist
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 40px;
                height: 200px;
                overflow: hidden;
                background: #333;
                color: hsla(0,0%,100%,.3);
                font-size: 24px;    
                .song
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 52px;

</style>

