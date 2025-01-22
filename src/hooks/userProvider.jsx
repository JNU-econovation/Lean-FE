import { useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext, UpdateUserContext } from './userContext';
import PropTypes from 'prop-types';

export const UserProvider = ({ children = null }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        updateCurrentUser();
    }, []);

    const updateCurrentUser = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                console.log(decodedToken);
                setCurrentUser({
                    user_id: decodedToken.user_id, 
                });
            } catch (error) {
                console.error('Invalid token:', error);
                setCurrentUser({
                    user_id: '',
                });
            }
        } else {
            console.log('out', accessToken);
            setCurrentUser({
                user_id: '',
            });
        }
    };

    return (
        <UserContext.Provider value={currentUser}>
            <UpdateUserContext.Provider value={updateCurrentUser}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node,
};