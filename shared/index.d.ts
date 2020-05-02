// auxiliary types
interface Category {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Identifier {
  id: string;
}

// used types
interface GetTransactionsResponseData {
  transactions: Transaction[];
  balance: Balance;
}

interface PostTransactionsBody {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

type PostTransactionsResponseData = Transaction;

type DeleteTransactionsParams = Identifier;

interface PostTransactionsImportBody {
  file: File;
}