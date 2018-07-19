import * as app from "./App";
import  * as dotenv from 'dotenv';
dotenv.load();
const PORT = process.env.PORT || 3000;

app.default.listen(PORT, () => { console.log(`Express server on ${process.env.NODE_ENV} listening on port ${PORT}`); });