var Search = (props) => {
var currentSearch;

  return (
    <div className="search-bar form-inline">
      <input className="form-control" type="text" onChange={(e) => props.submitClick(e, e.target.value)}/>
      <button className="btn hidden-sm-down">
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;
