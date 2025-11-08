import React, { useState } from 'react';

interface DataPackage {
  id: string;
  name: string;
  data: string;
  duration: string;
  price: number;
  recommended?: boolean;
}

const DataPackages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('ewallet');

  const dataPackages: DataPackage[] = [
    {
      id: 'basic',
      name: 'Basic',
      data: '5GB',
      duration: '7 days',
      price: 50000,
    },
    {
      id: 'standard',
      name: 'Standard',
      data: '15GB',
      duration: '30 days',
      price: 100000,
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      data: '30GB',
      duration: '30 days',
      price: 150000,
    },
  ];

  const paymentMethods = [
    { id: 'ewallet', name: 'E-Wallet' },
    { id: 'creditcard', name: 'Credit Card' },
    { id: 'banktransfer', name: 'Bank Transfer' },
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleConfirmPurchase = () => {
    alert(`Purchasing ${dataPackages.find(p => p.id === selectedPackage)?.name} package with ${paymentMethods.find(m => m.id === paymentMethod)?.name}`);
  };

  const selectedPackageData = dataPackages.find(p => p.id === selectedPackage);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Purchase Data Package</h2>
      
      {/* Package Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dataPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all ${
              selectedPackage === pkg.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handlePackageSelect(pkg.id)}
          >
            {pkg.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Recommended</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.name}</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.data}</div>
            <div className="text-gray-600 mb-4">{pkg.duration}</div>
            <div className="text-xl font-semibold text-gray-800">Rp{pkg.price.toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>

      {/* Selected Package Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Package</h3>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-semibold text-gray-800">
              {selectedPackageData?.name} Package
            </div>
            <div className="text-gray-600">
              {selectedPackageData?.data} | {selectedPackageData?.duration}
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            Rp{selectedPackageData?.price.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => handlePaymentMethodChange(method.id)}
                className="mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmPurchase}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default DataPackages;