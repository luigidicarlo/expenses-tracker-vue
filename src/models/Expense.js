export default class Expense {
	constructor(id, title, amount, type) {
		this.id = id;
		this.title = title;
		this.amount = amount;
		this.type = type === 'Cash' ? 'Cash' : 'Zelle';
	}
}

export const expenseTypes = {
	cash: 'Cash',
	zelle: 'Zelle',
};
