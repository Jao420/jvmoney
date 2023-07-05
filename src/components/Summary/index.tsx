import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import styles from './styles.module.scss'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <div className={styles.Container}>
      <div>
        <header className={styles.income}>
          <p>Entradas</p>
          <ArrowCircleUp size={32} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-Br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.income)}
        </strong>
      </div>

      <div>
        <header className={styles.outcome}>
          <p>Saídas</p>
          <ArrowCircleDown size={32} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-Br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.outcome)}
        </strong>
      </div>

      <div className={styles.highlight_background}>
        <header>
          <p>Total</p>
          <CurrencyDollar size={32} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-Br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </div>
  )
}
