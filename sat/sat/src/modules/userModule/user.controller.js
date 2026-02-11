import { Router } from "express"
import { sayHello } from "./user.service.js"
import { asyncHandler } from "../../utils/catchError.js"
const router = Router()




// router.get('/test', async (req, res, next) => {
//     const name = req.query.name
//     const data = await sayHello(name)
//     res.json({ msg: data })
// })
router.get('/test', async (req, res, next) => {
    const name = req.query.name
    const data = await sayHello(name)
    res.json({ msg: data })
})

export default router