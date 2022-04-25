import { useState } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from './components/particles/Particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import './App.css';
import 'tachyons';

const initialUserState = {
  id: '',
  name: '',
  email: '',
  password: '',
  entries: 0,
  joinedAt: '',
};

function App() {
  const [imageUrl, setImageUrl] = useState();
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
    setBox({});
  };
  const calculateFaceLocation = (data) => {
    const locations = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    detectFace({
      leftCol: locations.left_col * width,
      topRow: locations.top_row * height,
      rightCol: width - locations.right_col * width,
      bottomRow: height - locations.bottom_row * height,
    });
  };

  const detectFace = (coords) => setBox(coords);

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      setUser(initialUserState);
      setImageUrl('');
      setBox({});
    } else if (route === 'home') setIsSignedIn(true);
    setRoute(route);
  };

  const loadUser = (user) => {
    setUser(user);
  };

  const onPictureSubmit = () => {
    fetch('https://guarded-hollows-90177.herokuapp.com/imageUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result)
          fetch('https://guarded-hollows-90177.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => setUser({ ...user, entries: count }));
        calculateFaceLocation(result);
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <div className="App">
      <Particles />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'register' ? (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
