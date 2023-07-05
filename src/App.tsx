import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'

import { TransactionsProvider } from './Context/TransactionContext'

function App() {
  return (
    <TransactionsProvider>
      <Header />

      <Dashboard />
    </TransactionsProvider>
  )
}

export default App
