import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { collection, addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './db/Firebase';
import annyang from 'annyang';
import 'font-awesome/css/font-awesome.min.css';

const UserType = () => {
  const { user, isAuthenticated } = useAuth0();
  const [selectedRole, setSelectedRole] = useState('');
  const [recognizedSpeech, setRecognizedSpeech] = useState('');
  const [colorBlind, setColorBlind] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const checkUser = async () => {
        const userRef = collection(db, 'user');
        const q = query(userRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setSelectedRole(userData.role);
            setColorBlind(userData.colorBlind);
          });
        }
      };

      checkUser();
    }

    if (annyang) {
      annyang.addCommands({
        'employee': () => {
          setSelectedRole('employee');
          handleRoleSelection();
        },
        'employer': () => {
          setSelectedRole('employer');
          handleRoleSelection();
        },
        '*speech': (speech) => {
          setRecognizedSpeech(speech);
        },
      });
    }
  }, [user.email, isAuthenticated]);

  const handleRoleSelection = async () => {
    if (selectedRole) {
      if (isAuthenticated) {
        const userRef = collection(db, 'user');
        const userRecord = {
          email: user.email,
          role: selectedRole,
          colorBlind: colorBlind, 
        };

        const q = query(userRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(userRef, userRecord);
        } else {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, userRecord);
          });
        }

        if (selectedRole === 'employee') {
          navigate('/employee_homepage', { state: { colorBlind } });
        } else if (selectedRole === 'employer') {
          navigate('/employer_homepage', { state: { colorBlind } });
        }
      }
    }
  };

  const handleSpeechRecognition = () => {
    annyang.start();
    speakText('Please choose your role. Employee or Employer');
  };

  const handleColorBlindToggle = () => {
    setColorBlind(!colorBlind);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`bg-${colorBlind ? 'deuteranopia-color1' : 'white'} p-8 rounded shadow-lg w-80 border border-gray-300`}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Choose your role:</h2>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="employee"
              checked={selectedRole === 'employee'}
              onChange={() => setSelectedRole('employee')}
            />
            <span className={`text-${colorBlind ? 'deuteranopia-color3' : 'gray-800'}`}>Employee</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="employer"
              checked={selectedRole === 'employer'}
              onChange={() => setSelectedRole('employer')}
            />
            <span className={`text-${colorBlind ? 'deuteranopia-color3' : 'gray-800'}`}>Employer</span>
          </label>
        </div>
        <button
          onClick={handleRoleSelection}
          className={`bg-${colorBlind ? 'deuteranopia-color2' : 'gray-800'} text-white font-semibold py-2 px-4 rounded hover:bg-gray-900`}
        >
          Submit
        </button>
        <button
          onClick={handleSpeechRecognition}
          className={`bg-${colorBlind ? 'deuteranopia-color2' : 'gray-800'} text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-gray-900`}
        >
          Enable Voice Recognition
        </button>
        <button
          onClick={handleColorBlindToggle}
          className={`bg-${colorBlind ? 'deuteranopia-color2' : 'gray-800'} text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-gray-900`}
        >
          Toggle Color Blind Mode
        </button>
        {recognizedSpeech && (
          <div className="mt-4">
            <p className={`text-${colorBlind ? 'deuteranopia-color3' : 'gray-800'}`}>Recognized Speech:</p>
            <p>{recognizedSpeech}</p>
          </div>
        )}
        <div className="mt-4">
          <p className={`text-${colorBlind ? 'deuteranopia-color3' : 'gray-800'}`}>Color Blind Mode:</p>
          <p>{colorBlind ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>
      {annyang.isListening() && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full">
          <i className="fa fa-microphone" aria-hidden="true"></i>
        </div>
      )}
    </div>
  );
};

export default UserType;
