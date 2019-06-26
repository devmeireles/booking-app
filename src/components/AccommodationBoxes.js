import React, { Component } from 'react';
import { Row, Col, Card, Rate, Spin } from 'antd';

import '../styles/GeneralStyles.css';

const { Meta } = Card;

export default class Accommodation extends Component {
    constructor() {
        super();
    }


    render(){
        const accommodations = this.props.data
        

        return(
            <Row gutter={16}>
                {
                    accommodations ?
                    accommodations.map((accommodation, index) => (
                        <Col className="gutterRow" span={6} key={index}>
                            <Card
                                hoverable
                                cover={
                                    accommodation.photos.map((photo, subindex) =>
                                        photo.primary ?
                                        <img alt="example" src={photo.file} />
                                        : null
                                    )
                                }
                            >
                                <div className="cardAccommodationInfo">
                                    
                                    <p className="cardAccommodationType">{accommodation.type} - {accommodation.address[0].region}</p>
                                    <p className="cardAccommodationTitle">{accommodation.title}</p>
                                    <p className="cardAccommodationPrice">R${accommodation.price} per day</p>
                                    <Rate style={{ color: '#00c', fontSize: '14px', }} disabled allowHalf defaultValue={4.5} />
                                </div>
                            </Card>
                        </Col>
                    ))
                    : <Spin />
                }
            </Row>
        );
    }
}