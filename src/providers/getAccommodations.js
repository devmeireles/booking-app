import React from "react";
import api from '../services/api';

export default class getAccommodation extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount(){
        getAccommodation();
    }

    getAccommodation = async(page = 1) => {
        let response = await api.get('accommodations');
        let { data } = response.data
        
        this.setState({
            data: data
        });
    }

    render(){
        return this.state.data;
    }
}


// export default class AccommodationsProvider{
//     getAccommodation = async(page = 1) =>{
//     // getAccommodation async(page = 1){
//         let response = await api.get(`accommodations`);
//         let {data} = response.data;

//         return data;
//     }
// }