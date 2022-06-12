import { Request, Response } from "express";
import * as lodash from "lodash";
import * as facade from "../models/location";


/*
    Getting locations
*/
export const getLocations = async (req: Request, res: Response) => {

    //const filters = req.body;
    const filters = req.query;
    let locations: any = [];    

    if(Object.keys(filters).length === 0) {
        locations = await facade.location.findAll();
    } else {
        locations = await facade.location.findAll( { where: { 
                                                                id_location_type: Number(filters.id_location_type) 
                                                            } 
                                                  } );
    }
    //
    res.json(locations);
}


/*
    Getting location by ID
*/
export const getLocationById = async (req: Request, res: Response) => {
    let msg: string;
    const { id } = req.params;

    const location = await facade.location.findByPk(id);
    if(location != null)
        msg = 'Location';
    else
        msg = 'Location not found';

    res.json({
        location,
        msg
    });
}


/*
    Creating a new Location in DB
*/
export const postLocation = async (req: Request, res: Response) => {

    let jsonResponse = null;

    //const body = req.body;
    const body = lodash.mapKeys(req.body, (v, k) => lodash.snakeCase(k));
    const location = Object.assign(body);

    try {
        location.creation_user = body.user;
        const objLocation = await facade.location.create(location);

        if(objLocation?.id != null && objLocation.id > 0) {
            jsonResponse = { msg: 'Location Created', data: { id: objLocation.id, name: objLocation.name, description: objLocation.description} };
            res.json(jsonResponse);
        }

     } catch(error: any) {

        let detailsError: any[] = [];
        for(let item of error.errors) {
            detailsError.push(item.message);
        }
        
        jsonResponse = { msg: 'Error creating Location', detail: String(detailsError) };
        res.status(500).json(jsonResponse);
    }

}


export const putLocation = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    let jsonResponse;

    try {
        let bdLocation = await facade.location.findByPk(id);
        if(bdLocation == null) {
            jsonResponse = { msg: 'Location does not exist'};
            res.status(201).json( jsonResponse );
        }

        let updatedLocation = await bdLocation?.update( {name: body.name, description: body.description},
                                                        {where: {id: id} } );

        if(updatedLocation != null && updatedLocation.id > 0) {
            jsonResponse = { msg: 'Location updated' };
        }

        res.status(200).json(jsonResponse);
    }
    catch(error) {
        jsonResponse = { msg: 'Error updating Location', error};
    }

    res.json(jsonResponse);
}



export const deleteLocation = (req: Request, res: Response) => {

    const { id } = req.params;

    let jsonResponse;
    let deletedLocation;

    try {
        const location = facade.location.findByPk(id);
        if(location == null) {
            res.status(201).json({msg: 'Location does not exist'});
        }

        deletedLocation = facade.location.update({active_row: false},
                                                {where: {id}});
        if(deleteLocation == null) {
            jsonResponse = { msg: 'Location deleted'};
        }
    }
    catch(error) {
        jsonResponse = { msg: 'Error deleting location', error};
        res.status(500).json(jsonResponse);
    }

    res.status(200).json(jsonResponse);
}