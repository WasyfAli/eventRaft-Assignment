import ResponseService from "@/app/services/ResponseService";
import statusTypes from "@/app/enum/statusTypes";
import LoggingService from "@/app/services/LoggingService";

import * as constant from "@/app/helpers/constant";
const People = require("@/models/people");

module.exports.Testing = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  LoggingService.consoleLog(`TESTING", "Here we are on ${apiVersion}`, {
    error: "error",
  });
  let data = [{ data: "data" }];
  return res
    .status(statusTypes.SUCCESS)
    .json(
      ResponseService.sendResponse(
        statusTypes.SUCCESS,
        constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
        apiVersion,
        data
      )
    );
};

// MIDDLEWARE-PARAMETER EXTRACTER
module.exports.getNameById = (req, res, next, id) => {
  People.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "No user found",
      });
    }
    //if user found

    req.people = cate;
    next();
  });
};

//ADD PEOPLE
module.exports.addPeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  const people = new People(req.body); //fetching from front end
  const { name } = req.body;
  console.log(name);
  let data = [{ name: name }];
  people.save((err, people) => {
    return res
      .status(statusTypes.SUCCESS)
      .json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          data
        )
      );
  });
};

//GET ALL PEOPLES
module.exports.getAllPeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  People.find().exec((err, peoples) => {
    if (err) {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            err
          )
        );
    }
    res
      .status(statusTypes.SUCCESS)
      .json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          peoples
        )
      );
  });
};

//GET SINGLE USER BY ID
module.exports.getSinglePeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  let data = [{ data: req.people }];
  res
    .status(statusTypes.SUCCESS)
    .json(
      ResponseService.sendResponse(
        statusTypes.SUCCESS,
        constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
        apiVersion,
        data
      )
    );
};

//UPDATE USER BY ID
module.exports.updatePeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  const people = req.people;
  people.name = req.body.name;
  // let data = [{ name: name}];

  people.save((err, updatedName) => {
    if (err) {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            err
          )
        );
    }
    res
      .status(statusTypes.SUCCESS)
      .json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          updatedName
        )
      );
  });
};

//DELETE USER BY ID
module.exports.deletePeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;

  let data = [{ data: "Deleted Successfully" }];
  const people = req.people;
  console.log("PEOPPLE", people);
  people.remove((err, category) => {
    if (err) {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            err
          )
        );
    }
    res
      .status(statusTypes.SUCCESS)
      .json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          data
        )
      );
  });
};
