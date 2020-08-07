import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceIncome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'income') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );

    const balanceOutcome = this.transactions.reduce(
      (accumulator, currentValue) => {
        if (currentValue.type === 'outcome') {
          return accumulator + currentValue.value;
        }
        return accumulator;
      },
      0,
    );

    const balanceTotal = balanceIncome - balanceOutcome;

    return {
      income: balanceIncome,
      outcome: balanceOutcome,
      total: balanceTotal,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
