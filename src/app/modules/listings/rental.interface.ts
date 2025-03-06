import mongoose from "mongoose";

export interface IRentalListing {
    title:string;
    landlordId: mongoose.Types.ObjectId;  // refers to User Model and users table in Mongodb
    description:string;
    location:string;
    beds:number;
    baths:number;
    type:'apartment'|'condo'|'house';
    rating:number;
    reviews?:string[];
    category:'long-term'|'short-term',
    rent:number;
    amenities?:string[];
    availableFrom?:Date;
    availableUntil?:Date;
    views?:number;
    images:string[];
    availability:'available'|'booked';


}