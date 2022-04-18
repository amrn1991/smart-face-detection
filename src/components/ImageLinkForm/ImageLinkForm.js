import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f4">
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className="App-center">
        <div className="form App-center pa4 br3 shadow-5">
          <input
            type="text"
            className="f5 center pa2 w-70"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f5 link ph3 pv2 dib white bg-light-purple App-button"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
