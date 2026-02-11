import express from 'express'
import blogRouter from './modules/blogModule/blog.controller.js'
import userRouter from './modules/userModule/user.controller.js'
import { checkConnection } from './db/db.connection.js'



export const bootstrap = async () => {
    const app = express()
    app.use(express.json())
    const PORT = 3000
    checkConnection()


    app.use("/user", userRouter);
    app.use('/blog', blogRouter)

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