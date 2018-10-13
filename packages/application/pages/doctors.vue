<template>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  fetch ({store}) {
    store.commit('updatePageTitle', 'Doctors')
  }
}
</script>