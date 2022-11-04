function onloadScript() {


//1. Check is JWT token exists and is valid

checkJWT();

//2. Fetch promoted items

    fetch('http://localhost:5000/get-items-onload')
        .then(res=>res.json())
        .then(([item1,item2])=>{
            header1.innerText =`${item1.discount}% off - ${item1.category} - ${item1.name}`;
            header2.innerText =`${item2.discount}% off - ${item2.category} - ${item2.name}`;
            name1.innerText = item1.name;
            name2.innerText = item2.name;
            title1.innerText = item1.title;
            title2.innerText = item2.title;
            description1.innerText = item1.description;
            description2.innerText = item2.description;
            technics1.innerText = item1.technic;
            technics2.innerText = item2.technic;
            img1.src = item1.pictures[0];
            img2.src = item2.pictures[0];
            img1.alt = item1.name;
            img2.alt = item2.name;
        })
        .catch(err=>{
            console.log('Pictures onload error: ',err.message)
        });

    setTimeout(()=>location.reload(),3600000);

}
