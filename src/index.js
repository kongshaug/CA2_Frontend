import 'bootstrap/dist/css/bootstrap.css'

function populateTable(endpoint){
fetch("www.ajuhlhansen.dk/CA2/api/person/"+ endpoint)
            .then(res => res.json()) //in flow1, just do it
            .then(data => {
                // Inside this callback, and only here, the response data is available
                var allPersons = data.map(person => "<tr><td>" + person.firstname
                + "</td><td>" + person.lastname + "</td>"
                + "<td>" + person.email + 
                + "</td><td>"+ person.street + " "+ person.addInfo   
                + "</td><td>" + person.zip + " " + person.city 
                + "</td><td>" + person.hobbies.hobby.join(", ")
                + "</td><td>" + person.phones.phone.join(", ") 
                + "</td><td>" + '<button id = "'+person.firstname+ ', value="remove" type="button">Remove</button>'
                + "</td><td>" + '<button id = "'+person.firstname+ ', value="edit"" type="button">Edit</button>'
                + "</td></tr>");


                document.getElementById("tablebody").innerHTML = allPersons.join("");

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
                         

            document.getElementById("table").onclick = function(){ EditOrDelete(event.srcElement.id, event.srcElement.value )}

            function EditOrDelete(id, value){
               if(value === "remove")
               {
                removePerson(id);
                populateTable("all");

               }
               
                else if(value === "edit")
               {
                editPerson(id);
               }
               

            }

            function removePerson(id){

                    return fetch("www.ajuhlhansen.dk/CA2/api/person/" + id, {
                      method: 'delete'
                    })
                    .then(response => response.json());
                  }

            
            function editPerson(id){

            }

            populateTable("all");


            document.getElementById("phone").onclick = function(){populateTable("REST ENDPOINT NAME" + document.getElementById("phoneNumber").value) }
            document.getElementById("hobby").onclick = function(){populateTable("REST ENDPOINT NAME" + document.getElementById("hobbyName").value) }
            document.getElementById("city").onclick = function(){ populateTable("REST ENDPOINT NAME" + document.getElementById("CityName").value) }
            document.getElementById("countHobby").onclick = function(){ populateTable("REST ENDPOINT NAME" + document.getElementById("hobbyName").value) }

            function countPersonsWithHoppy(){
                var hobby = document.getElementById("hobbyName");
                fetch("www.ajuhlhansen.dk/CA2/api/person/count/"+ hobby)
                .then(res => res.json()) //in flow1, just do it
                .then(data => {
    
    
                    document.getElementById("countDiv").innerHTML = "the number of people with the given hobby is: "+data;

                    

                    
    
                });
            }
            

            document.getElementById("zip").onclick = GetAllZip;

            function GetAllZip(){
                HideOrShow("allZipcodes")
                
                fetch("www.ajuhlhansen.dk/CA2/api/person/zipcodes")
                .then(res => res.json())
                .then(data => {
                    var listofZips = data.map(zip => "<li>" + zip + "</li>")

                    document.getElementById("zipcode").innerHTML = listofZips.join("");

                });

            }