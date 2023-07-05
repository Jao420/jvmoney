import styles from './styles.module.scss'
import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'
import { SearchForm } from '../SearchForm'
export function Dashboard() {
  return (
    <div className={styles.Container}>
      <Summary />
      <SearchForm />
      <TransactionsTable />
    </div>
  )
}
