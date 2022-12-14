import "bootstrap/dist/css/bootstrap.min.css";

import Bench from "./components/Bench/Bench";
import Shop from "./components/Shop/Shop";
import Profile from "./components/Setting/Profile";

function App() {
    return (
        <div>
            <Profile />
            <Bench />
            <Shop />
        </div>
    );
}

export default App;
