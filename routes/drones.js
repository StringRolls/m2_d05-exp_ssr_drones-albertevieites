const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model')

// Iteration #2: List the drones
router
  .route('/drones')
  .get((req, res) => {
    Drone.find()
      .then((allDronesFromDB) => {
        console.log(`${allDronesFromDB.length} drones found`)
        res.render("drones/list", { drones: allDronesFromDB });
      })
      .catch((err) => console.log("Error while getting the drones from the DB: ", err)) 
  })

// Iteration #3: Add new drone
router
  .route('/drones/create')
  .get((req, res) => res.render("drones/create-form"))
  .post((req, res) => {
    Drone.create(req.body)
      .then(() =>  res.redirect("/drones"))
      .catch(err => res.redirect("/drones/create"))
  })

// Iteration #4: Update the drone
router
  .route('/drones/:id/edit')
  .get((req,res) => {
    const { id } = req.params
    Drone.findById(id)
      .then(drone => res.render('drones/update-form'))
  })
  .post((req, res) => {
    const name = req.body.name;
    const propellers = req.body.propellers;
    const maxSpeed = req.body.maxSpeed;

    Drone.findOneAndUpdate(req.params.id, { name, propellers, maxSpeed })
      .then(updatedDrone => console.log(`The updated drone is ${updatedDrone}`))
      .then(() => res.redirect('drones'))
      .catch (err => console.log("Unable to update the drone: ", err))
  })

// Iteration #5: Delete the drone
  router
    .route('/drones/:id/delete')
    .post((req, res) => {
      Drone.deleteOne({_id: req.params.id})
        .then(() => res.redirect("/drones"))
  });

module.exports = router;
