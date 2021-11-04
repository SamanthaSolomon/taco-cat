import { Taco } from "../models/taco.js"

function index(req, res) {
  // Find all tacos
  Taco.find({})
  // When we have all the tacos
  .then(tacos => {
    // Do something with the tacos
    res.render("tacos/index", {
      title: "🌮",
      tacos,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.tasty = !!req.body.tasty
  Taco.create(req.body)
  .then(taco => {
    res.redirect("/tacos")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function show(req, res) {
  Taco.findById(req.params.id)
  .populate("owner")
  .then(taco => {
    res.render("tacos/show", {
      taco,
      title: "🌮 show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function flipTasty(req, res) {
  Taco.findById(req.params.id)
  .then(taco => {
    taco.tasty = !taco.tasty
    taco.save()
    .then(() => {
      res.redirect(`/tacos/${taco._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function edit(req, res) {
  Taco.findById(req.params.id)
  .then(taco => {
    res.render("tacos/edit", {
      title: "Edit 🌮",
      taco,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

function update(req, res) {
  Taco.findById(req.params.id)
  .then(taco => {
    if (taco.owner.equals(req.user.profile._id)) {
      // the person that created the taco is trying to edit the taco
      req.body.tasty = !!req.body.tasty
      taco.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/tacos/${taco._id}`)
      })
    } else {
      // the person that created the taco is NOT the person trying to edit the taco
      throw new Error ("🚫 Not Authorized! 🚫")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

export {
  index,
  create,
  show,
  flipTasty,
  edit,
  update,
}