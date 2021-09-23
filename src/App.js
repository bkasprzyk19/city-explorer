import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import  Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Weather from './Weather.js'

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      climates:[]
    }
  }


  getLocation = async () => {

    const locAPI = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

   
    try {

      const response = await axios.get(locAPI);

      

      this.setState({
        location: response.data[0],
        error: false,
        
      });

    } catch (error) {

      console.error('errors on catch');

      this.setState({ error: true,  });
    }


  }

  getWeather = async () => {

    const API = 'http://localhost:3001';

    try {

      const forecastData = await axios.get(`${API}/weather?searchQuery=${this.state.searchQuery}&format=json`);

      const climates = forecastData.data;
      console.log(typeof(forecastData));

      this.setState({ climates: climates, });
    }
   catch {
     console.log('error');
     this.setState({ error: true, })
   }


  }
  
  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  render() {
    return (
      <Container fluid>
        <Form>
        <Form.Control onChange={this.handleChange} value={this.state.searchQuery}/>
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
          <Card.Text>Longitude:{this.state.location.lon}</Card.Text>
          
          <Weather climates={this.state.climates}/>
          
          
          
          
         
        
          
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