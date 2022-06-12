import { Request, Response } from "express";

import * as facade from "../models/booking";

// Getting All bookings 📕
export const getBookings = async (req: Request, res: Response) => {
    let msg: string;

    const filters = req.body;

    //const bookings = await facade.booking.findAll();
    const bookings = await facade.booking.findAll( { where: filters } );

    if (bookings.length > 0)
        msg = 'List of bookings';
    else
        msg = 'No found bookings'


    res.json({
        bookings: bookings,
        msg
    });

}

// Getting by Id
export const getBooking = async (req: Request, res: Response) => {
    let msg: string;
    const { id } = req.params;

    const booking = await facade.booking.findByPk(id);
    if(booking != null)
        msg = 'Booking';
    else
        msg = 'Booking not found';

    res.json({
        booking,
        msg
    });

}


// Getting by Filters 🔍
export const getBookingsByFilters = async (req: Request, res: Response) => {
    let msg: string;
    const { filters } = req.body;

    

    const booking = await facade.booking.findAll( { where: filters });
    if(booking != null)
        msg = 'Booking';
    else
        msg = 'Booking not found';

    res.json({
        booking,
        msg
    });

}




export const postBooking = async (req: Request, res: Response) => {

    let jsonResponse = null;

    const body = req.body;
    const booking = body;
    booking.creation_user = body.user;

    try {
        const objBooking = await facade.booking.create(booking);
        //console.log("Booking created:", objBooking);
        if(objBooking?.id != null && objBooking.id > 0) {
            //jsonResponse = { msg: 'Booking Created', data: objBooking };
            jsonResponse = { msg: 'Booking Created', data: { id: objBooking.id, location: objBooking.id_location, time: objBooking.starting_date} };
        }
    }catch(error) {
        console.error(error);
        jsonResponse = { msg: 'Error creating Booking', error};
    }

    res.json(jsonResponse);

}


export const putBooking = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    let jsonResponse;

    try {
        let bdBooking = await facade.booking.findByPk(id);
        if(bdBooking == null) {
            jsonResponse = { msg: 'Booking does not exist'};
            res.status(201).json( jsonResponse );
        }

        let updatedBooking = await bdBooking?.update( {starting_date: body.starting_date, finish_date: body.finish_date},
                                                        {where: {id: id} } );

        if(updatedBooking != null && updatedBooking.id > 0) {
            jsonResponse = { msg: 'Booking updated' };
        }

        res.status(200).json(jsonResponse);
    }
    catch(error) {
        jsonResponse = { msg: 'Error updating Booking', error};
    }

    res.json(jsonResponse);
}



export const deleteBooking = (req: Request, res: Response) => {

    const { id } = req.params;

    let jsonResponse;
    let deletedBooking;

    try {
        const booking = facade.booking.findByPk(id);
        if(booking == null) {
            res.status(201).json({msg: 'Booking does not exist'});
        }

        deletedBooking = facade.booking.update({active_row: false},
                                                {where: {id}});
        if(deleteBooking == null) {
            jsonResponse = { msg: 'Booking deleted'};
        }
    }
    catch(error) {
        jsonResponse = { msg: 'Error deleting booking', error};
        res.status(500).json(jsonResponse);
    }

    res.status(200).json(jsonResponse);
}