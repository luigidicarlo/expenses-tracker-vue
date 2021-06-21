<template>
  <div class="d-flex align-items-stretch justify-content-end my-2">
    <button
      class="btn btn-info btn-sm text-white"
      @click="onToggleForm"
      :title="`${isOpen ? 'Close form' : 'Expand form'}`"
    >
      <i :class="`fas fa-chevron-${isOpen ? 'up' : 'down'}`"></i>
    </button>
  </div>
  <div class="bg-white card" v-show="isOpen">
    <div class="card-body">
      <form @submit="onSubmit">
        <div class="form-group mb-3">
          <label for="title">Title</label>
          <input
            class="form-control"
            type="text"
            required
            placeholder="Expense..."
            v-model="title"
          />
        </div>
        <div class="form-group mb-3">
          <label for="amount">Amount</label>
          <input
            class="form-control"
            type="number"
            step="0.01"
            required
            placeholder="99.99"
            v-model="amount"
          />
        </div>
        <div class="form-group mb-3">
          <label for="type">Type</label>
          <select class="form-control" v-model="type">
            <option value="Zelle">Zelle</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <button class="btn btn-success d-block mt-3 w-100">Add Expense</button>
      </form>
    </div>
  </div>
</template>

<script>
import { v4 as getId } from "uuid";
import Expense, { expenseTypes } from "../models/Expense";

export default {
  name: "ExpenseForm",
  data() {
    return {
      isOpen: false,
      title: "",
      amount: 0,
      type: expenseTypes.zelle,
    };
  },
  methods: {
    onToggleForm() {
      this.isOpen = !this.isOpen;
    },
    onSubmit(e) {
      e.preventDefault();

      if (!this.title || !this.amount || !this.type) {
        return;
      }

      const newExpense = new Expense(
        getId(),
        this.title,
        this.amount,
        this.type
      );

      this.$emit("onexpenseadded", newExpense);
      this.resetForm();
    },
    resetForm() {
      this.title = "";
      this.amount = 0;
      this.type = expenseTypes.zelle;
    },
  },
  emits: ["onexpenseadded"],
};
</script>
