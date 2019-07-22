<template>
  <div class="module-layout container-fluid no-gutters d-flex flex-column h-100">
    <div class="header row p-4 mh-25">
      <div class="col">
        <slot name="header" />
      </div>
    </div>
    <div class="content row flex-grow-1">
      <div class="col p-3">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.module-layout {

  .header {
    background: #F9FBFC;
    
    p {
      margin-bottom: 0;
    }
  }

  .content {
    background: #F3F3F3;
  }
}
</style>
