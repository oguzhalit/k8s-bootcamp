import app from "./app";
import  * as dotenv from 'dotenv';
dotenv.load();
const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
	console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
	console.log(`Express server listening on port ${PORT}`);
});

export function stop() {
	server.close();
}