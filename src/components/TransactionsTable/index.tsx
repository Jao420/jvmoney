import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../Context/TransactionContext'

import styles from './styles.module.scss'
import { amountFormatter, dateFormatter } from '../../utils/formatter'

export function TransactionsTable() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div className={styles.Container}>
      <table>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <h3>{transaction.description}</h3>
              </td>

              <td className={styles[transaction.type]}>
                {amountFormatter.format(transaction.amount)}
              </td>

              <td>{transaction.category}</td>

              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
