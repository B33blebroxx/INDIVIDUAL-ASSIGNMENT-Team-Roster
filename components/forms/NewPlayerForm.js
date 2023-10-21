import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';

const initialState = {
  player_name: '',
  player_role: '',
  image: '',

};

function NewPlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/player/players'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/player/players');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player </h2>

      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Player Name"
          name="player_name"
          value={formInput.player_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Select Role" className="mb-3 f-w f-c">
        <Form.Select
          type="text"
          placeholder="Select Role"
          name="player_role"
          value={formInput.player_role}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a Role</option>
          <option value="Center">Center</option>
          <option value="Goalie">Goalie</option>
          <option value="Winger">Winger</option>
          <option value="Defenseman">Defenseman</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Player Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player </Button>
    </Form>
  );
}

NewPlayerForm.propTypes = {
  obj: PropTypes.shape({
    player_name: PropTypes.string,
    player_role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewPlayerForm.defaultProps = {
  obj: initialState,
};

export default NewPlayerForm;
