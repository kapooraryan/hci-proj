import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiInfo, FiLogOut } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const EmployeeNavbar = () => {
    const { logout } = useAuth0();

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-4 shadow-lg"
        >
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                    <div>
                        <Link to="/employee_homepage">
                            <img src={Logo} alt='' width={50} />
                        </Link>
                    </div>
                    <Link to="/employee_homepage">
                        <motion.h1
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-semibold"
                        >
                            EquiHire
                        </motion.h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="../employee_profile">
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.2 }}
                            className="cursor-pointer"
                        >
                            <FiUser className="text-2xl" />
                        </motion.div>
                    </Link>
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                        className="cursor-pointer"
                        onClick={() => logout()}
                    >
                        <FiLogOut className="text-2xl" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default EmployeeNavbar;

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiUser, FiLogOut, FiMic, FiMicOff } from 'react-icons/fi';
// import Logo from '../../assets/logo.png';
// import { Link } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import annyang from 'annyang';
//
// const EmployeeNavbar = ({ setActiveTab }) => {
//     const { logout } = useAuth0();
//     const [isListening, setIsListening] = useState(false);
//
//     const commands = {
//         'dashboard': () => {
//             setActiveTab('dashboard');
//             speakText('Navigating to Dashboard');
//         },
//         'job search': () => {
//             setActiveTab('jobSearch');
//             speakText('Navigating to Job Search');
//         },
//         'my applications': () => {
//             setActiveTab('myApplications');
//             speakText('Navigating to My Applications');
//         },
//         'notifications': () => {
//             setActiveTab('notifications');
//             speakText('Navigating to Notifications');
//         },
//         'settings': () => {
//             setActiveTab('settings');
//             speakText('Navigating to Settings');
//         },
//         'logout': () => {
//             speakText('Logging out');
//             logout();
//         },
//     };
//
//     const speakText = (text) => {
//         const synth = window.speechSynthesis;
//         const utterance = new SpeechSynthesisUtterance(text);
//         synth.speak(utterance);
//     };
//
//     const startListening = () => {
//         if (annyang) {
//             console.log("Starting voice recognition..."); // Debugging line
//             annyang.addCommands(commands);
//             annyang.start();
//             setIsListening(true);
//             speakText('Please say Dashboard, Job Search, My Applications, Notifications, Settings, or Logout.');
//         }
//     };
//
//     const stopListening = () => {
//         if (annyang) {
//             console.log("Stopping voice recognition..."); // Debugging line
//             annyang.abort();
//             setIsListening(false);
//         }
//     };
//
//     const handleMicToggle = () => {
//         isListening ? stopListening() : startListening();
//     };
//
//     useEffect(() => {
//         if (annyang) {
//             console.log("Annyang is available."); // Debugging line
//         } else {
//             console.error("Annyang is not available."); // Debugging line
//         }
//         return () => stopListening();
//     }, []);
//
//     return (
//         <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gray-900 p-4 shadow-lg"
//         >
//             <div className="flex items-center justify-between text-white">
//                 <div className="flex items-center space-x-4">
//                     <div>
//                         <Link to="/employee_homepage">
//                             <img src={Logo} alt='' width={50} />
//                         </Link>
//                     </div>
//                     <Link to="/employee_homepage">
//                         <motion.h1
//                             initial={{ x: -100 }}
//                             animate={{ x: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="text-2xl font-semibold"
//                         >
//                             EquiHire
//                         </motion.h1>
//                     </Link>
//                 </div>
//                 <div className="flex items-center space-x-6">
//                     <Link to="../employee_profile">
//                         <motion.div
//                             initial={{ scale: 0.5 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 0.5 }}
//                             whileHover={{ scale: 1.2 }}
//                             className="cursor-pointer"
//                         >
//                             <FiUser className="text-2xl" />
//                         </motion.div>
//                     </Link>
//                     <motion.div
//                         initial={{ scale: 0.5 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.5 }}
//                         whileHover={{ scale: 1.2 }}
//                         className="cursor-pointer"
//                         onClick={handleMicToggle}
//                     >
//                         {isListening ? <FiMic className="text-2xl" /> : <FiMicOff className="text-2xl" />}
//                     </motion.div>
//                     <motion.div
//                         initial={{ scale: 0.5 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.5 }}
//                         whileHover={{ scale: 1.2 }}
//                         className="cursor-pointer"
//                         onClick={logout}
//                     >
//                         <FiLogOut className="text-2xl" />
//                     </motion.div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };
//
// export default EmployeeNavbar;
