const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

function displayPhone(phones, isShowAll) {
  const phoneContainer = document.getElementById('phone-container');
  const phoneContainer2 = document.getElementById('phone-container2');

  phoneContainer.textContent = '';
  phoneContainer2.textContent = '';
  const showAll = document.getElementById('show-all');
  if (phones.length > 9 && !isShowAll) {
    showAll.classList.remove('hidden');
  } else {
    showAll.classList.add('hidden');
  }

  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  if (phones.length > 0) {
    phones.forEach(phone => {
      const div = document.createElement('div');
      div.innerHTML = `
    <div class="card bg-base-100 shadow-xl p-6 border border-[#CFCFCF]">
    <figure class="px-10 py-10 bg-[#0D6EFD0D] rounded-xl h-[293px]">
      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>There are many variations of passages of available, but the majority have suffered</p>
      <span class="font-bold text-2xl">$999</span>
      <div class="card-actions">
        <button onclick="displayDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
  </div>
    `;
      phoneContainer.appendChild(div);
    });
  } else {
    const div = document.createElement('div');
    div.classList = `flex justify-center w-full`;
    div.innerHTML = `
    <div role="alert" class="alert alert-error flex justify-center w-1/2">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Error! No data available.</span>
</div>
    `;
    phoneContainer2.appendChild(div);
  }
  handleSpinner(false);
}

const searchButton = isShowAll => {
  handleSpinner(true);
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value;
  loadPhone(searchText, isShowAll);
};

const handleSpinner = isLoading => {
  const loadSpinner = document.getElementById('load-spinner');
  if (isLoading) {
    loadSpinner.classList.remove('hidden');
  } else {
    loadSpinner.classList.add('hidden');
  }
};

const displayDetails = async id => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneData = data.data;
  // console.log(phoneData);
  const getModal = document.getElementById('show_details_modal');
  const div = document.createElement('div');
  div.classList.add('modal-box');
  div.innerHTML = `
  <figure class="px-10 py-10 flex justify-center bg-[#0D6EFD0D] rounded-xl h-[293px]">
  <img src="${phoneData.image}" alt="Shoes" class="rounded-xl" />
</figure>
  <h3 class="font-bold text-lg">${phoneData.name}</h3>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <ul>
    <li></li>
  </ul>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
  `;
  getModal.appendChild(div);
  show_details_modal.showModal();
  // console.log(id);
};
const handleShowAll = () => {
  searchButton(true);
};
