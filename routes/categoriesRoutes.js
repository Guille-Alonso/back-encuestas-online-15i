const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth =  require("../middlewares/auth")
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists, checkIfNameCategoryExists } = require("../utils/customValidations");

const { editCategory,deleteCategory,getCategories, addCategory } = require("./../controllers/categoriesControllers");

const router = Router();

router.get("/:id?" ,getCategories);

  router.post(
    "/",
    [
        auth,verifyRole,
        check("name").not().isEmpty().isString().isLength({ min: 5, max: 50 }).custom(checkIfNameCategoryExists), 
        check("state").isBoolean(),
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
        check("id").not().isEmpty().isMongoId(),
        check("campos").custom(checkIfNameCategoryExists),
        validateFields,
    ],
    editCategory
    );

module.exports = router;