import {Router} from "express";
import getDbConnection from "../db/DbManager";

const collection_name = "stockData";

module.exports = (router: Router) => {
    router.get("/data", async (req: any, res: any) => {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const dbConnection =  await getDbConnection();
         dbConnection.collection(collection_name).find({})
            .sort( { _id : -1})
            .skip(skip)
            .limit(limit)
             .toArray()
            .then((data: any) => {
                return res.status(200).json(data);
            })
            .catch((error: any) => {return res.status(500).json(error)});

    });
    router.post("/data", async (req: any, res: any) => {
        try {
            const data = {
                Open: parseInt(req.body.Open),
                Close: parseInt(req.body.Close),
                Date: req.body.Date,
                High: 0,
                Low: 0
            };
            const dbConnection =  await getDbConnection();
            let insertedData = await dbConnection.collection(collection_name).insertOne(data);
            return res.status(200).json(insertedData);
        } catch(e) {
            return res.status(500).json(e)
        }

    });
    return router;
};
