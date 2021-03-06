import { Router } from 'express'
import * as tacosCtrl from "../controllers/tacos.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/tacos - GET
router.get("/", tacosCtrl.index)
// localhost:3000/tacos/:id - GET
router.get("/:id", tacosCtrl.show)
// localhost:3000/tacos/:id/edit
router.get("/:id/edit", tacosCtrl.edit)

// localhost:3000/tacos - POST
router.post("/", isLoggedIn, tacosCtrl.create)

// localhost:3000/tacos/:id/flip-tasty - PATCH
router.patch("/:id/flip-tasty", isLoggedIn, tacosCtrl.flipTasty)

// localhost:3000/tacos/:id - PUT
router.put("/:id", isLoggedIn, tacosCtrl.update)

// localhost:3000/tacos/:id - DELETE
router.delete("/:id", isLoggedIn, tacosCtrl.delete)

export {
  router
}