function getStatusValve(){
    let url = " http://127.0.0.1:8000/StatusInfo/";
        fetch(url)
          .then((res) => res.json())
            .then(function(data){
            let list = data;
            // console.log(list[0]['status'])
              document.getElementById("v1").innerHTML= list[0]['status']
              document.getElementById("v2").innerHTML= list[1]['status']
              document.getElementById("v3").innerHTML= list[2]['status']
              document.getElementById("v4").innerHTML= list[3]['status']
              if(list[0]['status'] == "Off" && list[1]['status'] == "Off" && list[2]['status'] == "Off" && list[3]['status'] == "Off"){
                changeStatusPump(1,"Off")
                document.getElementById("p1").innerHTML= list[0]['status']
              }else{
                changeStatusPump(1,"On")
                document.getElementById("p1").innerHTML= list[0]['status']
              }
            }
)};


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
              }
            }
          }
      return cookieValue;
        }
        
const csrftoken = getCookie("csrftoken");

function changeStatusValve(task){
    valve_id = task
    let url = ` http://127.0.0.1:8000/StatusInfo/${valve_id}/`;
    fetch(url)
      .then((res) => res.json())
        .then(function(data){
        let list = data;
        console.log(list['status'])
        let status = "On"
        if (list['status'] == "Off"){
            status = "On"
        }
        else{
            status = "Off"
        }
        let url = ` http://127.0.0.1:8000/StatusInfo/${valve_id}/`;
        fetch(url,{
        method:"PUT",
        headers:{
            "Content-type" : "application/json",
            "X-CSRFToken" : csrftoken,
        },
        body:JSON.stringify({status: status}),
        }).then(function(){
          getStatusValve()
        });
    }
)}

function changeStatusPump(task,status){
    Pump_id = task
    let url = ` http://127.0.0.1:8000/WaterPump/${Pump_id}/`;
    fetch(url,{
    method:"PUT",
    headers:{
        "Content-type" : "application/json",
        "X-CSRFToken" : csrftoken,
    },
    body:JSON.stringify({status: status}),
    })
  }


