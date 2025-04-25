import React, { useState, useEffect } from 'react';
import { SignInButton, useClerk } from '@clerk/clerk-react';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner component
import './Welcome.css';

const Welcome = ({ isSignedIn, user, adminEmail }) => {
    const { signOut } = useClerk();
    const [loading, setLoading] = useState(false); // Track loading state

    const isUnauthorized = isSignedIn && user?.primaryEmailAddress?.emailAddress !== adminEmail;

    useEffect(() => {
        if (isUnauthorized) {
            // Show error toast and start loading process
            toast.error("Access Denied! Please sign in with the correct credentials.", {
                position: "top-center",
                autoClose: 5000,
            });

            setLoading(true); // Start loading state

            // Sign out after a short delay
            setTimeout(() => {
                signOut();
            }, 3000);
            setLoading(false); // Stop loading after sign out
        }
    }, [isUnauthorized]);

    return (
        <div className="welcome-container">
            <div className="welcome-box">
                {loading ? (
                    <div className="loading-spinner-container">
                        <ClipLoader color="#000" size={50} />
                    </div>
                ) : 
                isUnauthorized ? (
                    <>
                        <h1>Unauthorized Access</h1>
                        <p className="unauthorized">You are not authorized to access this dashboard.</p>
                    </>
                ) : (
                    <>
                        <h1>Welcome to the Admin Panel</h1>
                        <p className="welcome-message">Please sign in to continue</p>
                        <SignInButton mode="modal">
                            <button className="welcome-button">Sign In</button>
                        </SignInButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default Welcome;
