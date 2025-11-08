import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

interface PrivacyPreferences {
  shareData: boolean;
  emailNotifications: boolean;
}

interface CommunicationPreferences {
  personalizedOffers: boolean;
  newsAndUpdates: boolean;
  promotionalOffers: boolean;
}

const Settings: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
  });

  const navigate = useNavigate();

  const [privacy, setPrivacy] = useState<PrivacyPreferences>({
    shareData: true,
    emailNotifications: false,
  });

  const [communication, setCommunication] = useState<CommunicationPreferences>({
    personalizedOffers: true,
    newsAndUpdates: false,
    promotionalOffers: true,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivacyToggle = (key: keyof PrivacyPreferences) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCommunicationToggle = (key: keyof CommunicationPreferences) => {
    setCommunication(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving settings:', { personalInfo, privacy, communication });
    
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {/* User Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
          {/* Placeholder for user avatar */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="grow">
          <h3 className="text-xl font-semibold text-gray-800">{personalInfo.fullName}</h3>
          <p className="text-gray-600">{personalInfo.email}</p>
          <p className="text-gray-600">{personalInfo.phone}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Edit Profile
        </button>
      </div>

      <form onSubmit={handleSaveChanges}>
        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Privacy Preferences Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Share data for analytics</p>
                <p className="text-sm text-gray-500">Help us improve our services by sharing anonymous usage data.</p>
              </div>
              <button
                type="button"
                onClick={() => handlePrivacyToggle('shareData')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.shareData ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.shareData ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive important updates and notifications via email.</p>
              </div>
              <button
                type="button"
                onClick={() => handlePrivacyToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Communication Preferences Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Receive personalized offers</p>
                <p className="text-sm text-gray-500">Get offers tailored to your usage patterns.</p>
              </div>
              <button
                type="button"
                onClick={() => handleCommunicationToggle('personalizedOffers')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${communication.personalizedOffers ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${communication.personalizedOffers ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Receive news and updates</p>
                <p className="text-sm text-gray-500">Stay informed about the latest features and news.</p>
              </div>
              <button
                type="button"
                onClick={() => handleCommunicationToggle('newsAndUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${communication.newsAndUpdates ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${communication.newsAndUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Receive promotional offers</p>
                <p className="text-sm text-gray-500">Get information about special deals and promotions.</p>
              </div>
              <button
                type="button"
                onClick={() => handleCommunicationToggle('promotionalOffers')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${communication.promotionalOffers ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${communication.promotionalOffers ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>

        {/* Logout Button */}
        <div className='flex justify-end mt-5'>
          <button
            onClick={() => navigate('/login')} 
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;