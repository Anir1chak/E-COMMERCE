import { db } from '../db.js';

export const getItems = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM store WHERE cat = ?" : "SELECT * FROM store";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err.toString());
        return res.status(200).json(data);
    });
};

export const search = (req, res) => {
    const string = req.query.string; // ensure 'search' is the correct query parameter
    //console.log(string);
    const q = "SELECT * FROM store WHERE item_name LIKE ?";
    db.query(q, [`%${string}%`], (err, data) => {
        //console.log(q);
        if (err) return res.status(500).json(err.toString());
        //console.log(res.status(200).json(data));
        return res.status(200).json(data);
    });
};
