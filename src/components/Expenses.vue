<template>
  <div class="filters mt-3">
    <p class="text-muted m-0">
      <small>Filter by:</small>
    </p>
    <div class="d-flex align-items-center justify-content-between">
      <button
        class="btn btn-sm btn-success text-white"
        @click="$emit('onexpensesfilter', 'All')"
      >
        All
      </button>
      <button
        class="btn btn-sm btn-warning text-body"
        @click="$emit('onexpensesfilter', 'Cash')"
      >
        Cash
      </button>
      <button
        class="btn btn-sm btn-primary text-white"
        @click="$emit('onexpensesfilter', 'Zelle')"
      >
        Zelle
      </button>
    </div>
  </div>
  <div class="card my-4">
    <div class="card-body">
      <div v-if="showControls">
        <div class="d-flex">
          <i class="fas fa-info mt-1 me-3 text-info"></i>
          <p class="text-center text-muted">
            <small>Double click on expense to delete it</small>
          </p>
        </div>
        <ul class="list-group list-none">
          <li
            class="list-group-item"
            v-for="expense in expenses"
            :key="expense.id"
            @dblclick="$emit('onexpensedelete', expense.id)"
          >
            <small class="text-muted">
              {{ expense.type }}
            </small>
            <div class="d-flex align-items-center justify-content-between">
              <h5>{{ expense.title }}</h5>
              <h6
                :class="`text-${
                  Number(expense.amount) < 0 ? 'danger' : 'success'
                }`"
              >
                {{ Number(expense.amount) >= 0 ? "+" : ""
                }}{{ Number(expense.amount).toFixed(2) }}
              </h6>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <h2 class="text-center m-0">Nothing to show</h2>
      </div>
      <Balance v-if="showControls" :balance="balance" />
    </div>
  </div>
</template>

<script>
import Balance from "./Balance.vue";

export default {
  components: {
    Balance,
  },
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    balance: function () {
      return this.expenses
        .reduce((prev, curr) => (prev += Number(curr.amount)), 0)
        .toFixed(2);
    },
    showControls: function () {
      return this.expenses.length > 0;
    },
  },
  props: {
    expenses: Array,
  },
  emits: ["onexpensedelete", "onexpensesfilter"],
};
</script>

<style scoped>
button {
  width: 25%;
}
li {
  user-select: none;
}
</style>