<template>
    <div class="shortcut" >
        <ul class="switches">
            <li v-for="(val,index) in switches" :key="val.id" class="switch-item" :class="{'active':index===currentIndex}" @click="switchItem(index)">{{val.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        switches: {
            type: Array,
            default: []
        },
        currentIndex: {
            type: Number,
            default: 0
        }
    },

    methods: {
        switchItem(index) {
            this.$emit('switchItem',index)
        }
    }
}
</script>

<style lang="stylus" scoped>
.shortcut
    .switches
        display: flex;
        align-items: center;
        width: 480px;
        margin: 0 auto;
        border: 1px solid #333;
        border-radius: 10px;
    .switch-item
        flex: 1;
        padding: 16px;
        text-align: center;
        font-size: 28px;
        color: hsla(0,0%,100%,.3);
    .active
        background: #333;
        color: #fff;
</style>

