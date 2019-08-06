export default {
    computed: {
        getPoolName() {
            return this.$route.params.poolName + "ds"
        },
    }
}