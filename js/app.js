const loadPhones = async (search, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}
const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phones-container')
    phoneContainer.textContent = ''
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length>dataLimit){
        phones = phones.slice(0, dataLimit)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    
    // display no phone found result
    const notFoundDiv = document.getElementById('not-found')
    if(phones.length === 0){
        notFoundDiv.classList.remove('d-none')
    }
    else{
        notFoundDiv.classList.add('d-none')
    }

    // display all the phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add("col")
        // console.log(phone)
        phoneDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top phone-image" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="displayPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetail">See Details</button>
                    
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    })
    toggleLoader(false);
}

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader-section')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}


const processSearch = (dataLimit) =>{
    toggleLoader(true);
    const phoneSearchField = document.getElementById('phone-field')
    const searchText = phoneSearchField.value
    loadPhones(searchText, dataLimit);
}

document.getElementById('phone-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(9);
    }
})

document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(9);
    
})
const showAllBtn = () =>{
    processSearch()
}

const displayPhoneDetails = (id) =>{
    const loadDetails = async() => {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`

        const res = await fetch(url);
        const data = await res.json();
        displayDetails(data.data)
    }
    const displayDetails = phone =>{
        console.log(phone)
        const phoneName = document.getElementById('phoneDetailLabel')
        phoneName.innerText = phone.name

        const detailBody = document.getElementById('detail-body')
        detailBody.innerHTML = `
            <h6 class="text-primary">Main Features</h6>
            <p><b>Storage</b><br> ${phone.mainFeatures.storage}</p>
            <p><b>Chipset</b><br> ${phone.mainFeatures.chipSet}</p>
            <p><b>Memory</b><br> ${phone.mainFeatures.memory}</p>
        `
    }

    loadDetails();
}

loadPhones('apple');