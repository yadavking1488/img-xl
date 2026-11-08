import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Camera,
  CircleDollarSign,
  FileSpreadsheet,
  FolderKanban,
  PackageCheck,
  Search,
  ShoppingCart,
  Sparkles,
  Users,
} from 'lucide-react'

type Stat = {
  label: string
  value: string
  delta: string
  accent: string
}

type InventoryItem = {
  product: string
  sku: string
  stock: number
  stockLevel: string
  supplier: string
  value: string
}

type Customer = {
  name: string
  phone: string
  balance: string
  lastPaid: string
  risk: string
}

type Document = {
  name: string
  type: string
  status: string
  confidence: string
  owner: string
}

type DashboardSummary = {
  revenue: string
  dueCollection: string
  inventoryValue: string
  billsProcessed: string
}

const fallbackSummary: DashboardSummary = {
  revenue: '₹34.8L',
  dueCollection: '₹8.2L',
  inventoryValue: '₹24.6L',
  billsProcessed: '1,248',
}

const fallbackInventory: InventoryItem[] = [
  { product: 'Rice 25kg', sku: 'RICE-25', stock: 145, stockLevel: 'Healthy', supplier: 'Vijay Foods', value: '₹67,500' },
  { product: 'Toor Dal', sku: 'DAL-10', stock: 48, stockLevel: 'Low', supplier: 'Asha Wholesale', value: '₹18,200' },
  { product: 'Sunflower Oil', sku: 'OIL-5', stock: 68, stockLevel: 'Healthy', supplier: 'South India Oils', value: '₹55,800' },
  { product: 'Detergent Powder', sku: 'DET-2', stock: 22, stockLevel: 'Critical', supplier: 'Cleanline Retail', value: '₹9,600' },
]

const fallbackCustomers: Customer[] = [
  { name: 'Ramesh Traders', phone: '+91 98980 22221', balance: '₹18,400', lastPaid: '2 days ago', risk: 'Low' },
  { name: 'Anita General Store', phone: '+91 98112 55995', balance: '₹34,200', lastPaid: '5 days ago', risk: 'Medium' },
  { name: 'Laxmi Provision', phone: '+91 97656 21189', balance: '₹51,500', lastPaid: '1 week ago', risk: 'High' },
]

const fallbackDocuments: Document[] = [
  { name: 'Invoice_3021.pdf', type: 'Supplier Bill', status: 'Verified', confidence: '98.2%', owner: 'OCR Agent' },
  { name: 'Ledger_0427.jpg', type: 'Khata Page', status: 'Review', confidence: '94.1%', owner: 'Shop Owner' },
  { name: 'RateList_08.pdf', type: 'Price List', status: 'Auto-synced', confidence: '96.8%', owner: 'Operations Team' },
]

const quickActions = [
  { title: 'Scan Khata', description: 'Capture ledger page and auto-read dues', icon: Camera },
  { title: 'Upload Bill', description: 'Digitize supplier invoice in seconds', icon: ShoppingCart },
  { title: 'Export Excel', description: 'Generate sales and inventory sheets', icon: FileSpreadsheet },
  { title: 'AI Suggestions', description: 'Review OCR corrections and duplicates', icon: Sparkles },
]

const stats: Stat[] = [
  { label: 'Monthly revenue', value: '₹34.8L', delta: '+18.4%', accent: 'from-emerald-500 to-teal-400' },
  { label: 'Due collection', value: '₹8.2L', delta: '+12.1%', accent: 'from-sky-500 to-cyan-400' },
  { label: 'Inventory value', value: '₹24.6L', delta: '-2.3%', accent: 'from-violet-500 to-purple-400' },
  { label: 'Bills processed', value: '1,248', delta: '+114', accent: 'from-amber-500 to-orange-400' },
]

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const apiBase = configuredApiUrl
  ? /^https?:\/\//i.test(configuredApiUrl)
    ? configuredApiUrl.replace(/\/+$/, '')
    : `https://${configuredApiUrl.replace(/\/+$/, '')}`
  : 'http://localhost:3000'

