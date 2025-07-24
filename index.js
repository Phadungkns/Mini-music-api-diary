let data = []; //เก็บข้อมูลที่ดึงมาจาก JSON ในตัวแปรนี้

const jsonData = "https://mini-music-api-diary10.onrender.com";

//ฟังก์ชันสำหรับเพิ่มข้อมูล
function addData() {
    Swal.fire({
        title: "Add Music",
        html: `
            <form class="text-start" action="javascript:acceptAddData()">
                <div class="mb-3">
                    <label for="sid" class="form-label">Music ID</label>
                    <input type="number" class="form-control" id="sid" required>
                </div>
                <div class="mb-3">
                    <label for="musicname" class="form-label">Musicname</label>
                    <input type="text" class="form-control" id="musicname" required>
                </div>
                <div class="mb-3">
                    <label for="artist" class="form-label">Artist</label>
                    <input type="text" class="form-control" id="artist" required>
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="img" required>
                </div>
                <div class="mb-3">
                    <label for="sound" class="form-label">Sound</label>
                    <input type="url" class="form-control" id="sound" required>
                </div>
                <div class="" role="alert" id="alert"></div>
                <div class="mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-lg btn-outline-dark mx-1"><i class="bi bi-plus-circle-fill"></i></button>
                    <button type="button" class="btn btn-lg btn-outline-dark mx-1" onclick="denyAddData()"><i class="bi bi-x-octagon"></i></button>
                </div>
            </form>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        showDenyButton: false,
    })
}

function acceptAddData() {
    let sid = parseInt(document.getElementById("sid").value);
    let musicname = document.getElementById("musicname").value;
    let artist = document.getElementById("artist").value;
    let img = document.getElementById("img").value;
    let sound = (document.getElementById("sound").value);
    
    

    for (let i = 0; i < data.length; i++) {
        if (data[i].sid == sid) {
            document.getElementById("alert").innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ขออภัย!</strong> ไม่สามารถเพิ่มข้อมูลได้ เนื่องจากมีรหัสนักเรียนนี้อยู่แล้ว
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
            return;
        }
    }

    let data2 = {
        sid: sid,
        musicname: musicname,
        artist: artist,
        img: img,
        sound: sound
        
        
    }

    try {
        fetch(jsonData + "/music/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"//ระบุว่าส่งข้อมูลประเภทอะไร
            },
            body: JSON.stringify(data2)
        });
        Swal.fire({
            icon: "success",
            title: "Saved!",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.reload();
        })
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        })
    }
}

function denyAddData() {
    Swal.close();
}

//ฟังก์ชันสำหรับดึงข้อมูลจาก JSON มาแสดงผล
async function getData() {
    try {
        const response = await fetch(jsonData + "/music/get");
        data = await response.json();

        let mainData = document.getElementById("adolist");

        for (let i = 0; i < data.length; i++) {
            let adolist = document.createElement("adolist");
            adolist.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

            <div class="card shadow p-3 mb-5 bg-black rounded text-white border border-success" style="width: 17rem;">
            <img src="${data[i].img}" class="card-img-top" alt="..."><p>
            <h5 class="card-title ">${data[i].musicname}</h5>
            <p class="card-text">${data[i].artist}</p>
            <p class="card-text">${data[i].createdAt}</p>
                
                    <div class="d-flex justify-content-center align-items-center flex-wrap" style="height: 100%;">
                        <button type="button" class="btn btn btn-outline-black m-1 border border-black" onclick="viewData('${data[i].sid}', '${data[i].musicname}', '${data[i].artist}','${data[i].img}','${data[i].sound}', '${data[i].createdAt}')"><i class="bi bi-play-fill"></i></button>
                        <button type="button" class="btn btn btn-outline-black m-1 border border-black" onclick="updateData('${data[i].sid}', '${data[i].musicname}', '${data[i].artist}','${data[i].img}','${data[i].sound}')"><i class="bi bi-shadows"></i></button>
                        <button type="button" class="btn btn-outline-black m-1 border border-black" onclick="deleteData(${data[i].sid})"><i class="bi bi-file-x"></i></button>
                    </div>
               
            </div>
            `
            mainData.appendChild(adolist);
        }
    } catch (err) {
        console.log(err);
    }
}
getData();

