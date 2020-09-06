import ResponseService from "@/app/services/ResponseService";
import statusTypes from "@/app/enum/statusTypes";
import LoggingService from "@/app/services/LoggingService";
const Tag = require("@/models/tag");

import * as constant from "@/app/helpers/constant";

module.exports.Testing = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  LoggingService.consoleLog(`TESTING", "Here we are on ${apiVersion}`, {
    error: "error",
  });
  // Get List From the Queries and pass it to the response service
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
module.exports.getTagById = (req, res, next, id) => {
  Tag.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "No tag found",
      });
    }
    req.tag = cate;
    next();
  });
};

//ADD TAG
module.exports.addTag = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  const tag = new Tag(req.body); //fetching from front end
  // const { name } = req.body;
  // let data = [{ tag: tag }];
  tag.save((err, tag) => {
    return res
      .status(statusTypes.SUCCESS)
      .json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          tag
        )
      );
  });
};

//GET ALL Tags
module.exports.getAllTag = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  Tag.find().exec((err, tags) => {
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
          tags
        )
      );
  });
};

//GET SINGLE TAG BY ID
module.exports.getSingleTag = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  let data = [{ data: req.tag }];
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

//UPDATE Tag BY ID
module.exports.updateTag = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  const tag = req.tag;
  tag.name = req.body.name;
  // let data = [{ name: name}];

  tag.save((err, updatedTag) => {
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
          updatedTag
        )
      );
  });
};

//DELETE TAG BY ID
module.exports.deleteTag = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;

  let data = [{ data: "Deleted Successfully" }];
  const tag = req.tag;

  tag.remove((err, tag) => {
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
