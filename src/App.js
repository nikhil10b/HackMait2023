import { useState, useEffect } from "react";
import styles from "./style";


// Components
import Navbar from "./components/Navbar";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

const App = () => {

  const [players, setPlayers] = useState([]);
  const [tickets, setTickets] = useState(3);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    (async () => {
      const storage = await fetchStorage();
      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
    })();
  }, []);


  const onBuyTicket = async () => {
    try {
      setLoading(true);
      await buyTicketOperation();
      alert("successfull transaction !!")
    } catch (error) {
      throw error;
    }
    setLoading(false);
   
  };


  const onEndGame = async () => {
    try {
        setLoading(true);
        await endGameOperation();
        alert("successfull transaction !!")
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  return (
    <div style={{     }} className="h-100">
      <Navbar />
      
      <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        
      </div>
    </div>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">

        <div className="py-1 text-white">Education {tickets}</div>
  
        {tickets > 0 ? (
          <button onClick={onBuyTicket} className="btn btn-primary btn-lg text-white ">
        
            {loading ? "Loading.." : "Scheduling"}
            
          </button>
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg text-white">
   
            {loading ? "Loading..." : "Education "}
            
          </button>
        )}
    
        <div className="mt-2 text-white">
          {players.map((player, index) => (
            <div key={index}>
              <b>C {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
