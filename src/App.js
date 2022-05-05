import './App.css';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './store/actions/users';

import ListRouters from './route/ListRouters';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    return <ListRouters />;
}

export default App;
