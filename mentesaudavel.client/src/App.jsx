import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <footer></footer>
        </div>
    )
}

export default App;