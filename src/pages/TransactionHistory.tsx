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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: 'TXN123456',
      description: '50GB Data Package',
      date: '2025-06-15',
      amount: 150000,
      status: 'success'
    },
    {
      id: 'TXN123457',
      description: '15GB Data Package',
      date: '2025-06-10',
      amount: 100000,
      status: 'success'
    },
    {
      id: 'TXN123458',
      description: '5GB Data Package',
      date: '2025-06-05',
      amount: 50000,
      status: 'pending'
    },
    {
      id: 'TXN123459',
      description: '30GB Data Package',
      date: '2025-05-28',
      amount: 150000,
      status: 'success'
    },
    {
      id: 'TXN123460',
      description: '15GB Data Package',
      date: '2025-05-20',
      amount: 100000,
      status: 'failed'
    },
    {
      id: 'TXN123461',
      description: '5GB Data Package',
      date: '2025-05-15',
      amount: 50000,
      status: 'success'
    },
    {
      id: 'TXN123462',
      description: '50GB Data Package',
      date: '2025-05-10',
      amount: 150000,
      status: 'success'
    },
    {
      id: 'TXN123463',
      description: '15GB Data Package',
      date: '2025-05-05',
      amount: 100000,
      status: 'success'
    }
  ];

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    if (filterStatus !== 'all' && transaction.status !== filterStatus) {
      return false;
    }

    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportPDF = () => {
    alert('Exporting to PDF...');
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');

  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
          <div className="flex items-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package/Item Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp{transaction.amount.toLocaleString('id-ID')}
                  </td>
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
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Export PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Export Excel
        </button>
      </div>

      {/* Chat Widget */}
      <div className={`fixed bottom-4 right-4 z-10 transition-all duration-300 ${isChatOpen ? 'w-80 h-96' : 'w-14 h-14'}`}>
        {isChatOpen ? (
          <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
            <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Customer Support</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="space-y-2">
                <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                  <p className="text-sm">Hello! How can I help you today?</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-2 max-w-xs ml-auto">
                  <p className="text-sm">I have a question about my recent transaction.</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-2 max-w-xs">
                  <p className="text-sm">Sure, I'd be happy to help. Can you please provide your transaction ID?</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;