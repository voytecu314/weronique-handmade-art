        function searchModal(keyword) {
            const searchDisplay = document.getElementById('search-display');
            document.getElementById('search-modal').style.width='100vw';
            document.getElementById('search-modal').style.height='100vh';
            document.getElementById('search-modal').style.left='0';


            document.getElementById('search-title').innerHTML = 
            `<h5 style="position: absolute; top: 0;">${keyword.toUpperCase()}</h5>`;

            fetch(`http://localhost:5000/search-products/${keyword}`)
                .then(res=>res.json())
                .then(data=>{ searchDisplay.innerHTML="";
                    data.forEach(
                        ({name,pictures, title})=>{searchDisplay.insertAdjacentHTML('beforeend',
                            `<div style="height: 300px; margin-top: .5%;" class="ml-lg-auto col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="800">
                                <div class="team-thumb">
                                    <h5 style="text-align:center">${name}</h5>
                                    
                                    <div style="width: 100%; 
                                         height: 200px; 
                                         background-image: url('${pictures[0]}');
                                         background-size:contain;
                                         background-position:center;
                                         background-repeat:no-repeat;
                                         cursor:zoom-in;"
                                         class="d-flex flex-column" 
                                         onclick="zoomImg(this)">
                                    </div>

                                    <ul style="background-image:linear-gradient(90deg,aliceblue,white,aliceblue); text-align: center" class="social-icon mt-3">
                                        <li><span>${title}</span></li>
                                        <li style="cursor:pointer"><a href="#" class="fa fa-paypal" title="Buy now"  data-toggle="modal" data-target="#PayPalForm"></a></li>
                                        <li style="cursor:pointer"><a href="#" class="fa fa-shopping-basket" title="Add to basket"></a></li>
                                    </ul>

                                </div>
                            </div>`) }
                    )
                })
                .catch(err=>console.log('Search-fetch error: ',err))

        }

        function closeSearchModal() {
            document.getElementById('search-modal').style.width='0';
            document.getElementById('search-modal').style.height='0';
            document.getElementById('search-modal').style.left='-100%';
        }

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

        

        function closeZoomModal(modal) {
            modal.style.display='none';
        }

        //let currentImg; //? meant to be counter

        function zoomImg(element) {
            //currentImg = 0; //?  meant to be counter
            const zoomModal = document.getElementById('zoom-modal');
            document.getElementById('zoom-display').style.backgroundImage='none';
            zoomModal.style.display='flex';

            if(element.tagName==='DIV') {
                fetchPreviewPictures(element.previousElementSibling.innerText);
                
            } else {
                fetchPreviewPictures(element.alt);
            }
        }

        function fetchPreviewPictures(name) {
            let counter=0;
            fetch(`/get-preview-pictures/${name}`)
                .then(res=>res.json())
                .then(pictures=>{
                    document.getElementById('zoom-display').style.backgroundImage=`url('${pictures[0]}')`;
                    document.querySelectorAll('.change-picture').forEach(i=>{
                        i.addEventListener('click',(e)=>{
                            if(e.target.id) counter++; else counter--;
                            document.getElementById('zoom-display').style.backgroundImage=
                            `url('${pictures[((counter%pictures.length)+pictures.length)%pictures.length]}')`;
                        });
                    })
                })
                .catch(err=>console.log('fetch preview error: ',err.message));
        }