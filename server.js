const url = require("url");
const http = require("http");
const querystring = require("querystring");
let brojac=1;
let oglasi=[
    {
        "id":0,
        "KategorijaOglasa":"Automobil-Mercedes Benz",
        "Datum":"28.05.2020",
        "Cena":120000+"$",
        "TekstOglasa":"Prodaje se nov mercedes, cena fiksna",
        "Oznaka":[
            "Benz",
            "Auta",
            "Limuzina"
        ],
        "Email":"Nesto12@tamo.com"
    },
    {
        "id":1,
        "KategorijaOglasa":"Automobil-Range Rover",
        "Datum":"28.05.2020",
        "Cena":80000+"$",
        "TekstOglasa":"Range Rover crvene boje, nov iz salona, moguca korekcija u ceni",
        "Oznaka":[
            "Rover",
            "Auta",
            "SUV"
        ],
        "Email":"Nesto1@tamo.com"
    }
];

const server=http.createServer(function(request,response){
    let urlObj=url.parse(request.url,true,false);
    if(request.method == "GET"){
        if(urlObj.pathname=="/"){
            res=sviOglasi();
            response.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <title>Svi Oglasi</title>
                <style>
                    table, th, td {
                        border: 1px solid black;
                    }
                </style>
              </head>
              <body>
                <h1>Oglasi</h1><br>
                <a href="/">Svi oglasi</a><br><br>
                <p>***********************************</p>
                <h4>Dodajte vas oglas!</h4><br>
                <a href="/dodajoglas">Dodaj oglas</a></p>
                <p>***********************************</p>
                <h4>Filtriraj po ceni:</h4>
                <form action="/filtrirajcenuasc" method="POST">
                <button type="submit" name="Cena" value="Cena">Cena rastuca</button>
                </form><br>
                <form action="/filtrirajcenudesc" method="POST">
                <button type="submit" name="Cena" value="Cena">Cena opadajuca</button>
                </form><br>
                <p>***********************************</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Kategoriaj oglasa</th>
                                <th>Datum</th>
                                <th>Cena</th>
                                <th>Tekst oglasa</th>
                                <th>Oznaka</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                
            `);
            for(let o of res){
                response.write(`
                    <tr>
                        <th>${o.KategorijaOglasa}</th>
                        <th>${o.Datum}</th>
                        <th>${o.Cena}</th>
                        <th>${o.TekstOglasa}</th>
                        <th>${o.Oznaka}</th>
                        <th>${o.Email}</th>
                        <td>
                            <form action="/obrisioglas" method="POST">
                            <input type="hidden" name="id" value="${o.id}">
                            <button type="submit">Obrisi oglas</button>
                            </form>
                        </td>
                        <td><a href='/izmenioglas?id=${o.id}'>Izmeni oglas</a></td>
                    </tr>
                `);
            }
            response.end(`
                        </tbody>
                    </table>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </body>
            </html>
            `);
        }
        if(urlObj.pathname=="/dodajoglas"){
            response.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <title>Svi Oglasi</title>
                <style>
                        table, th, td {
                            border: 1px solid black;
                        }
                    </style>
              </head>
              <body>
                <h2>Dodaj oglas</h2>
                        <form action="/dodajuoglase" method="POST">
                        <input type="hidden" name="id" value="id"><br>
                        Kategorija: <input type="text" name="KategorijaOglasa"><br>
                        Datum: <input type="text" name="Datum"><br>
                        Cena: <input type="number" name="Cena"><br>
                        TekstOglasa: <input type="text" name="TekstOglasa"><br>
                        Oznaka: <input type="text" name="Oznaka"><br>
                        Email: <input type="text" name="Email"><br>
                        <button type="submit">Dodaj oglas</button>
                        </form>
            `);
            response.end(`
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </body>
            </html>
            `);

        }
        if(urlObj.pathname=="/izmenioglas"){
            let oglas=oglasi.find(x => x.id == urlObj.query.id);
            response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Izmeni oglas</title>
            </head>
            <body>
                <h3>Izmeni oglas</h3>
                <a href="/">Svi oglasi</a>
                <br><br>
                <form action='/postavioglas' method='POST'>
                    id: <input type='number' name='id' value='${oglas.id}' readonly><br><br>
                    KategorijaOglasa: <input type='text' name='KategorijaOglasa' value='${oglas.KategorijaOglasa}'><br><br>
                    Datum: <input type='text' name='Datum' value='${oglas.Datum}'><br><br>
                    Cena: <input type='number' name='Cena' value='${oglas.Cena}'><br><br>
                    TekstOglasa: <input type='text' name='TekstOglasa' value='${oglas.TekstOglasa}'><br><br>
                    Oznaka: <input type='text' name='Oznaka' value='${oglas.Oznaka}'><br><br>
                    Email: <input type='text' name='Email' value='${oglas.Email}'><br><br>
                    <button type='submit'>Postavi oglas</button>
                </form>
            `);
            response.end(`
            </body>
            </html>
            `);
        }



    }
    if(request.method == "POST"){
        if(urlObj.pathname=="/dodajuoglase"){
            let body="";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                NapraviOglas(querystring.parse(body).id,querystring.parse(body).KategorijaOglasa,querystring.parse(body).Datum,querystring.parse(body).Cena,querystring.parse(body).TekstOglasa,querystring.parse(body).Oznaka,querystring.parse(body).Email);
                response.writeHead(302,{
                    "Location" : "/"
                });
                response.end();
            });
            
        }
        if(urlObj.pathname=="/obrisioglas"){
            let body="";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                ObrisiOglas(querystring.parse(body).id);
                response.writeHead(302,{
                    "Location" : "/"
                });
                response.end();
            });
            
        }
        if(urlObj.pathname=="/postavioglas"){
            let body="";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                PromeniOglas(querystring.parse(body).id,querystring.parse(body).KategorijaOglasa,querystring.parse(body).Datum,querystring.parse(body).Cena,querystring.parse(body).TekstOglasa,querystring.parse(body).Oznaka,querystring.parse(body).Email);
                response.writeHead(302,{
                    "Location" : "/"
                });
                response.end();
            });
            
        }
        if(urlObj.pathname=="/filtrirajcenuasc"){
            let body="";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                FilterPoCeniAsc();
                response.writeHead(302,{
                    "Location" : "/"
                });
                response.end();
            });
            
        }
        if(urlObj.pathname=="/filtrirajcenudesc"){
            let body="";
            request.on("data",function(data){
                body+=data;
            });
            request.on("end",function(){
                FilterPoCeniDesc();
                response.writeHead(302,{
                    "Location" : "/"
                });
                response.end();
            });
            
        }
    }


});

function sviOglasi(){
    return oglasi;
}

function NapraviOglas(id,kategorija,datum,cena,tekst,oznaka,email){

    let noviOglas={
        "id":id=++brojac,
        "KategorijaOglasa":kategorija,
        "Datum":datum,
        "Cena":cena+"$",
        "TekstOglasa":tekst,
        "Oznaka":oznaka,
        "Email":email
    }
    
    oglasi.push(noviOglas);
}

function ObrisiOglas(id){
    let pom=[];
    for(let i=0;i<oglasi.length;i++){
        if(oglasi[i].id!=id){
            pom.push(oglasi[i]);
        }
    }
    oglasi = pom;
    return oglasi;
}


function PromeniOglas(id,kategorija,datum,cena,tekst,oznaka,email){
    for(let i=0;i<oglasi.length;i++){
        if(oglasi[i].id == id){
            oglasi[i].KategorijaOglasa=kategorija;
            oglasi[i].Datum=datum;
            oglasi[i].Cena=cena+"$";
            oglasi[i].TekstOglasa=tekst;
            oglasi[i].Oznaka=oznaka;
            oglasi[i].Email=email;
        }
    }
}

function FilterPoCeniAsc(){
    let pom=[];
    for(let i=0;i<oglasi.length-1;i++){
        for(let j=i+1;j<oglasi.length;j++){
            if(parseInt(oglasi[i].Cena)>parseInt(oglasi[j].Cena)){
                pom=oglasi[i];
                oglasi[i]=oglasi[j];
                oglasi[j]=pom;
            }
        }
        
    }
}

function FilterPoCeniDesc(){
    let pom=[];
    for(let i=0;i<oglasi.length-1;i++){
        for(let j=i+1;j<oglasi.length;j++){
            if(parseInt(oglasi[i].Cena)<parseInt(oglasi[j].Cena)){
                pom=oglasi[i];
                oglasi[i]=oglasi[j];
                oglasi[j]=pom;
            }
        }
        
    }
}




const port=5001;
const host="localhost";
server.listen(port,host);
console.log(`Server radi na adresi: http://${host}:${port}`)
/*for(let i=0;i<oglasi.length;i++){
    console.log(oglasi[i]);
}*/
//console.log("Svi oglasi"+oglasi);