//ฟังก์ชันสำหรับแสดงข้อมูล
function viewData(sid, musicname, artist, img, sound, createdAt) {
    Swal.fire({
        title: "STRINGIFY",
        html: `
        <link rel="stylesheet" href="adio.css"><!--Link ado.css -->

        <img id="rotate" src="${img}" class="rounded-circle" alt="..." style="width: 250px;"><p><p>

         <audio controls autoplay loop id="ado">
     <source src="${sound}" type="audio/ogg">
     <source src="${sound}" type="audio/mpeg">
     </audio>
                <div class="card-body">
                    <h4 id="mname" class="card-title mt-4 mb-4">${musicname}</h4>
                    <p id="art" class="card-text mb-2 text-start mb-3">Artist : ${artist}</p>
                    <p id="cra" class="card-text mb-2 text-start">Created At : ${createdAt}</p>
                </div>
            
        `,
        showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        focusCancel: false,
        cancelButtonText: "Close",
    })
}

//ฟังก์ชันสำหรับลบข้อมูล
function deleteData(sid) {
    Swal.fire({
        title: "คุณแน่ใจนะ ว่าจะลบข้อมูล?",
        text: "การดำเนินการนี้จะไม่สามารถย้อนกลับได้!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "ใช่, ฉันต้องการลบ!",
        denyButtonText: "ไม่, ยกเลิก!",
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                fetch(jsonData + "/music/delete?sid=" + sid, {
                    method: "DELETE",//ต้่องตรงกับ API ที่สร้างไว้
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.reload();
                })
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    })
}

//ฟังก์ชันสำหรับแก้ไขข้อมูล
function updateData(sid, musicname, artist, img, sound) {
    Swal.fire({
        title: "Update Music ",
        html: `
            <form class="text-start">
                <div class="mb-3">
                    <label for="sid" class="form-label">Music ID</label>
                    <input type="number" class="form-control" id="sid" value="${sid}" disabled>
                </div>
                <div class="mb-3">
                    <label for="musicname" class="form-label">Musicname</label>
                    <input type="text" class="form-control" id="musicname" value="${musicname}" required>
                </div>
                <div class="mb-3">
                    <label for="artist" class="form-label">Artist</label>
                    <input type="text" class="form-control" id="artist" value="${artist}" required>
                </div>
                <div class="mb-3">
                    <label for="img" class="form-label">Image</label>
                    <input type="url" class="form-control" id="img" value="${img}" required>
                </div>
                <div class="mb-3">
                    <label for="sound" class="form-label">Sound</label>
                    <input type="url" class="form-control" id="sound" value="${sound}" required>
                </div>
            </form>
        `,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don"t save`,
    }).then((result) => {
        if (result.isConfirmed) {
            let musicname = document.getElementById("musicname").value;
            let artist = document.getElementById("artist").value;
            let img = document.getElementById("img").value;
            let sound = document.getElementById("sound").value;

            let data = {
                "musicname": musicname,
                "artist": artist,
                "img": img,
                "sound": sound
            }

            try {
                fetch(jsonData + "/music/update?sid=" + sid, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                Swal.fire({
                    icon: "success",
                    title: "Saved!",
                    html:`<audio controls autoplay loop id="ado">
                    <source src="https://audio.jukehost.co.uk/5SpEYPJfDrfX8hmyWYzhbcbFw8kvRlcC" type="audio/ogg">
                    <source src="https://audio.jukehost.co.uk/5SpEYPJfDrfX8hmyWYzhbcbFw8kvRlcC" type="audio/mpeg">
                    </audio>`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    location.reload();
                })
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    })
}

