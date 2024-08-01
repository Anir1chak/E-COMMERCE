import express from "express";
import {
    getItems,search
  } from "../controllers/items.js";
  
  const router = express.Router();
  console.log("serch");
  router.get("/",search);

  
  
  export default router;