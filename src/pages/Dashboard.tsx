import React from 'react';

interface RecentTransaction {
  id: string;
  date: string;
  amount: number;
}

interface RecommendedPackage {
  id: string;
  name: string;
  data: string;
  duration: string;
  price: number;
}

const Dashboard: React.FC = () => {
  // Mock data
  const userName = "Budi Santoso";
  const currentDataUsage = 75;
  const totalData = 100;
  const activePackageName = "Ultimate 100GB";
  const remainingData = 25;
  const expiryDate = "20/12/2024";
  const accountBalance = 150000;

  const recentTransactions: RecentTransaction[] = [
    { id: 'TXN123456', date: '15 Jun 2025', amount: 150000 },
    { id: 'TXN123455', date: '10 Jun 2025', amount: 100000 },
    { id: 'TXN123454', date: '05 Jun 2025', amount: 50000 },
  ];

  const recommendedPackages: RecommendedPackage[] = [
    {
      id: 'power-user',
      name: 'Power User',
      data: '200GB',
      duration: '30 days',
      price: 250000,
    },
    {
      id: 'ultimate-pro',
      name: 'Ultimate Pro',
      data: '500GB',
      duration: '30 days',
      price: 500000,
    },
  ];

  // Calculate percentage for circular progress
  const percentage = (currentDataUsage / totalData) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleBuyPackage = (packageName: string) => {
    alert(`Navigating to purchase ${packageName}...`);
  };

  const handleViewAllTransactions = () => {
    alert('Navigating to Transaction History...');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}</h1>
        <p className="text-gray-600">Here's an overview of your data usage and account</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Data Usage Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Data Usage</h2>
          <div className="relative">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#3b82f6"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800">{currentDataUsage}GB</span>
                <div className="text-sm text-gray-600">/ {totalData}GB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Package Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Package</h2>
          <div className="space-y-2">
            <div className="text-xl font-bold text-blue-600">{activePackageName}</div>
            <div className="text-gray-600">{remainingData}GB remaining</div>
            <div className="text-sm text-gray-500">Valid until: {expiryDate}</div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Manage Package
            </button>
          </div>
        </div>

        {/* Account Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Balance</h2>
          <div className="text-3xl font-bold text-green-600">Rp {accountBalance.toLocaleString('id-ID')}</div>
          <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            Top Up
          </button>
        </div>

        {/* Recent Transactions Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <button 
              onClick={handleViewAllTransactions}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-800">{transaction.id}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
                <div className="font-semibold text-gray-800">
                  Rp {transaction.amount.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Packages Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended for You</h2>
          <div className="space-y-4">
            {recommendedPackages.map((pkg) => (
              <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-800">{pkg.name}</div>
                <div className="text-sm text-gray-600">{pkg.data} | {pkg.duration}</div>
                <div className="flex justify-between items-center mt-2">
                  <div className="font-bold text-blue-600">Rp {pkg.price.toLocaleString('id-ID')}</div>
                  <button 
                    onClick={() => handleBuyPackage(pkg.name)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;