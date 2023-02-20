const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth =  require("../middlewares/auth")
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");

const { addSurvey,deleteSurvey,editSurvey,getSurveys} = require("./../controllers/surveysControllers");

const router = Router();

router.get("/:id?",getSurveys);

router.delete(
    "/",
    [
      auth, verifyRole,
      check("id").not().isEmpty().isMongoId(),
      validateFields,
    ],
    deleteSurvey
  );

router.post(
    "/",
    [
        auth,
        check("name").not().isEmpty().isString().isLength({ min: 5, max: 50 }), check("state").not().isEmpty().isString(),
        check("category").not().isEmpty().isMongoId(), check("user").not().isEmpty().isMongoId().custom(checkIfUserExists),
        validateFields,
    ], 
    addSurvey
    );

router.put(
    "/",
    [
        auth, verifyRole,
        check("campos").isObject(),check("id").not().isEmpty().isMongoId(),
        validateFields,
    ],
    editSurvey
    );

module.exports = router;