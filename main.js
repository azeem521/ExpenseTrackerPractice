var form=
`<div class="container">
        
<div class="">
  <label for="inputEmail4" class="form-label">Choose Expense</label>
  <div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" id='expense' aria-label="Dollar amount (with dot and two decimal places)" placeholder='Enter Amount'>
  
</div>
  </div> 
  
  <div class='chooseExpense'>
  <label for="inputEmail4" class="form-label">Choose Catagory</label>
<select class="form-select col" id='catagory' aria-label=".form-select-sm example">
<option >Movie</option>
<option >Shopping</option>
<option >Rent</option>
<option >Grocery</option>
</select>
  </div>
  </div>
  <div class="secondDiv">
  <div class="col">
  <label for="inputPassword4" class="form-label">Add Short Description</label>
    <input type="text" class="form-control" id='description' placeholder="Description" aria-label="Last name">
  </div>
  <button class="btn btn-primary mt-4 btn1" type="submit" onclick='save()'>Save</button>
  </div>
  
`;

document.getElementById('form').innerHTML=form;

let details=[];
getData()
table()

function getData(){
  let data=localStorage.getItem('details');
  if(data){
    details=JSON.parse(data);
  }else{
    setData();
  }
}

function setData(){
  localStorage.setItem('details',JSON.stringify(details));
}




function save(){
  let expense=document.getElementById('expense');
  let e=document.getElementById('catagory');
  let catagory=e.options[e.selectedIndex].text;
  let description=document.getElementById('description');

  let data={
    expense:expense.value,
    catagory:catagory,
    description:description.value
  }
  details.push(data)
  setData()
  getData()
  table()
  console.log(data);
}

function table(){
  let table=`<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Expense</th>
      <th scope="col">Catagory</th>
      <th scope="col">Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>`;
  for(let i=0;i<details.length;i++){
    table+=`
    <tr>
      <th scope="row">${i+1}</th>
      <td>${details[i].expense}</td>
      <td>${details[i].catagory}</td>
      <td>${details[i].description}</td>
      <td><button class="btn btn-warning" type="submit" onclick='edit(${i})'>Edit</button></td>
      <td><button class="btn btn-danger" type="submit" onclick='deletedata(${i})'>Delete</button></td>
    </tr>
    `
  }

  table+=`</tbody>
  </table>`;

  document.getElementById('table').innerHTML=table;

}

function edit(i){
  var editForm=`
  <div class="container">
        
<div class="">
  <label for="inputEmail4" class="form-label">Choose Expense</label>
  <div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" id='newexpense' value=${details[i].expense} aria-label="Dollar amount (with dot and two decimal places)" placeholder='Enter Amount'>
  
</div>
  </div> 
  
  <div class='chooseExpense'>
  <label for="inputEmail4" class="form-label">Choose Catagory</label>
<select class="form-select col" id='newcatagory' value=${details[i].catagory} aria-label=".form-select-sm example">
<option >Movie</option>
<option >Shopping</option>
<option >Rent</option>
<option >Grocery</option>
</select>
  </div>
  </div>
  <div class="secondDiv">
  <div class="col">
  <label for="inputPassword4" class="form-label">Add Short Description</label>
    <input type="text" class="form-control" id='newdescription' value=${details[i].description} placeholder="Description" aria-label="Last name">
  </div>
  <button class="btn btn-primary mt-4 btn1" type="submit" onclick='update(${i})'>Update</button>
  </div>
  `;

  document.getElementById('form').innerHTML=editForm;
};


function update(i){
  let newexpense=document.getElementById('newexpense');
  let newdescription=document.getElementById('newdescription');
  let e=document.getElementById('newcatagory');
  let newcatagory=e.options[e.selectedIndex].text;
  details[i]={
    expense:newexpense.value,
    catagory:newcatagory,
    description:newdescription.value
  }
  setData()
  getData()
  table();
  document.getElementById('form').innerHTML=form;
}


function deletedata(i){
//  console.log('deleted');
  details.splice(i,1);
  setData()
  getData()
  table();
}