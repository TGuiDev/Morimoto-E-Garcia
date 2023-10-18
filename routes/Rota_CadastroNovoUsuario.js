const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Admin = require("../schemas/admin");

// Middleware para analisar JSON
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const newLogin = new Admin({
      Id: generateRandomId(),
      info: {
        nome: req.body.newnomelogin,
      },
      credencial: {
        email: req.body.newemaillogin,
        senha: req.body.newsenhalogin,
        acesso: req.body.newacessologin
      }
    });

    // console.log(newpost);
    await newLogin.save();
    res.redirect('/')
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

function generateRandomId() {
    const uniqueId = uuidv4();
    return uniqueId;
  }

module.exports = router;
