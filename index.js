import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import qrcode from "qrcode";

//import bcrypt from "bcrypt";

const app = express();
const port = 4000;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bus project",
    password: "samshinde",
    port: 5432,
});
db.connect().catch((err) => {
    console.error("Could not connect to PostgreSQL. Check the credentials in index.js:", err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login", (req, res) => {
   res.render("login.ejs");
});

app.get("/passenger_details", (req, res) => {
   res.render("passenger_details.ejs");
    
});

app.get("/pay", (req, res) => {
    res.render("pay.ejs");
});

app.get("/generated", (req, res) => {
    res.render("generated.ejs");
 });

 app.get("/scan", (req, res) => {
    res.render("scan.ejs");
 });

 app.get("/scan_txt", (req, res) => {
    res.render("scan_txt.ejs");
 });

 app.get("/bus_qr", (req, res) => {
    res.render("bus_qr.ejs");
 });

 app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/register", async (req, res) => {
    //const is_logged = no;
    const name = req.body.name;
    const age = req.body.age;
    const contact = req.body.contact;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(age < 13){
        res.redirect("about");
    }
else {
 
    
            const result = await db.query(
                "INSERT INTO bus_tbl (name,age,contact,email,username,password) VALUES ($1, $2, $3, $4, $5, $6)",
                [name,age,contact,email,username,password]
            );
            console.log(result);
            res.render("login.ejs",{name : name});
        }
}
    );

    app.post("/login", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const loginPassword = req.body.password;
       
        try{
            const result = await db.query("SELECT * FROM bus_tbl WHERE username = $1", [
                username,
            ]);
    
            if(result.rows.length > 0) {
                //console.log(result.rows);
                
             const username = result.rows[0];
                const storedHashedPassword = username.password;
                
                    if(password === storedHashedPassword){
                        res.render("passenger_details.ejs",{name : username});
                    }
                    else{
                        res.render("login.ejs");
                        
                    }
                
    
            } else {
                res.send("User not found");
                }
            } catch (err) {
            console.log(err);
        }
    
    });

    app.post("/passenger_details", async (req, res) => {
        const name = req.body.name;
        let price;
        const age = req.body.age;
        const email = req.body.email;
        const location = req.body.location;
        
        //const price = req.body.price;
        if(age <13)
        {
            res.redirect("passenger_details");
        }
        else{
        switch(location) {
            case 'Pune-Solapur':
                price = 1500;
                break;
            case 'Solapur-Pandharpur':
                price = 1800;
                break;
            case 'Solapur-Nashik':
                price = 2000;
                break;
            default:
                price = 'unknown';
                break;
        }
    
        
        

                const result = await db.query(
                    "INSERT INTO details (name,age,email,location) VALUES ($1, $2, $3, $4)",
                    [name,age,email,location]
                );
                console.log(result);
                
                res.render("pay.ejs",{name : name, email : email, location : location, mon :price});
            }
    }

        );

        app.post('/pay', (req, res) => {
            const { name, email, location, mon } = req.body;
            const passTime = new Date(req.body.passTime);
            const expiryDate = new Date(passTime);
            expiryDate.setDate(expiryDate.getDate() + 30); // Add 30 days
        
            res.render('generated.ejs', { name, email, location, mon, passTime, expiryDate });
        });
       
        app.post('/generated', (req, res) => {
            const { name, email, location, mon, passTime,expiryDate } = req.body;
            console.log(name, email, location, mon, passTime,expiryDate);
        
            const passDetails = `
        Name: ${name}
        Email: ${email}
        Location: ${location}
        Price: ${mon}
        Pass Time: ${passTime}
        Expiry Date: ${expiryDate}`;
            qrcode.toDataURL(passDetails, (err, src) => {
                res.render('bus_qr.ejs', {
                    qr_code3: src,
                })
            })
        })
        
        app.post('/scan', (req, res) => {
            const input_text = req.body.text;
            console.log(input_text);
            qrcode.toDataURL(input_text, (err, src) => {
                res.render('scan_txt.ejs', {
                    qr_code: src,
                })
            })
        })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
    db.end(() => {
        console.log('Database connection closed.');  
        process.exit(0);
    });
});


