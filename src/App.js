import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import  Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
    }
  }


  getLocation = async () => {

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`

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
  
  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  render() {
    return (
      <Container>
        <Form>
        <input onChange={(event) => this.setState({ searchQuery: event.target.value })} placeholder="search for a city"></input>
          <Button varient="dark" onClick = {this.getLocation}>Explore!</Button>

        </Form>
        {/* <input onChange={(event) => this.setState({ searchQuery: event.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button> */}

        {/* falsy: false, 0, 0.0, null, undefined, NaN, '' */}

        {this.state.location.place_id &&
          <Card style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Img  variant ="top" src ={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=18`}/>
          <Card.Title>{this.state.location.display_name}</Card.Title>
          <Card.Text>Latitude:{this.state.location.lat}</Card.Text>
          <Card.Text>Longitue:{this.state.location.lon}</Card.Text>
          </Card.Body>
          <Card.Text>
          {
          this.state.error && <h2>Invalid entry..</h2>
        }</Card.Text>
          </Card>
        }

      
      </Container>
    )
  }
}

export default App;