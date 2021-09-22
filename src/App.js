import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import  Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
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
      climates:{}
    }
  }


  getLocation = async () => {

    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    const API = 'http://localhost:3001';

    try {

      const response = await axios.get(url);

      const location = response.data[0];
      

      const responsePrime = await axios.get(`${API}/climates?lat=${location.lat}&lon=${location.lon}&city_name=${this.state.city_name}&format=json`);

      const climates = responsePrime;
      console.log(typeof(responsePrime));

     

      this.setState({ climates });

      this.setState({
        location, // or location:location
        error: false,
        
      });

    } catch (error) {

      console.error('Unable to find city', this.state.searchQuery, this.state.climates);

      this.setState({ error: true, location: '' });
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
        <FormControl onChange={(event) => this.setState({ searchQuery: event.target.value })} placeholder="search for a city"/>
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
          
          <Card.Text>Description:{this.state.climates.description}</Card.Text>
          <Card.Text>Date:{this.state.climates.valid_date}</Card.Text>
           <Card.Text>Date:{this.state.climates.city_name}</Card.Text>
          
          
          
         
        
          
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