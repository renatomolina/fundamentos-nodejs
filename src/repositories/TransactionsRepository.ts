import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
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
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, incomeTransaction) => incomeTransaction.value + total, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (total, outcomeTransaction) => outcomeTransaction.value + total,
        0,
      );

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ type, title, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
