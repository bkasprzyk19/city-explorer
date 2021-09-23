import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';



class Weather extends Component {
    render() {
        return (
            <Container>
            {this.props.climates.map((day, index) => {
                return (
                    <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>{day.valid_date}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>{day.description}</Card.Text>
                    </Card.Body>
                    </Card>
                    )    
                })}
            </Container>
            )
         }
        }

export default Weather;