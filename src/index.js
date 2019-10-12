import 'bootstrap/dist/css/bootstrap.css'

function populateTable(endpoint){
fetch("https://www.ajuhlhansen.dk/CA2/api/person/"+ endpoint)
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
              HideOrShow("allZipcodes")      

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
                fetch("https://www.ajuhlhansen.dk/CA2/api/person/count/f")
                .then(res => res.json()) //in flow1, just do it
                .then(data => {
    
    
                    document.getElementById("countDiv").innerHTML = "the number of people with the given hobby is: "+data.count;

                    

                    
    
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
            document.getElementById("addPerson").onclick = addPerson;
            function addPerson(){

               var firstName =  document.getElementById("firstName").value
               var LastName =  document.getElementById("LastName").value
               var email =  document.getElementById("email").value
               var city =  document.getElementById("city").value
               var zip =  document.getElementById("zip").value
               var street =  document.getElementById("street").value
               var addInfo =  document.getElementById("addInfo").value
               var payload = '{\"firstname\": \"'+firstName+'\",'
               + '\"lastname\": \"'+LastName+'\",'
               + '\"email\": \"'+email+'\",'
               + '\"street\": \"'+street+'\",'
               + '\"addInfo\": \"'+addInfo+'\",'
               + '\"city\": \"'+city+'\",'
               + '\"zip\": \"'+zip+'\"}';



          //     try {
          //    const data = await postData('https://www.ajuhlhansen.dk/CA2/api/person', payload);
          //      console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
          //    } catch (error) {
          //      console.error(error);
          //    }
          //    
          //    async function postData(url = '', data = {}) {
          //      // Default options are marked with *
          //      const response = await fetch(url, {
          //        method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //        mode: 'cors', // no-cors, *cors, same-origin
          //        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //        credentials: 'same-origin', // include, *same-origin, omit
          //        headers: {
          //          'Content-Type': 'application/json'
          //          // 'Content-Type': 'application/x-www-form-urlencoded',
          //        },
          //        redirect: 'follow', // manual, *follow, error
          //        referrer: 'no-referrer', // no-referrer, *client
          //        body: JSON.stringify(data) // body data type must match "Content-Type" header
          //      });
          //      return await response.json(); // parses JSON response into native JavaScript objects
          //    }
          //    populateTable("all");
          //
             }