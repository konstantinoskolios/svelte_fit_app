const express = require("express");
const app = express();
const cors = require("cors");

const {
  getUserByEmailAndPassword,
  addNewUser,
  getUserById,
  getCardByUserId,
  updateUserById,
  addCustomerTrack,
  insertCard,
  updateUserType,
  updateCardStatus,
  retrieveChartByCustomerId,
  getPasswordByEmail
} = require("./database");
const { calculateCalories } = require("./implementation");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailAndPassword(email, password);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User Not Exists");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.post("/newUser", async (req, res) => {
  try {
    const { email, password, name, user_type } = req.body;

    const user = await addNewUser(email, password, name, user_type);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getCardByUserId(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});


app.put("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, user_type } = req.body;
    const updatedUser = await updateUserById(userId, name, email, user_type);
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.put("/updateCardStatus", async (req, res) => {
  try {
    const formData = req.body
    const updateResponse = await updateCardStatus(formData);
    res.send(updateResponse);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.post("/daily_track_customer", async (req, res) => {
  try {
    const formData = req.body;
    const totalCalories = await calculateCalories(formData);
    addCustomerTrack(formData, totalCalories);
    res.send({ totalCalories });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.post("/add_new_card", async (req, res) => {
  try {
    const formData = req.body;
    const newCard = await insertCard(formData);
    await updateUserType(formData);
    res.send({ newCard });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


app.get("/customers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const retrieveChart = await retrieveChartByCustomerId(userId);
    res.send(retrieveChart);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});


app.post("/getPasswordByEmail",async(req,res) => {
  try{
    const formData = req.body;
    console.log(formData)
    const getPassword = await getPasswordByEmail(formData);
    res.send(getPassword);
  }catch(e){
    console.log(e)
    res.status(500).send(e.detail);
  }
})