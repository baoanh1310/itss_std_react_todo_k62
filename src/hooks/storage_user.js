import { useState, useEffect } from 'react';
import {db_user} from '../lib/firebase'

function useStorageUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData =  async () => {
            const snap = await db_user.get();
            setUsers(snap.docs.map(doc => (
                {...doc.data(), key: doc.id}
            )));
        };
        fetchData();
    }, []);

    const addUser = async user => {
        await db_user.doc(`${user.key}`).set({
            name: user.name
        });
        setUsers([user,...users]);
    };

    return [users, addUser];
}

export default useStorageUser; 
