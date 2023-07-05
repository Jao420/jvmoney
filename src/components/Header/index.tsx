import logoImg from '../../assets/image.svg'
import { NewTransactionModal } from '../NewTransactionModal'

import styles from './styles.module.scss'
import * as Dialog from '@radix-ui/react-dialog'

export function Header() {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <img src={logoImg} alt="jv money" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button">Nova Transação</button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </div>
    </div>
  )
}
