import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePlayer } from '../../../api/playerData';
import NewPlayerForm from '../../../components/forms/NewPlayerForm';

export default function EditPlayer() {
  const [editPlayer, setEditPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditPlayer);
  }, [firebaseKey]);

  return (<NewPlayerForm obj={editPlayer} />);
}
