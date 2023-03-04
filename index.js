let alldate = []
const fetchUrl = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  alldate = data.data.tools;
  showData(data.data.tools.slice(0, 6));
  trogolspinner(true);
};

const showData = (data) => {
  data.forEach(singelData => {
    const { image, name, id, published_in, features } = singelData;
    showAllData.innerHTML += `
          <div class="col">
          <div class="card h-100 p-3 rounded border border-light-subtle">
            <img style="width: 382px; height: 214px;" src="${image}" class="card-img-top rounded" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol>
              <li>${features[0] ? features[0] : 'data not found'}</li>
              <li>${features[1] ? features[1] : 'data not found'}</li>
              <li>${features[2] ? features[2] : 'data not found'}</li>
            
              </ol>
               <hr>
              <h5 class="card-title">${name ? name : 'No name'}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <p> <i class="fa-solid fa-calendar-days"></i> ${published_in ? published_in : 'not available'}</p>
                <button onclick="fetchDetail('${id ? id : '01'}')"  class=" border-0 px-2 py-1 r rounded-circle" style="background-color: #FEF7F7; color: #EB5757;"><i data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="fa-solid fa-arrow-right"></i></button>
        
              </div>
            </div>
          </div>
        </div>`
  });
 trogolspinner(false);
}

const fetchDetail = (id) => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllDetail(data.data ? data.data : 'Data not Available'));

};

const showAllDetail = (data) => {
  const { image_link, input_output_examples, pricing, description, accuracy, integrations, features } = data;
  console.log

  const detalisDiv = document.getElementById('modal_div');
  detalisDiv.innerHTML = "";
  detalisDiv.innerHTML += `
  <div class="modal-content">

  <button style=" background-color: #EB5757; margin-top: -20px; margin-left: -10px;"  type="button" class="btn-close p-3 rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
        
    <div class="modal-body">
        <section class=" d-flex  justify-content-center">
        <section style="width: 75%;" class=" mb-5">
          <div class="row row-cols-1 row-cols-md-2 g-4  ">
            <div class="col ">
              <div style="background-color: rgba(235, 87, 87, 0.05);" class="card h-100 border border-danger">
                <div class="card-body">
                  <h5 class="mb-3">${description ? description : "data not Avlabel"}</h5>
                  <!-- Card Packeg price -->
                  <div>
                    <div class="row row-cols-1 row-cols-md-3 g-2 ">
                      <div class="col ">
                        <div class="card h-100 text-center text-success px-1 py-3">
                          <h5>${pricing[0].plan ? pricing[0].plan : 'Free of'}</h5>
                          <h5>${pricing[0].price ? pricing[0].price : 'Cost/Basic'}</h5>
                          
                        </div>
                      </div>
                      <div class="col">
                        <div class="card h-100 text-center text-warning   px-1 py-2 ">
                        <h5>${pricing[1].plan ? pricing[1].plan : 'Free of'}</h5>
                        <h5>${pricing[1].price ? pricing[1].price : 'Cost/Pro'}</h5>
                        </div>
                      </div>
                      <div class="col ">
                        <div class="card h-100 text-center text-danger px-1 py-2 ">
                        <h5>${pricing[2].plan ? pricing[2].plan : 'Free of Cost/'}</h5>
                        <h5>${pricing[2].price ? pricing[2].price : 'Enterprise'}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Card Packeg price end -->
                  <!-- card future -->

                  <div class="d-flex gap-4 mt-3 mb-2">
                    <div>
                      <h5>Features</h5>
                      <li>
                      ${features[1].feature_name}
                      </li>
                      <li>
                      ${features[2].feature_name}
                      </li>
                      <li>
                      ${features[3].feature_name}
                      </li>
                    </div>
                    <div>
                      <h5>Integrations</h5>
                      <li>${integrations[0] ? integrations[0] : 'No data Found'}</li>
                      <li>${integrations[1] ? integrations[1] : 'No data Found'}</li>
                      <li>${integrations[2] ? integrations[2] : 'No data Found'}</li>
                     </div>
                  </div>
                  <!-- card future end -->
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100 border border-light-subtle">
                <div class="position-relative">  
                  <img src="${image_link[0]}" class="p-3 rounded card-img-top" alt="...">
                  <p style="right: 20px; top: 20px; padding: 5px; background-color: #EB5757; color: aliceblue; " class="position-absolute rounded" type="button" class="btn btn-danger"><span>${accuracy.score * 100 ? accuracy.score * 100 : ''}</span>% accuracy
                  </p>
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title">${input_output_examples[0].input ? input_output_examples[0].input : 'No! Not Yet! Take a break!!!'}</h5>
                  <p class="card-text">${input_output_examples[0].output ? input_output_examples[0].output : 'input_output_examples[0].output'}</p>
                  <h5 class="card-title">${input_output_examples[1].input ? input_output_examples[1].input : 'No! Not Yet! Take a break!!!'}</h5>
                  <p class="card-text">${input_output_examples[1].output ? input_output_examples[1].output : 'input_output_examples[0].output'}</p>
              
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
  `
}

fetchUrl();
const showalldata = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => showData(data.data.tools.slice(6,)))
    trogolspinner(true);
}

const trogolspinner = iSspinner =>{
  const spinnerDiv = document.getElementById('spinner');
  if(iSspinner){
    spinnerDiv.classList.remove('d-none')
  }
  else{
    spinnerDiv.classList.add('d-none')
  }
}

const content = document.getElementById("content");
const seeMoreBtn = document.getElementById("see-more-btn");

seeMoreBtn.addEventListener("click", function() {
  content.innerHTML += "";
  seeMoreBtn.parentNode.removeChild(seeMoreBtn);
});

// // let array = [];
// // array.sort(sortFunction);​

// const seebydate = () => {
//   alldate.forEach(data => {
//     sortFunction(data.published_in)
//   })
// }


// function sortFunction(a){  
//   var dateA = new Date(a.date).getTime();
//   return dateA  ? 1 : -1;  
// }; 

