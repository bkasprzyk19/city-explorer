import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
    }
  }

  getLocation = async () => {

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {

      const response = await axios.get(url);

      const location = response.data[0];

      this.setState({
        location, // or location:location
        error: false,
      });

    } catch (error) {

      console.error('Unable to find city', this.state.searchQuery);

      this.setState({ error: true });
    }


  }

  render() {
    return (
      <>
        <input onChange={(event) => this.setState({ searchQuery: event.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>

        {/* falsy: false, 0, 0.0, null, undefined, NaN, '' */}

        {this.state.location.place_id &&
          <h2>The city is: {this.state.location.display_name}</h2>
        }

        {
          this.state.error && <h2>Oh noes!!!</h2>
        }
      </>
    )
  }
}

export default App;