import app from "./app";
import  * as dotenv from 'dotenv';
dotenv.load();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}`);
})