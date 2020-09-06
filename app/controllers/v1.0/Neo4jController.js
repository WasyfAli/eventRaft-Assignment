import ResponseService from "@/app/services/ResponseService";
import statusTypes from "@/app/enum/statusTypes";
import LoggingService from "@/app/services/LoggingService";

import * as constant from "@/app/helpers/constant";
import { driver } from "../../../server";
var session = driver.session();

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

//Add People
module.exports.addPeople = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;

  const name = req.body.name;
  session
    .run("CREATE(n:People {name: $nameParam}) RETURN n.name", {
      nameParam: name,
    })
    .then((result) => {
      return res
        .status(statusTypes.SUCCESS)
        .json(
          ResponseService.sendResponse(
            statusTypes.SUCCESS,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            result
          )
        );
    })
    .catch((error) => {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            error
          )
        );
    });
};

//GET ALL PEOPLES
module.exports.getAllPeoples = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;
  session
    .run("MATCH (n:People) RETURN n")
    .then((result) => {
      var peopleArray = [];
      result.records.forEach((record) => {
        peopleArray.push({
          id: record._fields[0].identity.low,
          name: record._fields[0].properties.name,
        });
      });
      return res.status(statusTypes.SUCCESS).json(
        ResponseService.sendResponse(
          statusTypes.SUCCESS,
          constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
          apiVersion,
          peopleArray
          //result
        )
      );
    })
    .catch((error) => {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            error
          )
        );
    });
};

//Add RelationShip
module.exports.addRelation = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;

  const peopleFirst = req.body.peopleFirst;
  const peopleSecond = req.body.peopleSecond;
  const relationship = req.body.tagName;

  session
    .run(
      `MATCH (a:People {name: $nameParamOne}), (b:People {name: $nameParamTwo}) MERGE(a)-[r: ${relationship}]->(b) RETURN a,b`,
      {
        nameParamOne: peopleFirst,
        nameParamTwo: peopleSecond,
        // relationParam: relationship,
      }
    )
    .then((result) => {
      return res
        .status(statusTypes.SUCCESS)
        .json(
          ResponseService.sendResponse(
            statusTypes.SUCCESS,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            result
          )
        );
    })
    .catch((error) => {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            error
          )
        );
    });
};

//Get RelationShip
module.exports.getRelation = (req, res) => {
  let apiVersion = req["meta"] ? req.meta["version"] || null : null;

  const peopleFirst = req.body.peopleFirst;
  const peopleSecond = req.body.peopleSecond;

  session
    .run(
      "MATCH (a:People { name:$nameParamOne }),(b:People { name:$nameParamTwo }), p = shortestPath((a)-[*..15]-(b)) RETURN p",
      {
        nameParamOne: peopleFirst,
        nameParamTwo: peopleSecond,
      }
    )
    .then((result) => {
      //   return result.records.map((record) => {
      //     // Iterate through records
      //     var segments = record._fields[0].segments;
      //     var path = "";
      //     segments.forEach(
      //       (segment) => (path = path.concat(segment.start.properties.name + "|"))
      //     );
      //     path = path.concat(segments[segments.length - 1].end.properties.name);
      //     console.log(`Path from  to : ${path}`);
      //   });
      result.records.map((record) => {
        // Iterate through records
        var segments = record._fields[0].segments;
        var path = "";
        segments.forEach(
          (segment) =>
            (path = path.concat(segment.start.properties.name + " >> "))
        );
        path = path.concat(segments[segments.length - 1].end.properties.name);
        console.log(`${path}`);
        // res.json({ path: `${path}` });
        return res
          .status(statusTypes.SUCCESS)
          .json(
            ResponseService.sendResponse(
              statusTypes.SUCCESS,
              constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
              apiVersion,
              `${path}`
            )
          );
      });
    })
    .catch((error) => {
      res
        .status(statusTypes.BAD_REQUEST)
        .json(
          ResponseService.sendResponse(
            statusTypes.BAD_REQUEST,
            constant.CUSTOM_RESPONSE_MESSAGES.USER_RES,
            apiVersion,
            error
          )
        );
    });
};
