import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('loading', {
      isLoading: 'isLoadingIndicatorVisible',
      isLoadingIndeterminate: 'isLoadingIndicatorIndeterminate',
      percentageLoaded: 'percentageLoaded',
    }),
  },
  methods: {
    ...mapActions('loading', {
      setProgressPercentage: 'setProgressPercentage',
      showProgressBar: 'showProgress',
      hideProgressBar: 'hideProgress',
    }),
  },
}