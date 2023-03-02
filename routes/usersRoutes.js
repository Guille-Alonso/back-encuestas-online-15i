const { Router } = require("express");
const verifyRole = require("../middlewares/verifyRole");
const auth =  require("../middlewares/auth")
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");

const { getUsers, register, editUser, deleteUser, getAuthStatus, login, addUser} = 
require("./../controllers/usersControllers");

const router = Router();

router.get("/email/:email?",auth, verifyRole ,getUsers);

router.get("/authStatus", auth, getAuthStatus);

router.post(
  "/",
  [
      auth,verifyRole,
      check("name").not().isEmpty().isString().isLength({ min: 5, max: 50 }), check("email").isEmail().isLength({ min: 5, max: 50 }),
      check("password")
        .not()
        .isEmpty()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        check("admin").isBoolean(),
        validateFields,
  ], 
  addUser
  );

router.post(
    "/login",
    [
      check("email").isEmail().isLength({ min: 5, max: 50 }),
      check("password").not().isEmpty().isLength({ min: 5, max: 50 }),
      validateFields,
    ],
    login
  );

  router.post(
    "/register",
    [
      check(
        "name",
        "El formato del nombre debe ser un string de entre 2 y 30 caracteres"
      )
        .isString()
        .isLength({ min: 2, max: 30 }),
      check("email").isEmail().isLength({ min: 5, max: 50 }),
      check("password")
        .not()
        .isEmpty()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      validateFields,
    ],
    register
  );

  router.delete(
    "/",
    [
      auth, verifyRole,
      check("id").not().isEmpty().isMongoId().custom(checkIfUserExists),
      validateFields,
    ],
    deleteUser
  );

router.put(
    "/",
    [
        auth, verifyRole,
        check("id").not().isEmpty().isMongoId().custom(checkIfUserExists),
        validateFields,
    ],
    editUser
    );

module.exports = router;
