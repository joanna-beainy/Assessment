export type User = {
  _id: string;   
  name: string;
  email: string;
};

export type Income = {
    _id: string,
    source: string,
    amount: number
}

export type Expense = {
    _id: string,
    description: string,
    amount: number
}

export type Goal = {
    _id: string,
    name: string,
    amount: number

}

