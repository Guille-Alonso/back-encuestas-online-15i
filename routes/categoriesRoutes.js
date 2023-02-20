const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth =  require("../middlewares/auth")
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");

const { editCategory,deleteCategory,getCategories, addCategory } = require("./../controllers/categoriesControllers");

const router = Router();

router.get("/:id?",auth, verifyRole ,getCategories);

  router.post(
    "/",
    [
        auth,verifyRole,
        check("name").not().isEmpty().isString().isLength({ min: 5, max: 50 }), check("state").isBoolean(),
        validateFields,
    ], 
    addCategory
    );

  router.delete(
    "/",
    [
      auth, verifyRole,
      check("id").not().isEmpty().isMongoId(),
      validateFields,
    ],
    deleteCategory
  );

router.put(
    "/",
    [
        auth, verifyRole,
        check("campos").isObject(),check("id").not().isEmpty().isMongoId(),
        validateFields,
    ],
    editCategory
    );

module.exports = router;