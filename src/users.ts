type User = {
	id: number
	username: string
	role: 'member' | 'contributor' | 'admin'
}

type UpdateUser = Partial<User>
let nextUserId = 1

const users: User[] = [
	{ id: nextUserId++, username: 'jane_smith', role: 'contributor' },
	{ id: nextUserId++, username: 'alice_jones', role: 'member' },
	{ id: nextUserId++, username: 'charlie_brown', role: 'member' },
]

function fetchUserDetails(username: string): User | undefined {
	const user = users.find(user => user.username === username)
	if (!user) {
		console.error(`User with username ${username} not found`)
		return
	}
	return user
}

function updateUser(id: number, updates: UpdateUser): void {
	const foundUser = users.find(user => user.id === id)
	if (!foundUser) {
		console.error('User not found!')
		return
	}

	if (Object.keys(updates).length === 0) {
		console.warn('No updates provided')
		return
	}

	Object.assign(foundUser, updates)
}

function addNewUser(newUser: Omit<User, 'id'>): User {
	const user: User = {
		id: nextUserId++,
		...newUser,
	}
	users.push(user)
	return user
}

addNewUser({ username: 'joe_schmoe', role: 'member' })
updateUser(1, { username: 'John_Doe', role: 'admin' })

console.log(users)
