import React, {Component} from 'react';
import { Row, Col, Rate} from 'antd';
import api from '../services/api';


export default class Accommodation extends Component {
    constructor() {
        super();
        this.state = {
            accommodation: {}
        }
    }

    componentDidMount(){
        this.getAccommodation();
    }

    getAccommodation = async() => {
        const slug = this.props.match.params.slug;

        let response = await api.get(`accommodations/slug/${slug}`);
        let { data } = response.data

        console.log(data);

        this.setState({
            accommodation: data[0]
        });
    }

    render(){
        const { title, availability, baths, bedrooms, beds, guests, price, type, description, address, amenities, photos, user, sleepingArrangements } = this.state.accommodation;

        
        const RenderAmenities = () => {
            return(
                Object.keys(amenities).map((keyName, i) => (
                    <p>{amenities[keyName].title}</p>
                )
            ));
        }

        const RenderSleepingArrangements = () => {
            return(
                Object.keys(sleepingArrangements).map((keyName, i) => (
                    <div>
                        <p>{sleepingArrangements[keyName].title}</p>
                        <p>{sleepingArrangements[keyName].description}</p>
                    </div>
                )
            ));
        }

        return(
            <Row gutter={16}>
                <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                    {title &&
                        <h1>{title}</h1>
                    }

                    {address &&
                        <p>{address[0].region} - {address[0].country}</p>
                    }

                    {type &&
                        <p>{type}</p>
                    }

                    <Row>
                        {guests &&
                            <Col xs={4} sm={4} md={4} lg={3} xl={2}>
                                <p>{guests} {guests > 1 ? 'guests' : 'guest'} </p>
                            </Col>
                        }

                        {bedrooms &&
                            <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                                <p>{bedrooms} {bedrooms > 1 ? 'bedrooms' : 'bedroom'} </p>
                            </Col>
                        }

                    
                        {beds &&
                            <Col xs={4} sm={4} md={4} lg={3} xl={2}>
                                <p>{beds} {beds > 1 ? 'beds' : 'bed'} </p>
                            </Col>
                        }                    

                    
                        {baths &&
                            <Col xs={4} sm={4} md={4} lg={3} xl={2}>
                                <p>{baths} {baths > 1 ? 'baths' : 'bath'} </p>
                            </Col>        
                        }
                    </Row>

                    {description &&
                        <p>{description}</p>
                    }

                    {amenities &&
                        <Row>
                            <p className="strong">Amenities</p>
                            <RenderAmenities />
                        </Row>

                    }

                    {sleepingArrangements &&
                        <Row>
                            <p className="strong">Sleeping Arrangements</p>
                            <RenderSleepingArrangements />
                        </Row>

                    }

                    {availability &&
                        <p>{availability ? 'Available' : null}</p>
                    }
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    {price &&
                        <h2>R${price} per day</h2>
                    }

                    <Rate style={{ color: '#00c', fontSize: '14px', }} disabled allowHalf defaultValue={4.5} />
                </Col>
            </Row>
            
        )
    }
}