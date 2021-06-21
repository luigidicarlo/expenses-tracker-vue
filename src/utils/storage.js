const storageKey = 'expenses';

export function save(expenses = []) {
	try {
		localStorage.setItem(storageKey, JSON.stringify(expenses));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function load() {
	try {
		const loadedData = localStorage.getItem(storageKey);

		if (!loadedData) throw new Error('No data loaded');

		return JSON.parse(loadedData);
	} catch (error) {
		console.error(error);
		return [];
	}
}
