import React, { useEffect } from 'react'
import { usePersonContext } from '../../ContextApi/CPCContext'
import { useNavigate } from 'react-router-dom';

export default function CompanyPersonHistory() {
  const { persons } = usePersonContext();
  const [cPerson, setCPerson] = React.useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getPersons = persons.filter((person) => person.status === 'company person')
    setCPerson(getPersons)
  }, [persons])

  const seePersonHistory=(name,id)=>{
      navigate(`/company-person-history/${name}`,{state:{id:id}})
  }


    // Search functionality to filter items based on name or category
  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll("#person-list > li");
    items.forEach((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      if (title.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Company Persons</h2>
          {/* Search box */}
          <input
            type="text"
            name="search-items"
            id="searchBox"
            className="border-2 border-gray-800 rounded-lg p-1 w-1/4 mb-6"
            onChange={(e) => search(e)}
            placeholder="Search Clients"
          />
      {cPerson.length === 0 ? (
        <div className="text-gray-500">No person found.</div>
      ) : (
        <ul id='person-list' className="grid grid-cols-1 md:grid-cols</div>-2 lg:grid-cols-3 gap-4">

          {cPerson.map((person) => (
            <li
              key={person.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 border hover:shadow-lg transition cursor-pointer"
              onClick={()=>seePersonHistory(person.name,person._id)}
              data-title={person.name}
            >
              <span className="text-lg font-semibold">{person.name}</span>
              <span className="text-gray-600">{person.email}</span>
              {/* Add more person details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
