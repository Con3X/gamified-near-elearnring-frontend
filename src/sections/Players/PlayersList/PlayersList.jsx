import React, { useEffect, useState } from "react";
import { getAllPlayers } from "apiService";
import PlayerCard from "../PlayersCard/PlayerCard";

export default function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getAllPlayers();
        const palyerData = response.data;
        setPlayers(palyerData);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {players?.map((player, j) => (
          <div key={j} className="col-lg-6 col-md-12">
            <PlayerCard {...player} />
          </div>
        ))}
      </div>
    </div>
  );
}
