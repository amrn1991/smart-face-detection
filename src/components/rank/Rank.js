const Rank = ({ user: {name, entries} }) => {
  return (
    <div>
      <div className="white f3">
        <p className="mv0">{name}, your current entries are &nbsp;</p>
        <p className="white f2 mv2">{entries}</p>
      </div>
    </div>
  );
};

export default Rank;
