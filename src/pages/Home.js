import React, {Component} from 'react';
import AccommodationBoxes from '../components/AccommodationBoxes';
import api from '../services/api';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount(){
        this.getAccommodation();
    }

    getAccommodation = async(page = 1) => {
        let response = await api.get('accommodations');
        let { data } = response.data
        
        this.setState({
            accommodations: data.docs
        });
    }

    render(){
        const { accommodations } = this.state;

        return (
            <div>
                <AccommodationBoxes data={accommodations}/>
            </div>
        );
    }
}