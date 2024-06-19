// unlike http module, express is a third party module, so make sure it is installed first.
// we can install with the command: npm i express

// import express module after installing
const express = require("express");

// fs is built-in with installing nodejs
// import right away
const fs = require("fs");

const memberPath = "./members.json";
let memberData = JSON.parse(fs.readFileSync(memberPath, "utf-8"));

const trainerPath = "./trainers.json";
let trainerData = JSON.parse(fs.readFileSync(trainerPath, "utf-8"));

const app = express();

app.use(express.json()); // express.json() parses data

// creating endpoint
app.get("/", (req, res) => {
  res.json("Hello World");
});

/*** STATS ***/

app.get("/allCost", (req, res) => {
  let cost = 0;
  for (let i = 0; i < memberData.length; i++) {
    cost += memberData[i].membership.cost;
  }
  res.json(cost);
});

// total cost per trainer
app.get("/trainerCost/:_id", (req, res) => {
  let cost = 0;
  for (let i = 0; i < memberData.length; i++) {
    if (memberData[i].trainer_id == req.params._id) {
      cost += memberData[i].membership.cost;
    }
  }
  res.json(cost);
});

/*** MEMBERS ***/

// get all members
app.get("/members", (req, res) => {
  res.json(memberData);
});

// get all members along with trainer info
app.get("/members-trainers", (req, res) => {
  let allMembers = memberData.map((member) => {
    let trainer = trainerData.find(
      (trainer) => trainer.id == member.trainer_id
    );
    return { member, trainer };
  });
  res.json(allMembers);
});

// add new member
app.post("/members", (req, res) => {
  let newMember = { ...req.body, id: memberData.length + 1 };

  let memberIsExist = memberData.find(
    (member) => member.national_id == newMember.national_id
  );

  if (memberIsExist) {
    res.json("Member already exists.");
  } else {
    memberData.push(newMember);
    fs.writeFileSync(memberPath, JSON.stringify(memberData));
    res.json("Member added successfully.");
  }
});

// specific member: is membership valid?
app.get("/members/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let user = memberData.find((member) => member.id == id); // undefined if not found
  if (!user) {
    res.json({ message: "User not found" });
  } else if (
    new Date(user.membership.to) < new Date() ||
    user.status != "active"
  ) {
    res.json({ message: "Membership invalid, expired or frozen.", user });
  } else {
    res.json({ message: "Membership valid and active.", user });
  }
});

// update specific member
app.put("/members/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let user = memberData.find((member) => member.id == id); // undefined if not found
  if (!user) {
    res.json({ message: "User not found" });
  } else {
    let index = memberData.findIndex((member) => member.id == id);

    if (req.body.name) {
      memberData[index].name = req.body.name;
    }
    if (req.body.trainer_id) {
      memberData[index].trainer_id = req.body.trainer_id;
    }
    if (req.body.membership) {
      memberData[index].membership = req.body.membership;
    }

    fs.writeFileSync(memberPath, JSON.stringify(memberData));

    res.json({ message: "Member updated successfully.", user });
  }
});

// soft delete specific member (change membership status)
app.put("/members/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let user = memberData.find((member) => member.id == id); // undefined if not found
  if (!user) {
    res.json({ message: "User not found" });
  } else {
    let index = memberData.findIndex((member) => member.id == id);

    memberData[index].status = req.body.status;

    fs.writeFileSync(memberPath, JSON.stringify(memberData));

    res.json({ message: "Member deleted successfully.", user });
  }
});

/****** TRAINERS ******/

// get all trainers
app.get("/trainers", (req, res) => {
  res.json(trainerData);
});

// get all trainers along with their members
app.get("/trainers-members", (req, res) => {
  let allTrainers = trainerData.map((trainer) => {
    let members = memberData.filter(
      (member) => trainer.id == member.trainer_id
    );
    return { trainer, members };
  });
  res.json(allTrainers);
});

// add new trainer
app.post("/trainers", (req, res) => {
  let newTrainer = { ...req.body, id: trainerData.length + 101 };

  let trainerIsExist = trainerData.find(
    (trainer) => trainer.name == newTrainer.name
  );

  if (trainerIsExist) {
    res.json({ message: "Trainer already exists." });
  } else {
    trainerData.push(newTrainer);
    fs.writeFileSync(trainerPath, JSON.stringify(trainerData));
    res.json({ message: "Trainer added successfully." });
  }
});

// specific trainer with their members
app.get("/trainers/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let trainer = trainerData.find((trainer) => trainer.id == id); // undefined if not found
  if (!trainer) {
    res.json({ message: "Trainer not found" });
  } else {
    let members = memberData.filter((member)=> member.trainer_id == id)
    res.json({ trainer, members });
  }
});

// update specific trainer
app.put("/trainers/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let user = trainerData.find((trainer) => trainer.id == id); // undefined if not found
  if (!user) {
    res.json({ message: "Trainer not found." });
  } else {
    let index = trainerData.findIndex((trainer) => trainer.id == id);

    if (req.body.name) {
      trainerData[index].name = req.body.name;
    }

    fs.writeFileSync(trainerPath, JSON.stringify(trainerData));

    res.json({ message: "Trainer updated successfully.", user });
  }
});

// delete specific trainer
app.delete("/trainers/:id", (req, res) => {
  let { id } = req.params; // const id = req.params.id
  let user = trainerData.find((trainer) => trainer.id == id); // undefined if not found
  if (!user) {
    res.json({ message: "Trainer not found." });
  } else {
    let index = trainerData.findIndex((trainer) => trainer.id == id);
    
    trainerData.splice(index, 1);

    fs.writeFileSync(trainerPath, JSON.stringify(trainerData));

    res.json({ message: "Trainer deleted successfully.", user });
  }
});

// create server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
