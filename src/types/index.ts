export interface Message {
	id: number;
	content: string;
	createdAt: string;
	owner: string;
}

export interface Trader {
	id: number;
	name: string;
	reputation: {
		positive: number;
		negetive: number;
	},
	avatar: string;
};

export interface Trade {
	id: number;
	trader: Trader,
	title: string;
	type: string;
	status: string;
	unread: boolean;
	amount: number;
	currency: string;
	hash: string;
	createdAt: string;
	updatedAt: string;
	messages: Message[];
}