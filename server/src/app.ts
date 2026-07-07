//Create Express app, Register middleware, Register routes, Register error middleware
// this file does not start the server 

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware";
import { ApiResponse } from "./utils/apiResponse";
import rootRouter from "./routes/rootRouter";

const app = express(); //creates express application 

app.use(helmet()); //its a collection of 15 middlewares that set the http headers for stricter protection

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(morgan("dev")); // request logging middleware
/** "dev" is minimal and intentionally hides sensitive information to keep the terminal clean.
"combined" switches Morgan to the standard Apache combined log format. 
It automatically captures the user's remote IP address, the exact timestamp, 
and the User-Agent (their browser/device type) */

app.use(express.json()); // parses the raw JSON string coming from the client and attaches it as a neat JavaScript object onto the req.body property

app.use(express.urlencoded({extended:true})); /** 
This middleware targets incoming requests where the Content-Type is application/x-www-form-urlencoded
false: Uses a basic, legacy Node.js library called querystring. It can only parse simple, flat strings and pairs.
true: Uses a robust, modern library called qs. This allows the server to parse rich, deeply nested objects and arrays
sent via form data. */

app.use("/api",rootRouter);

app.use((req, res) => {
  return ApiResponse.error(res, 404, "Route not found");
});

// "*" means match everything, so for those routes which are not defined they are directed to this.

//global error middleware
app.use(errorHandler);