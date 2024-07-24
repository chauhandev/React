import React, { useState ,useEffect} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Tile from './components/Tile/Tile';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Root() {
    const [tileClicked, setTileClicked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // Update tileClicked based on the current location
        if (location.pathname === '/') {
            setTileClicked(false);
        } else {
            setTileClicked(true);
        }
    }, [location.pathname]);


    const handleTileClicked = (link) => {
        setTileClicked(true);
        navigate(link);
    };

    const handleBackToProjects = () => {
        setTileClicked(false);
        if (location.pathname.startsWith('/memecreator')) {
            navigate('/memecreator');
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 bg-slate-100 p-4">
                {!tileClicked ? (
                    <div className="flex flex-row flex-wrap gap-4">
                        <Tile 
                            key="1" 
                            title="TicTacToe" 
                            description="Tic TacToe game" 
                            link="tictactoe" 
                            onClick={() => handleTileClicked('tictactoe')} 
                        />
                        <Tile 
                            key="2" 
                            title="GitHubProfile" 
                            description="GitHub profile" 
                            link="github" 
                            onClick={() => handleTileClicked('github')} 
                        />
                        <Tile 
                            key="3" 
                            title="SnakeGame" 
                            description="Snake Game" 
                            link="snakegame" 
                            onClick={() => handleTileClicked('snakegame')} 
                        />
                        <Tile 
                            key="4" 
                            title="LoanVisualizer" 
                            description="Visualize your loan amount over the year" 
                            link="loanvisualizer" 
                            onClick={() => handleTileClicked('loanvisualizer')} 
                        />
                        <Tile 
                            key="5" 
                            title="MemeCreator" 
                            description="Create popular memes" 
                            link="memecreator" 
                            onClick={() => handleTileClicked('memecreator')} 
                        />
                         <Tile 
                            key="6" 
                            title="Todo" 
                            description="Plan your day" 
                            link="todo" 
                            onClick={() => handleTileClicked('todo')} 
                        />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-end mb-4 absolute right-4" >
                            <button
                                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleBackToProjects}
                            >
                                Back
                            </button>
                        </div>
                        <Outlet />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