function App() {
  const [summary, setSummary] = useState<DashboardSummary>(fallbackSummary)
  const [inventory, setInventory] = useState<InventoryItem[]>(fallbackInventory)
  const [customers, setCustomers] = useState<Customer[]>(fallbackCustomers)
  const [documents, setDocuments] = useState<Document[]>(fallbackDocuments)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, inventoryRes, customersRes, documentsRes] = await Promise.all([
          fetch(`${apiBase}/api/dashboard/summary`),
          fetch(`${apiBase}/api/inventory`),
          fetch(`${apiBase}/api/customers`),
          fetch(`${apiBase}/api/documents`),
        ])

        if (summaryRes.ok) {
          const nextSummary = (await summaryRes.json()) as DashboardSummary
          setSummary(nextSummary)
        }

        if (inventoryRes.ok) {
          const nextInventory = (await inventoryRes.json()) as InventoryItem[]
          setInventory(nextInventory)
        }

        if (customersRes.ok) {
          const nextCustomers = (await customersRes.json()) as Customer[]
          setCustomers(nextCustomers)
        }

        if (documentsRes.ok) {
          const nextDocuments = (await documentsRes.json()) as Document[]
          setDocuments(nextDocuments)
        }
      } catch {
        // The frontend remains graceful with demo fallback data when the backend is unavailable.
      }
    }

    void fetchDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/30">
              K
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Kirana OS</p>
              <h1 className="text-xl font-semibold text-white">Store Intelligence Suite</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                aria-label="Search"
                className="w-56 rounded-xl border border-slate-700 bg-slate-950/70 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 outline-none ring-0 transition focus:border-emerald-500"
                placeholder="Search products or customers"
              />
            </div>
            <button className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-slate-200 transition hover:border-emerald-500 hover:text-emerald-300">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
              Add New Record
            </button>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm text-slate-300">
          {[
            'Dashboard',
            'OCR Upload Center',
            'Inventory',
            'Customers',
            'Khata Ledger',
            'GST Reports',
            'Google Sheets',
          ].map((item) => (
            <button
              key={item}
              className={`rounded-full border px-3 py-1.5 ${
                item === 'Dashboard'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${stat.accent}`} />
              <p className="text-sm text-slate-400">{stat.label}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">
                  {stat.delta}
                </span>
              </div>
            </div>
          ))}
        </section>

        <main className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 shadow-2xl shadow-slate-950/30">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Operations snapshot</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">AI-powered retail workflow</h2>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 hover:border-emerald-400">
                  View reports
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Revenue</span>
                    <CircleDollarSign className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-semibold text-white">{summary.revenue}</p>
                  <p className="mt-2 text-xs text-emerald-300">+₹4.5L vs last month</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Due collection</span>
                    <BriefcaseBusiness className="h-4 w-4 text-sky-400" />
                  </div>
                  <p className="text-2xl font-semibold text-white">{summary.dueCollection}</p>
                  <p className="mt-2 text-xs text-sky-300">73% collected this week</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Stock value</span>
                    <PackageCheck className="h-4 w-4 text-violet-400" />
                  </div>
                  <p className="text-2xl font-semibold text-white">{summary.inventoryValue}</p>
                  <p className="mt-2 text-xs text-violet-300">12 SKUs below re-order level</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Inventory health</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Stock movement overview</h3>
                </div>
                <button className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-slate-600">
                  Reorder suggestions
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                  <thead className="bg-slate-950 text-slate-300">
                    <tr>
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 font-medium">SKU</th>
                      <th className="px-4 py-3 font-medium">Stock</th>
                      <th className="px-4 py-3 font-medium">Supplier</th>
                      <th className="px-4 py-3 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900">
                    {inventory.map((item) => (
                      <tr key={item.sku} className="text-slate-200">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{item.product}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{item.sku}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.stock}</span>
                            <span className={`rounded-full px-2 py-1 text-[10px] ${
                              item.stockLevel === 'Healthy'
                                ? 'bg-emerald-500/10 text-emerald-300'
                                : item.stockLevel === 'Low'
                                  ? 'bg-amber-500/10 text-amber-300'
                                  : 'bg-rose-500/10 text-rose-300'
                            }`}>
                              {item.stockLevel}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{item.supplier}</td>
                        <td className="px-4 py-3 font-medium text-white">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Quick actions</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Smart workflow</h3>
                </div>
                <FolderKanban className="h-5 w-5 text-cyan-300" />
              </div>

              <div className="grid gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.title}
                      className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-left transition hover:border-emerald-500/40 hover:bg-slate-950"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{action.title}</p>
                        <p className="text-xs text-slate-400">{action.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Due collection</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Customer ledger</h3>
                </div>
                <Users className="h-5 w-5 text-amber-300" />
              </div>

              <div className="space-y-3">
                {customers.map((customer) => (
                  <div key={customer.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-white">{customer.name}</p>
                        <p className="text-xs text-slate-400">{customer.phone}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] ${
                        customer.risk === 'Low'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : customer.risk === 'Medium'
                            ? 'bg-amber-500/10 text-amber-300'
                            : 'bg-rose-500/10 text-rose-300'
                      }`}>
                        {customer.risk}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-400">Balance</span>
                      <span className="font-semibold text-white">{customer.balance}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Last paid</span>
                      <span>{customer.lastPaid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">OCR review center</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Latest uploaded documents</h3>
              </div>
              <button className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-slate-400">{doc.type} • {doc.owner}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-300">
                      {doc.status}
                    </span>
                    <span className="text-xs text-slate-300">{doc.confidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">AI suggestions</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Recommended actions</h3>
              </div>
              <Sparkles className="h-5 w-5 text-emerald-300" />
            </div>

            <div className="space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="font-medium text-emerald-200">Duplicate supplier invoice detected</p>
                <p className="mt-1 text-slate-300">Invoice #3021 appears to match a bill from 4 days ago. Merge entries and verify GST rate.</p>
              </div>
              <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-3">
                <p className="font-medium text-sky-200">Auto-fill customer ledger</p>
                <p className="mt-1 text-slate-300">Ramesh Traders had a handwritten notebook entry with 3 pending transactions; 2 were corrected automatically.</p>
              </div>
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-3">
                <p className="font-medium text-violet-200">Stock reorder alert</p>
                <p className="mt-1 text-slate-300">Toor dal is 18 units below threshold. Suggested reorder value: ₹12,800.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
