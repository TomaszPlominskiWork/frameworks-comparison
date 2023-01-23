import { NextApiRequest, NextApiResponse } from "next";

export default async function GetStuff(req:NextApiRequest,res:NextApiResponse){
    res.status(200).json({stuff:'some stuff'});
}