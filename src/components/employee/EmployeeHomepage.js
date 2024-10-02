import React, { useState } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import DashboardTab from './DashboardTab';
import Search from './Search';
import MyApplicationsTab from './MyApplicationsTab';
import SettingsTab from '../employer/SettingsTab';
import Notifications from './Notifications';
import { useLocation } from 'react-router-dom';

const EmployeeHomepage = () => {
    const { state } = useLocation();
    const [colorBlindMode, setColorBlindMode] = useState(state?.colorBlind || false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const toggleColorBlindMode = () => {
        setColorBlindMode(prev => !prev);
    };

    return (
        <div className={colorBlindMode ? 'bg-deuteranopia-color1 text-deuteranopia-color3' : 'bg-white text-gray-800'}>
            <EmployeeNavbar />
            <div className="p-8">
                <h1 className={`text-3xl font-semibold mb-4 ${colorBlindMode ? 'text-deuteranopia-color2' : 'text-gray-800'}`}>
                    Welcome to EquiHire - Employee Dashboard
                </h1>

                <div className="flex space-x-4 mb-4">
                    <TabButton activeTab={activeTab} tabName="dashboard" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Dashboard
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="jobSearch" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Job Search
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="myApplications" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        My Applications
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="notifications" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Notifications
                    </TabButton>
                    <TabButton activeTab={activeTab} tabName="settings" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
                        Settings
                    </TabButton>
                </div>
                {activeTab === 'dashboard' && <DashboardTab />}
                {activeTab === 'jobSearch' && <Search />}
                {activeTab === 'myApplications' && <MyApplicationsTab />}
                {activeTab === 'notifications' && <Notifications />}
                {activeTab === 'settings' && (
                    <SettingsTab colorBlindMode={colorBlindMode} toggleColorBlindMode={toggleColorBlindMode} />
                )}
            </div>
        </div>
    );
};

const TabButton = ({ activeTab, tabName, setActiveTab, children, colorBlindMode }) => {
    return (
        <button
            className={`text-lg ${activeTab === tabName ? (colorBlindMode ? 'bg-deuteranopia-color2 text-white' : 'bg-gray-800 text-white') : (colorBlindMode ? 'bg-protanopia-color4 text-white' : 'bg-green-600 text-white')} border border-blue-500 rounded-lg p-2 px-4 focus:outline-none hover:bg-green-800 hover:text-white transition duration-300`}
            onClick={() => setActiveTab(tabName)}
        >
            {children}
        </button>
    );
};

export default EmployeeHomepage;

// import React, { useState } from 'react';
// import EmployeeNavbar from './EmployeeNavbar';
// import DashboardTab from './DashboardTab';
// import Search from './Search';
// import MyApplicationsTab from './MyApplicationsTab';
// import SettingsTab from '../employer/SettingsTab';
// import Notifications from './Notifications';
// import { useLocation } from 'react-router-dom';
//
// const EmployeeHomepage = () => {
//     const { state } = useLocation();
//     const [colorBlindMode, setColorBlindMode] = useState(state?.colorBlind || false);
//     const [activeTab, setActiveTab] = useState('dashboard');
//
//     const toggleColorBlindMode = () => {
//         setColorBlindMode(prev => !prev);
//     };
//
//     return (
//         <div className={colorBlindMode ? 'bg-deuteranopia-color1 text-deuteranopia-color3' : 'bg-white text-gray-800'}>
//             <EmployeeNavbar setActiveTab={setActiveTab} />
//             <div className="p-8">
//                 <h1 className={`text-3xl font-semibold mb-4 ${colorBlindMode ? 'text-deuteranopia-color2' : 'text-gray-800'}`}>
//                     Welcome to EquiHire - Employee Dashboard
//                 </h1>
//
//                 <div className="flex space-x-4 mb-4">
//                     <TabButton activeTab={activeTab} tabName="dashboard" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
//                         Dashboard
//                     </TabButton>
//                     <TabButton activeTab={activeTab} tabName="jobSearch" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
//                         Job Search
//                     </TabButton>
//                     <TabButton activeTab={activeTab} tabName="myApplications" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
//                         My Applications
//                     </TabButton>
//                     <TabButton activeTab={activeTab} tabName="notifications" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
//                         Notifications
//                     </TabButton>
//                     <TabButton activeTab={activeTab} tabName="settings" setActiveTab={setActiveTab} colorBlindMode={colorBlindMode}>
//                         Settings
//                     </TabButton>
//                 </div>
//                 {activeTab === 'dashboard' && <DashboardTab />}
//                 {activeTab === 'jobSearch' && <Search />}
//                 {activeTab === 'myApplications' && <MyApplicationsTab />}
//                 {activeTab === 'notifications' && <Notifications />}
//                 {activeTab === 'settings' && (
//                     <SettingsTab colorBlindMode={colorBlindMode} toggleColorBlindMode={toggleColorBlindMode} />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// const TabButton = ({ activeTab, tabName, setActiveTab, children, colorBlindMode }) => {
//     return (
//         <button
//             className={`text-lg ${activeTab === tabName ? (colorBlindMode ? 'bg-deuteranopia-color2 text-white' : 'bg-gray-800 text-white') : (colorBlindMode ? 'bg-protanopia-color4 text-white' : 'bg-green-600 text-white')} border border-blue-500 rounded-lg p-2 px-4 focus:outline-none hover:bg-green-800 hover:text-white transition duration-300`}
//             onClick={() => setActiveTab(tabName)}
//         >
//             {children}
//         </button>
//     );
// };
//
// export default EmployeeHomepage;
