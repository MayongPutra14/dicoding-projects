// LEARN HOW TO CREATE AND RENDER ELEMENTS: LATIHAN MEMBUAT ELEMENT REACT
import React from "react"
import { createRoot } from "react-dom/client"

const heading = React.createElement('h1', null, "Company Profile") 
const li1 = React.createElement('li', null, "Nama: Gilang Mayong Saputra")
const li2 = React.createElement('li', null, "Umur: 20")
const li3 = React.createElement('li', null, "Moto: Saya belajar react dari dicoding")

const root = createRoot(document.getElementById('root'))
const unOrderedList = React.createElement('ul', null, [li1, li2, li3])
const container = React.createElement('div', null, [heading, unOrderedList])
// root.render(container)

// LEARN HOW TO USE .JSX FILE: Latihan Menggunakan JSX, add image(module or link method)
import myProfile from './my-profile.jpg'

const element = (
  <div>
    <h1>Company Profile With .jsx</h1>
    <ul>
      <li>Nama: Gilang Mayong Saputra</li>
      <li>Umur: 20 Tahun</li>
      <li>Moto: Saya belajar menggunaka file.jsx untuk kemudahan dalam membuta UI</li>
    </ul>
    {/* <img src=".path/to/your/images" alt="My photo profile" /> */}
    <img src={myProfile} alt="My photo profile" />
  </div>
)
// root.render(element)

// LEARN HOW TO CREATE REACT COMPONENT: REACT COMPONENT
// NOTE: a fucntion that return react element has to use capital alphabet on the firs word like SayHello() not sayHello()
// NOTE: a function react component can't be react comonent if we call the function like we call general fucntion Sayhello()  <- bac pratice
function SayHello({name}) {
  // Sebelum mengembalikan React element, Anda bisa menuliskan banyak kode JavaScript di sini.
  // Biasanya kode yang dituliskan seputar persiapan data untuk ditampilkan pada React element.
 
  return <p>Hello, {name}</p>
}

{/* <SayHello name="GilangMayong"/> // bad practice: send value to prameter */}
<SayHello>Gilang Mayong</SayHello> // best practice

// COMPOSITE AND COMPONENT
function SearchBar() {
  return (
    <div className="search-bar__container">
      <input type="text" placeholder="Search..." />
      <div className="search-bar__in_stock_checkbox">
        <input type="checkbox" />
        <label>Only show products in stock</label>
      </div>
    </div>
  );
}
 
function ProductCategoryRow({ name }) {
  return (
    <tr>
      <td colSpan="2">
        <strong>{name}</strong>
      </td>
    </tr>
  );
}
 
function ProductRow({ name, price }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
 
function ProductTable() {
  return (
    <div className="product-table__container">
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <ProductCategoryRow name="Sporting Goods" />
        <ProductRow name="Football" price="$49.99" />
        <ProductRow name="Baseball" price="$9.99" />
        <ProductRow name="Baseketball" price="$49.99" />
        <ProductCategoryRow name="Electronics" />
        <ProductRow name="iPod Touch" price="$99.99" />
        <ProductRow name="iPhone 5" price="$399.99" />
        <ProductRow name="Nexus 7" price="$199.99" />
      </table>
    </div>
  );
}
 
function FilterableProductTable() {
  return (
    <div className="container">
      <SearchBar />
      <ProductTable />
    </div>
  );
}

root.render(
  <React.StrictMode>
    <FilterableProductTable/>
  </React.StrictMode>
)