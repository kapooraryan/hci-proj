import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmployerNavbar from './EmployerNavbar';
import DashboardTab from './Dashboard';
import JobListingsTab from './JobListingsTab';
import AddCompanyTab from './AddCompanyTab';
import CompanyProfileTab from './CompanyProfileTab';
import SettingsTab from './SettingsTab';

const EmployerHomepage = () => {
    const location = useLocation();
    const initialColorBlindMode = location.state?.colorBlind || false; 
    const [colorBlindMode, setColorBlindMode] = useState(initialColorBlindMode);
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleColorBlindToggle = () => {
        setColorBlindMode((prev) => !prev);
    };

    return (
        <div className={colorBlindMode ? 'bg-deuteranopia-color1 text-deuteranopia-color3' : 'bg-white text-gray-800'}>
            <EmployerNavbar setActiveTab={setActiveTab} />
            <div className="p-8">
                <h1 className={`text-3xl font-semibold mb-4 ${colorBlindMode ? 'text-deuteranopia-color2' : 'text-gray-800'}`}>
                    Welcome to EquiHire - Employer Dashboard
                </h1>

                <div className="flex space-x-4 mb-4">
                    <TabButton activeTab={activeTab} tabName="dashboard" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Dashboard
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="jobListings" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Job Listings
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="companyProfile" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Your Company Profile
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="addCompany" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Add Company
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="settings" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Settings
                    </TabButton>
                </div>

                {activeTab === 'dashboard' && <DashboardTab />}
                {activeTab === 'jobListings' && <JobListingsTab />}
                {activeTab === 'companyProfile' && <CompanyProfileTab />}
                {activeTab === 'addCompany' && <AddCompanyTab />}
                {activeTab === 'settings' && (
                    <SettingsTab colorBlindMode={colorBlindMode} toggleColorBlindMode={handleColorBlindToggle} />
                )}
            </div>
        </div>
    );
};

const TabButton = ({ activeTab, tabName, setActiveTab, children, colorBlindMode }) => {
    return (
        <button
            className={`text-lg ${activeTab === tabName
                ? colorBlindMode ? 'bg-deuteranopia-color2 text-white' : 'bg-gray-800 text-white'
                : colorBlindMode ? 'bg-protanopia-color4 text-white' : 'bg-green-600 text-white'
                } border border-blue-500 rounded-lg p-2 px-4 focus:outline-none hover:bg-green-800 hover:text-white transition duration-300`}
            onClick={() => setActiveTab(tabName)}
        >
            {children}
        </button>
    );
};

export default EmployerHomepage;
