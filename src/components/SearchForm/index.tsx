import { useForm } from 'react-hook-form'
import styles from './styled.module.scss'
import { MagnifyingGlass } from 'phosphor-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../Context/TransactionContext'

const searchFormSchema = yup.object({
  query: yup.string().required(),
})

type SearchFormInput = yup.InferType<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    }
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: yupResolver(searchFormSchema),
  })

  async function handleSearchTransaction(data: SearchFormInput) {
    await fetchTransactions(data.query)
    console.log(data)
  }

  return (
    <form
      className={styles.Container}
      onSubmit={handleSubmit(handleSearchTransaction)}
    >
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </form>
  )
}
