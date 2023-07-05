import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as Dialog from '@radix-ui/react-dialog'
import styles from './styles.module.scss'

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { TransactionsContext } from '../../Context/TransactionContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = yup.object({
  description: yup.string().required(),
  category: yup.string().required(),
  type: yup.string().oneOf(['income', 'outcome']).default('income'),
  amount: yup.number().required(),
})

type NewTransactionFormInputs = yup.InferType<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    }
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: yupResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { description, amount, category, type } = data

    await createTransaction({
      description,
      amount,
      category,
      type,
    })

    reset()
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>
            Cadastrar transação
          </Dialog.Title>
          <Dialog.Close className={styles.CloseButton}>
            <X size={24} />
          </Dialog.Close>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              placeholder="Descrição"
              required
              {...register('description')}
            />

            <input
              type="number"
              placeholder="Valor"
              className="hidden-arrows"
              required
              {...register('amount', { valueAsNumber: true })}
            />
            <input placeholder="Categoria" required {...register('category')} />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <>
                    <RadioGroup.Root
                      className={styles.TransactionContainer}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioGroup.Item
                        value={'income'}
                        className={`${
                          field.value.includes('income')
                            ? styles.income
                            : styles.TransactionButton
                        }`}
                      >
                        <ArrowCircleUp
                          size={24}
                          style={{ color: 'var(--green)' }}
                        />
                        <span>Entrada</span>
                      </RadioGroup.Item>
                      <RadioGroup.Item
                        value={'outcome'}
                        className={`${
                          field.value.includes('outcome')
                            ? styles.outcome
                            : styles.TransactionButton
                        }`}
                      >
                        <ArrowCircleDown
                          size={24}
                          style={{ color: 'var(--red)' }}
                        />
                        <span>Saida</span>
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  </>
                )
              }}
            />

            <button
              type="submit"
              className={styles.SubmitButton}
              disabled={isSubmitting}
            >
              Cadastrar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
