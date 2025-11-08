import React, { useState } from 'react';

interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}

const TransactionHistory: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('last30days');

  // Sample transaction data
  const transactions: Transaction[] = [
    { id: 'TXN123456', description: '50GB Data Package', date: '2025-10-15', amount: 150000, status: 'success' },
    { id: 'TXN123457', description: '15GB Data Package', date: '2025-10-10', amount: 100000, status: 'success' },
    { id: 'TXN123458', description: '5GB Data Package', date: '2025-07-05', amount: 50000, status: 'pending' },
    { id: 'TXN123459', description: '30GB Data Package', date: '2025-07-28', amount: 150000, status: 'success' },
    { id: 'TXN123460', description: '15GB Data Package', date: '2025-05-20', amount: 100000, status: 'failed' },
    { id: 'TXN123461', description: '5GB Data Package', date: '2025-05-15', amount: 50000, status: 'success' },
    { id: 'TXN123462', description: '50GB Data Package', date: '2025-05-10', amount: 150000, status: 'success' },
    { id: 'TXN123463', description: '15GB Data Package', date: '2025-05-05', amount: 100000, status: 'success' }
  ];

  const getDateRangeLimit = (range: string): Date => {
    const now = new Date();
    const limit = new Date();

    switch (range) {
      case 'last7days':
        limit.setDate(now.getDate() - 7);
        break;
      case 'last30days':
        limit.setDate(now.getDate() - 30);
        break;
      case 'last3months':
        limit.setMonth(now.getMonth() - 3);
        break;
      case 'lastyear':
        limit.setFullYear(now.getFullYear() - 1);
        break;
      default:
        limit.setFullYear(2000);
    }

    return limit;
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const limitDate = getDateRangeLimit(filterDateRange);

    if (filterStatus !== 'all' && transaction.status !== filterStatus) {
      return false;
    }

    if (transactionDate < limitDate) {
      return false;
    }

    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportPDF = () => alert('Exporting to PDF...');
  const handleExportExcel = () => alert('Exporting to Excel...');

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              id="date-filter"
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Rp{transaction.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end mt-4 space-x-4">
        <button onClick={handleExportPDF} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Export PDF</button>
        <button onClick={handleExportExcel} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Export Excel</button>
      </div>
    </div>
  );
};

export default TransactionHistory;
