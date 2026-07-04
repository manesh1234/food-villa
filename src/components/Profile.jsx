
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaLock, FaSave, FaTimes, FaUserCircle } from 'react-icons/fa';
import UserAuth from '../utils/UserAuth';
import { UPDATE_USER } from '../utils/constants';

const Profile = () => {
    const { userAuth, setUserAuth } = useContext(UserAuth);
    const { userId } = useParams();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [nameInput, setNameInput] = useState(userAuth?.name || '');
    const [passwordInput, setPasswordInput] = useState(userAuth?.password || '');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setNameInput(userAuth?.name || '');
        setPasswordInput(userAuth?.password || '');
    }, [userAuth?.name, userAuth?.password]);

    useEffect(() => {
        if (userId && userId !== userAuth?.userId) {
            const updatedUser = { ...userAuth, userId };
            setUserAuth(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        }
    }, [userId, userAuth, setUserAuth]);

    const popUps = (success, msg) => {
        if (success) {
            toast.success(msg, {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        else {
            toast.error(msg, {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const saveProfileField = (field) => {
        const updatedName = nameInput.trim();
        const updatedPassword = passwordInput.trim();

        const value = field === 'name' ? updatedName : updatedPassword;
        if (!value) {
            popUps(false, `${field === 'name' ? 'Name' : 'Password'} cannot be empty.`);
            return;
        }

        const payload = { userId: userId, [field]: value };

        fetch(UPDATE_USER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then(response => response.json())
            .then((data) => {
                if (!data.success) {
                    popUps(false, data?.error.details[0]?.message);
                    return;
                }
                const updatedUser = {
                    ...userAuth,
                    [field]: value,
                };
                setUserAuth(updatedUser);
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                if (field === "name") {
                    setIsEditingName(false);
                } else {
                    setIsEditingPassword(false);
                }
                popUps(true, data.message);
            })
            .catch((err) => {
                popUps(false, "An error occurred while updating the profile.");
            });
    };

    const cancelEdit = (field) => {
        if (field === 'name') {
            setNameInput(userAuth?.name || '');
            setIsEditingName(false);
        } else {
            setPasswordInput(userAuth?.password || '');
            setIsEditingPassword(false);
        }
    };

    const displayName = userAuth?.name || 'Guest User';
    const displayEmail = userAuth?.email || 'No email yet';
    const displayPassword = userAuth?.password || 'password';

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-hero">
                    <div className="profile-hero-text">
                        <p className="profile-badge">My Profile</p>
                        <h1>{displayName}</h1>
                        <p>Keep your account details fresh and secure.</p>
                    </div>
                    <div className="profile-avatar">
                        <FaUserCircle />
                    </div>
                </div>

                <div className="profile-body">
                    <div className="profile-row">
                        <div>
                            <p className="profile-label">Name</p>
                            {isEditingName ? (
                                <input
                                    aria-label="Name"
                                    className="profile-input"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                            ) : (
                                <p className="profile-value">{displayName}</p>
                            )}
                        </div>
                        {isEditingName ? (
                            <div className="profile-actions">
                                <button className="profile-action-btn save" onClick={() => saveProfileField('name')}>
                                    <FaSave /> Save Name
                                </button>
                                <button className="profile-action-btn cancel" onClick={() => cancelEdit('name')}>
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        ) : (
                            <button className="profile-action-btn" onClick={() => setIsEditingName(true)}>
                                <FaEdit /> Edit Name
                            </button>
                        )}
                    </div>

                    <div className="profile-row">
                        <div>
                            <p className="profile-label">Email</p>
                            <p className="profile-value">{displayEmail}</p>
                        </div>
                    </div>

                    <div className="profile-row">
                        <div>
                            <p className="profile-label">Password</p>
                            {isEditingPassword ? (
                                <div className="profile-password-wrap">
                                    <input
                                        aria-label="Password"
                                        className="profile-input"
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                    />
                                    <button className="profile-pill-btn" onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            ) : (
                                <p className="profile-value">{showPassword ? displayPassword : '••••••••'}</p>
                            )}
                        </div>
                        {isEditingPassword ? (
                            <div className="profile-actions">
                                <button className="profile-action-btn save" onClick={() => saveProfileField('password')}>
                                    <FaLock /> Save Password
                                </button>
                                <button className="profile-action-btn cancel" onClick={() => cancelEdit('password')}>
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        ) : (
                            <button className="profile-action-btn" onClick={() => setIsEditingPassword(true)}>
                                <FaEdit /> Edit Password
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;