import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../api/teamData';
import NewTeamForm from '../../../components/forms/NewTeamForm';

export default function EditPlayer() {
  const [editTeam, setEditTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  return (<NewTeamForm obj={editTeam} />);
}
