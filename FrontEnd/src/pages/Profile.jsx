import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          {user.picture && (
            <img 
              src={user.picture} 
              alt="Profile" 
              className="w-20 h-20 rounded-full mr-4 object-cover border-2 border-amber-200"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-lg text-gray-800">{user.name || 'Not provided'}</p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-lg text-gray-800">{user.email || 'Not provided'}</p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <p className="text-lg text-gray-800">
              {user.nickname || user["https://cafecore/username"] || 'Not provided'}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <p className="text-lg text-gray-800">
              {user["https://cafecore/contact_number"] || user.phone_number || 'Not provided'}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <p className="text-lg text-gray-800">
              {user["https://cafecore/country"] || user.locale || 'Not provided'}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Verified</label>
            <p className="text-lg">
              {user.email_verified ? (
                <span className="text-green-600 font-semibold">✓ Verified</span>
              ) : (
                <span className="text-red-600 font-semibold">✗ Not Verified</span>
              )}
            </p>
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
            <p className="text-lg text-gray-800">
              {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Not available'}
            </p>
          </div>
        </div>

        {/* Debug section - remove in production */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Debug Information</h3>
          <details className="text-sm">
            <summary className="cursor-pointer text-blue-600">View Raw User Data</summary>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}