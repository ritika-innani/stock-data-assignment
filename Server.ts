const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express.Router();
const data = require("./routes/Data")(router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", data);

app.get("/", (req: any, res: any) => {
    res.status(200).json({message: "working"});
});

const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
