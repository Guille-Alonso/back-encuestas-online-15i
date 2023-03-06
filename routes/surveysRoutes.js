const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth =  require("../middlewares/auth")
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");

const { addSurvey,deleteSurvey,editSurvey,getSurveys,editResponsesSurvey} = require("./../controllers/surveysControllers");

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
        check("name").not().isEmpty().isString().isLength({ min: 5, max: 50 }), check("estado").not().isEmpty().isString(),
        check("categoria").not().isEmpty().isMongoId(),check("user").not().isEmpty().isMongoId().custom(checkIfUserExists),
        check("unaRespuestaPorPersona").isBoolean(),
        validateFields,
    ], 
    addSurvey
    );

router.put(
    "/",
    [
        auth, verifyRole,
        check("id").not().isEmpty().isMongoId(),
        validateFields,
    ],
    editSurvey
    );

    router.put(
        "/responses",
        [
            check("id").not().isEmpty().isMongoId(),
            validateFields,
        ],
        editResponsesSurvey
        );
module.exports = router;