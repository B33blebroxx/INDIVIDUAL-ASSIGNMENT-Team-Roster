/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getAllPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function ShowTeamPlayers() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllTeamPlayers = () => {
    getAllPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllTeamPlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <h1> Team </h1>
      <Link href="/player/new" passHref>
        <Button> Add A Player </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllTeamPlayers} />
        ))}
      </div>
    </div>
  );
}

export default ShowTeamPlayers;
