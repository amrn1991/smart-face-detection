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

function App() {
  const [imageUrl, setImageUrl] = useState();
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
  };
  const calculateFaceLocation = (data) => {
    const locations =
      JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box;
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
    if (route === 'signout') setIsSignedIn(false);
    else if (route === 'home') setIsSignedIn(true);
    setRoute(route);
  };

  const onButtonSubmit = () => {
    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Key ${process.env.REACT_APP_SMART_BRAIN_API_KEY}`,
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: 'amrfst',
          app_id: '8e3696814fe64e60acb2e2b1d4c87625',
        },
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
              },
            },
          },
        ],
      }),
    })
      .then((response) => response.text())
      .then((result) => calculateFaceLocation(result))
      .catch((error) => console.log('error', error));
  };
  return (
    <div className="App">
      <Particles />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'register' ? (
        <Register onRouteChange={onRouteChange} />
      ) : (
        <Signin onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
