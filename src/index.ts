type Address = {
	street: string
	city?: string
	country?: string
}

type Pizza = {
	id: number
	name: string
	price: number
	address?: Address
}

type Order = {
	id: number
	pizza: Pizza
	status: 'ordered' | 'completed'
}

let cashInRegister = 150
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
	{
		id: nextPizzaId++,
		name: 'Margherita',
		price: 18,
		address: { street: 'LA' },
	},
	{ id: nextPizzaId++, name: 'Pepperoni', price: 10 },
	{ id: nextPizzaId++, name: 'Hawaiian', price: 10 },
	{ id: nextPizzaId++, name: 'Veggie', price: 9 },
]

function addNewPizza(pizzaObj: Omit<Pizza, 'id'>): Pizza {
	const existingPizza = menu.find(pizza => pizza.name === pizzaObj.name)
	if (existingPizza) {
		console.error(`Pizza with name ${pizzaObj.name} already exists.`)
		return existingPizza
	}

	const newPizza: Pizza = {
		...pizzaObj,
		id: nextPizzaId++,
	}
	menu.push(newPizza)
	return newPizza
}

const orderQueue: Order[] = []

function placeOrder(pizzaName: string): Order | void {
	const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)

	if (!selectedPizza) {
		console.error(`${pizzaName} does not exist in the menu`)
		return
	}

	cashInRegister += selectedPizza.price
	const newOrder: Order = {
		id: nextOrderId++,
		pizza: selectedPizza,
		status: 'ordered',
	}
	orderQueue.push(newOrder)

	return newOrder
}

function addToOrders<T>(array: T[], item: T): T[] {
	array.push(item)
	return array
}

addToOrders<Pizza>(menu, { id: nextPizzaId++, name: 'Chilly', price: 20 })
addToOrders<Order>(orderQueue, {
	id: nextOrderId++,
	pizza: menu[2],
	status: 'completed',
})

console.log('Menu', menu)
console.log('Cash', cashInRegister)
console.log('Order', orderQueue)

function completeOrder(orderId: number): Order | undefined {
	const order = orderQueue.find(order => order.id === orderId)

	if (!order) {
		console.error(`Order with ID ${orderId} not found in the orderQueue`)
		return
	}

	if (order.status === 'completed') {
		console.warn(`Order with ID ${orderId} is already completed`)
		return order
	}

	order.status = 'completed'
	return order
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  return menu.find(pizza => 
    typeof identifier === 'string' 
      ? pizza.name.toLowerCase() === identifier.toLowerCase() 
      : pizza.id === identifier
  );
}
