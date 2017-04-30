<template>
    <span>
        <b-icon :icon="icon" pack="fa"></b-icon>
        {{ data }}
    </span>
</template>

<script>
  export default {
    props: {
      data: String
    },
    computed: {
      icon () {
        switch (this.data) {
          case 'Male':
          case 'M':
            return 'mars'
          case 'Female':
          case 'F':
            return 'venus'
          default: return 'question'
        }
      }
    }
  }
</script>
