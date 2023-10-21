/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PlayerCard from '../../components/PlayerCard';
import { viewTeamDetails } from '../../api/mergedData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getDetails = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    getDetails();
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 text-center">
        <div className="ms-5 mb-5">
          <h1>{teamDetails.team_name}</h1>
          <hr className="mb-3 h-p" />
        </div>
        <div className="d-flex justify-content-center">
          <img src={teamDetails.logo} alt={teamDetails.team_name} style={{ width: '600px' }} />
        </div>
        <br />
      </div>
      <div className="d-flex flex-column">
        <div className="text-center">
          <h3 className="mt-5 text-center">PLAYERS</h3>
          <hr className="mb-3 h-p" />
          <Button size="md" className="btn-m mt-2 mb-4" onClick={() => router.push('/player/new')}>Add Player</Button>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {teamDetails.players?.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
