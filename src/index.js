import 'bootstrap/dist/css/bootstrap.css'


populateTable("all");
document.getElementById("phone").onclick = function(){getPersonByNumber( document.getElementById("phoneNumber").value) }
document.getElementById("hobby").onclick = function(){populateTable("hobby/" + document.getElementById("hobbyName").value) }
document.getElementById("city").onclick = function(){ populateTable("city/" + document.getElementById("CityName").value) }
document.getElementById("countHobby").onclick = countPersonsWithHoppy;
document.getElementById("zip").onclick = GetAllZip;
document.getElementById("addPerson").onclick = addPerson;

function populateTable(endpoint){
fetch("https://www.ajuhlhansen.dk/CA2/api/person/"+ endpoint)
            .then(handleHttpErrors) //in flow1, just do it
            .then(data => {
                // Inside this callback, and only here, the response data is available
                var allPersons = data.map(person => "<tr><td>" + person.firstname
                + "</td><td>" + person.lastname + "</td>"
                + "<td>" + person.email 
                + "</td><td>"+ person.street + " "+ person.addInfo   
                + "</td><td>" + person.zip + " " + person.city 
                + "</td><td>" + person.hobbies.map(hobby => hobby.hobby).join(", ")
                + "</td><td>" + person.phones.map(phone => phone.phone).join(", ") 
                + "</td><td>" + '<button id = '+person.id+ ' value="remove" type="button">Remove</button>'
                + "</td></tr>");


                document.getElementById("tablebody").innerHTML = allPersons.join("");

            })
            .catch(err => {
                if(err.status)
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                else document.getElementById("error").innerHTML = "Network error";
            });
}

function HideOrShow(idOfElement) {
        var x = document.getElementById(idOfElement);
        if (x.style.display === "none") {
            x.style.display = "";
        } else {
             x.style.display = "none";
        }
        }
        HideOrShow("allZipcodes")      

        document.getElementById("table").onclick = function(){ deletePerson(event.srcElement.id)
}


function deletePerson(id) 
{
    
    const options = makeOptions("DELETE");
    fetch("https://www.ajuhlhansen.dk/CA2/api/person/" + id,options)
    .then(handleHttpErrors)
    .then(function(){populateTable("all")})
    .catch(err => {
        if(err.status)
        err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
        else document.getElementById("error").innerHTML = "Network error";
    });
}

            
function editPerson(id){

}

function getPersonByNumber(number){


        fetch("https://www.ajuhlhansen.dk/CA2/api/person/"+number)
        .then(handleHttpErrors)
        .then(data => {
         // Inside this callback, and only here, the response data is available
             var person = "<tr><td>" + data.firstname
            + "</td><td>" + data.lastname + "</td>"
            + "<td>" + data.email 
            + "</td><td>"+ data.street + " "+ data.addInfo   
            + "</td><td>" + data.zip + " " + data.city 
            + "</td><td>" + data.hobbies.map(hobby => hobby.hobby).join(", ")
            + "</td><td>" + data.phones.map(phone => phone.phone).join(", ") 
            + "</td><td>" + '<button id = "'+data.firstname+ ', value="remove" type="button">Remove</button>'
            + "</td><td>" + '<button id = "'+data.firstname+ ', value="edit"" type="button">Edit</button>'
            + "</td></tr>";
            
            document.getElementById("tablebody").innerHTML = person;
    
            })
            .catch(err => {
                if(err.status)
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                else document.getElementById("error").innerHTML = "Network error";
            });
}

          

function countPersonsWithHoppy(){
        var hobby = document.getElementById("hobbyName").value;

        fetch("https://www.ajuhlhansen.dk/CA2/api/person/count/"+ hobby)
                .then(handleHttpErrors)
                .then(data => {

        document.getElementById("countDiv").innerHTML = "the number of people with the given hobby is: "+data.count;
         })
         .catch(err => {
            if(err.status)
                err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
            else document.getElementById("error").innerHTML = "Network error";
        });

}
            

function GetAllZip(){
        
        HideOrShow("allZipcodes")
                
            fetch("https://www.ajuhlhansen.dk/CA2/api/person/zipcodes")
            .then(handleHttpErrors)
            .then(data => {
                var listofZips = data.zipcodes.map(zip =>  zip )

                document.getElementById("zipcodes").innerHTML = listofZips.join(", ");

            })
            .catch(err => {
                if(err.status)
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                else document.getElementById("error").innerHTML = "Network error";
            });
}

           
function addPerson(){

            var firstName =  document.getElementById("firstName").value;
            var LastName =  document.getElementById("lastName").value;
            var personEmail =  document.getElementById("email").value;
            var personCity =  document.getElementById("cityInfo").value;
            var personzip =  document.getElementById("zipcode").value;
            var personstreet =  document.getElementById("street").value;
            var personaddInfo =  document.getElementById("addInfo").value;
            
               
            const data = {firstname: firstName, lastname: LastName, email: personEmail, street: personstreet, addInfo: personaddInfo, city: personCity, zip: personzip};
            const options = makeOptions("POST",data);
            fetch("https://www.ajuhlhansen.dk/CA2/api/person/",options)
            .then(handleHttpErrors)
            .then(function(){populateTable("all")})
            .catch(err => {
                if(err.status)
                    err.fullError.then(e => document.getElementById("error").innerHTML = e.message);
                else document.getElementById("error").innerHTML = "Network error";
            });
    
}


function handleHttpErrors(res){
        if(!res.ok)
        return Promise.reject({status: res.status, fullError: res.json() });
        return res.json();
}

function makeOptions(method, body) {
        var opts =  {
        method: method,
        headers: {"Content-type": "application/json"}
        }
        if(body) opts.body = JSON.stringify(body);
        return opts;
}

          
                  