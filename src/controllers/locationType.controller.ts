import { Request, Response } from "express";

import * as facade from "../models/location_type";

/*
    METHOD: GET
*/
export const getLocationTypes = async (req: Request, res: Response) => {
    let msg: string;
    const locationTypes = await facade.location_type.findAll();

    if (locationTypes.length > 0)
        msg = 'List of locationTypes';
    else
        msg = 'No found locationTypes'


    // res.json({
    //     locationTypes: locationTypes,
    //     msg
    // });

    res.status(200).json(locationTypes);

}

export const getLocationType = async (req: Request, res: Response) => {
    let msg: string;
    const { id } = req.params;

    const locationType = await facade.location_type.findByPk(id);
    if(locationType != null)
        msg = 'LocationType';
    else
        msg = 'LocationType not found';

    res.json({
        locationType,
        msg
    });

}

export const postLocationType = async (req: Request, res: Response) => {

    let jsonResponse = null;

    const body = req.body;
    const locationType = body;
    locationType.creation_user = body.user;

    try {
        const objLocationType = await facade.location_type.create(locationType);
        //console.log("LocationType created:", objLocationType);
        if(objLocationType?.id != null && objLocationType.id > 0) {
            //jsonResponse = { msg: 'LocationType Created', data: objLocationType };
            jsonResponse = { msg: 'LocationType Created', data: { id: objLocationType.id, name: objLocationType.name, description: objLocationType.description} };
        }
    }catch(error) {
        console.log(error);
        jsonResponse = { msg: 'Error creating LocationType', error};
    }

    res.json(jsonResponse);

}


export const putLocationType = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    let jsonResponse;

    try {
        let bdLocationType = await facade.location_type.findByPk(id);
        if(bdLocationType == null) {
            jsonResponse = { msg: 'LocationType does not exist'};
            res.status(201).json( jsonResponse );
        }

        let updatedLocationType = await bdLocationType?.update( {name: body.name, description: body.description},
                                                        {where: {id: id} } );

        if(updatedLocationType != null && updatedLocationType.id > 0) {
            jsonResponse = { msg: 'LocationType updated' };
        }

        res.status(200).json(jsonResponse);
    }
    catch(error) {
        jsonResponse = { msg: 'Error updating LocationType', error};
    }

    res.json(jsonResponse);
}



export const deleteLocationType = (req: Request, res: Response) => {

    const { id } = req.params;

    let jsonResponse;
    let deletedLocationType;

    try {
        const locationType = facade.location_type.findByPk(id);
        if(locationType == null) {
            res.status(201).json({msg: 'LocationType does not exist'});
        }

        deletedLocationType = facade.location_type.update({active_row: false},
                                                {where: {id}});
        if(deleteLocationType == null) {
            jsonResponse = { msg: 'LocationType deleted'};
        }
    }
    catch(error) {
        jsonResponse = { msg: 'Error deleting locationType', error};
        res.status(500).json(jsonResponse);
    }

    res.status(200).json(jsonResponse);
}