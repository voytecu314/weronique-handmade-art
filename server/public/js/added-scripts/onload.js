function onloadScript() {


//1. Check is JWT token exists and is valid

checkJWT();

//2. Fetch promoted items


    const header1 = document.getElementById('item1-header');
    const header2 = document.getElementById('item2-header');
    const img1 = document.getElementById('item1-picture');
    const img2 = document.getElementById('item2-picture');
    const name1 = document.getElementById('item1-name');
    const name2 = document.getElementById('item2-name');
    const title1 = document.getElementById('item1-title');
    const title2 = document.getElementById('item2-title');
    const description1 = document.getElementById('item1-description');
    const description2 = document.getElementById('item2-description');
    const technics1 = document.getElementById('item1-technics');
    const technics2 = document.getElementById('item2-technics');
    const basket1Icon = document.getElementById('item1-basket-icon');
    const basket2Icon = document.getElementById('item2-basket-icon');

    fetch('http://localhost:5000/get-items-onload')
        .then(res=>res.json())
        .then(([item1,item2])=>{
            item1.id=item1._id;
            item2.id=item2._id;
            header1.innerText =`${item1.discount.percent}% off - ${item1.category} - ${item1.name}`;
            header2.innerText =`${item2.discount.percent}% off - ${item2.category} - ${item2.name}`;
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

            basket1Icon.addEventListener('click',()=>addToBasket(item1));
            basket2Icon.addEventListener('click',()=>addToBasket(item2));
        })
        .catch(err=>{
            console.log('Pictures onload error: ',err.message)
        });

    setTimeout(()=>location.reload(),3600000);

}
