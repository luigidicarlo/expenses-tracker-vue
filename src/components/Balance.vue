<template>
  <div class="card-footer">
    <h3 class="text-center">
      Balance:
      <span :class="`text-${balance >= 0 ? 'success' : 'danger'}`">
        {{ balance.toFixed(2) }}
      </span>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    balance: Number,
  },
};
</script>

<style scoped>
h3 {
  user-select: none;
}
</style>