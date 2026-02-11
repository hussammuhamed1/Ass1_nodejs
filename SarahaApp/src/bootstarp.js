import express from 'express'
import { DB_connection } from './db/db.connection.js'
import { AuthRouter } from './modules/auth/auth.controller.js'



export const bootstrap = async () => {
    const app = express()
    app.use(express.json())
    const PORT = 3000
    DB_connection()
    app.use("/auth", AuthRouter)


   
    app.all('{/*dummy}', (req, res) => {
        throw new Error(`invalid url ${req.path} with method ${req.method}`, {
            cause: {
                status: 400
            }
        })

    })






    app.use((err, req, res, next) => {
        if (err) {

            return res.status(err.cause?.status || 500).json({
                errMsg: err.message
            });
        }
    });

    app.listen(PORT, () => {
        console.log("server running on port => ", PORT);
    })
}