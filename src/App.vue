<template>
  <Header />
  <main class="container">
    <ExpenseForm @onexpenseadded="onExpenseAdded" />
    <Expenses
      :expenses="filteredExpenses"
      @onexpensedelete="onExpenseDelete"
      @onexpensesfilter="onExpensesFilter"
    />
  </main>
</template>

<script>
import Expenses from "./components/Expenses.vue";
import ExpenseForm from "./components/ExpenseForm.vue";
import Header from "./components/Header.vue";

import { load, save } from "./utils/storage";

export default {
  name: "App",
  components: {
    Expenses,
    ExpenseForm,
    Header,
  },
  data() {
    return {
      expenses: load(),
      filter: "All",
    };
  },
  computed: {
    filteredExpenses: function () {
      if (this.filter === "All") return this.expenses;

      return this.expenses.filter((expense) => expense.type === this.filter);
    },
  },
  methods: {
    onExpenseAdded(expense) {
      this.expenses = [expense, ...this.expenses];
      save(this.expenses);
    },
    onExpenseDelete(expenseId) {
      if (window.confirm("Are you sure?")) {
        this.expenses = this.expenses.filter(
          (expense) => expense.id !== expenseId
        );
        save(this.expenses);
      }
    },
    onExpensesFilter(filter) {
      if (String(this.filter) === String(filter)) this.filter = "";

      this.filter = filter;
    },
  },
};
</script>
