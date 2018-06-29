import * as app from "./App";
import  * as dotenv from 'dotenv';
dotenv.load();
const PORT = process.env.PORT || 3000;

app.default.listen(PORT, () => {
	console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
	console.log(`Express server listening on port ${PORT}`);
});