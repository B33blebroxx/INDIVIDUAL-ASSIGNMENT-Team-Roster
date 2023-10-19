import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { searchPlayers } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';

export default function Search() {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllPlayers = () => {
    searchPlayers(searchInput, user.uid).then(setFilteredPlayers);
  };

  useEffect(() => {
    searchAllPlayers();
    return () => {
      setFilteredPlayers([]);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={searchAllPlayers} />)}
      </div>
    </>
  );
}
